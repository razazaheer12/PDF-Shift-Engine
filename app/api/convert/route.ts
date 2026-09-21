import { NextRequest, NextResponse } from "next/server"
import CloudConvert from "cloudconvert"
import { Readable } from "stream"

export const runtime = "nodejs"
export const maxDuration = 60

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.CLOUDCONVERT_API_KEY
    if (!apiKey) {
      return NextResponse.json(
        { error: "CloudConvert API key is not configured on the server." },
        { status: 500 }
      )
    }

    const formData = await request.formData()
    const file = formData.get("file")
    const targetFormat = formData.get("targetFormat")

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "No file provided or invalid file upload." },
        { status: 400 }
      )
    }

    if (!targetFormat || typeof targetFormat !== "string") {
      return NextResponse.json(
        { error: "Missing or invalid targetFormat parameter." },
        { status: 400 }
      )
    }

    const normalizedTarget = targetFormat.trim().toLowerCase()
    if (normalizedTarget !== "docx" && normalizedTarget !== "pdf") {
      return NextResponse.json(
        { error: "Unsupported target format. Only 'docx' and 'pdf' are supported." },
        { status: 400 }
      )
    }

    // Determine input format from file name / MIME type
    const fileName = file.name || ""
    const lowerFileName = fileName.toLowerCase()
    let inputFormat: string

    if (normalizedTarget === "docx") {
      if (!lowerFileName.endsWith(".pdf") && file.type !== "application/pdf") {
        return NextResponse.json(
          { error: "For DOCX conversion, please upload a valid PDF file." },
          { status: 400 }
        )
      }
      inputFormat = "pdf"
    } else {
      if (lowerFileName.endsWith(".doc")) {
        inputFormat = "doc"
      } else if (lowerFileName.endsWith(".docx")) {
        inputFormat = "docx"
      } else if (
        file.type === "application/msword" ||
        file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        inputFormat = "docx"
      } else {
        return NextResponse.json(
          { error: "For PDF conversion, please upload a valid DOC or DOCX file." },
          { status: 400 }
        )
      }
    }

    // Initialize CloudConvert — no sandbox flag; uses live API
    const cloudConvert = new CloudConvert(process.env.CLOUDCONVERT_API_KEY as string)

    // 1. Create job with three tasks: import-upload → convert-job → export-file
    const job = await cloudConvert.jobs.create({
      tasks: {
        "import-upload": {
          operation: "import/upload",
        },
        "convert-job": {
          operation: "convert",
          input: "import-upload",
          input_format: inputFormat,
          output_format: normalizedTarget,
        },
        "export-file": {
          operation: "export/url",
          input: "convert-job",
        },
      },
    })

    // 2. Locate the upload task returned by CloudConvert
    const uploadTask = job.tasks.find((task) => task.name === "import-upload")
    if (!uploadTask) {
      throw new Error("Failed to find import-upload task in CloudConvert job response.")
    }

    // 3. Upload file buffer via the SDK (handles multipart form + auth internally)
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    const fileStream = Readable.from(fileBuffer)

    await cloudConvert.tasks.upload(
      uploadTask,
      fileStream,
      fileName || `file.${inputFormat}`,
      fileBuffer.length
    )

    // 4. Wait for job to complete
    const completedJob = await cloudConvert.jobs.wait(job.id)

    if (completedJob.status === "error") {
      const failedTask = completedJob.tasks.find((t) => t.status === "error")
      throw new Error(failedTask?.message || "File conversion failed during CloudConvert processing.")
    }

    // 5. Retrieve the export download URL
    const exportUrls = cloudConvert.jobs.getExportUrls(completedJob)
    const exportFile = exportUrls[0]
    if (!exportFile?.url) {
      throw new Error("Converted file export URL could not be retrieved from CloudConvert.")
    }

    // 6. Download the converted binary from CloudConvert's CDN
    const downloadRes = await fetch(exportFile.url)
    if (!downloadRes.ok) {
      throw new Error(`Failed to fetch converted file from CloudConvert CDN: ${downloadRes.statusText}`)
    }

    const convertedBuffer = await downloadRes.arrayBuffer()

    const contentType =
      normalizedTarget === "docx"
        ? "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        : "application/pdf"

    const outputFileName = `${fileName.replace(/\.[^.]+$/, "")}.${normalizedTarget}`

    return new NextResponse(convertedBuffer, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${outputFileName}"`,
      },
    })
  } catch (error: any) {
    // Log full CloudConvert API error payload if available
    if (error?.response?.data) {
      console.error("CloudConvert Error Details:", JSON.stringify(error.response.data))
    }
    console.error("Conversion error:", error?.message ?? error)
    return NextResponse.json(
      { error: error?.message || "An unexpected error occurred during file conversion." },
      { status: 500 }
    )
  }
}
