import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body.data; // Assuming you pass the data in the request body

  try {
    // Convert the data to CSV format
    const csv = data;

    res.setHeader("Content-Type", "text/csv");
    res.setHeader("Content-Disposition", "attachment; filename=data.csv");
    res.send(csv);
  } catch (error) {
    res.status(500).json({ error: "Failed to convert to CSV" });
  }
}

function convertToCSV(data: any[]): string {
  // Convert array of objects to CSV format
  const headers = Object.keys(data[0]).join(",") + "\n";
  const rows = data.map((obj) => Object.values(obj).join(",")).join("\n");
  return headers + rows;
}
