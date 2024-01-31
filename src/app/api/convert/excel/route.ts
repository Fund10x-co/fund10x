import { NextApiRequest, NextApiResponse } from "next";
import ExcelJS from "exceljs";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body.data; // Assuming you pass the data in the request body

  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Sheet 1");
  worksheet.addRows(data);

  const buffer = await workbook.xlsx.writeBuffer();

  res.setHeader(
    "Content-Type",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  );
  res.setHeader("Content-Disposition", "attachment; filename=data.xlsx");
  res.send(buffer);
}
