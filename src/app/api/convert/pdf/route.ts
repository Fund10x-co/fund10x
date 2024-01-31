import { NextApiRequest, NextApiResponse } from "next";
import { PDFDocument, rgb } from "pdf-lib";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body.data; // Assuming you pass the data in the request body

  try {
    // Convert CSV data to PDF
    const pdfBuffer = await convertToPDF(data);

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "attachment; filename=data.pdf");
    res.send(pdfBuffer);
  } catch (error) {
    res.status(500).json({ error: "Failed to convert to PDF" });
  }
}

async function convertToPDF(data: string): Promise<Buffer> {
  const doc = await PDFDocument.create();
  const page = doc.addPage();

  const textWidth = 500;
  const textHeight = 700;
  page.drawText(data, {
    x: 50,
    y: 750,
    size: 12,
    lineHeight: 15,
    color: rgb(0, 0, 0),
    // width: textWidth,
    // height: textHeight,
  });

  // Convert Uint8Array to Buffer
  return Buffer.from(await doc.save());
}
