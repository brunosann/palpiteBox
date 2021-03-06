import { GoogleSpreadsheet } from "google-spreadsheet";

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID);

export default async (req, res) => {
  await doc.useServiceAccountAuth({
    client_email: process.env.SHEET_CLIENT_EMAIL,
    private_key: process.env.SHEET_PRIVATE_KEY,
  });
  await doc.loadInfo();

  const sheet = doc.sheetsByIndex[2];
  await sheet.loadCells("A3:B3");
  const mostrarPromocaoCell = sheet.getCell(2, 0);
  const textoCell = sheet.getCell(2, 1);
  if (mostrarPromocaoCell.value === "VERDADEIRO") {
    res.end(JSON.stringify({ showCoupon: true, msg: textoCell.value }));
    return;
  } else {
    res.end(JSON.stringify({ showCoupon: false }));
  }
};
