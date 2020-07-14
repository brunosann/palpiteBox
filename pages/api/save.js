import { GoogleSpreadsheet } from "google-spreadsheet";
import moment from "moment";

const doc = new GoogleSpreadsheet(process.env.SHEET_DOC_ID);

const genCupom = () => {
  let code = parseInt(moment().format("YYMMDDHHmmssSSS"))
    .toString(16)
    .toUpperCase();
  code = `${code.substring(0, 4)}-${code.substring(4, 8)}-${code.substring(
    8,
    12,
  )}`;
  return code;
};

export default async (req, res) => {
  await doc.useServiceAccountAuth({
    client_email: process.env.SHEET_CLIENT_EMAIL,
    private_key: process.env.SHEET_PRIVATE_KEY,
  });
  await doc.loadInfo();
  const sheet = doc.sheetsByIndex[1];

  const sheetConfig = doc.sheetsByIndex[2];
  await sheetConfig.loadCells("A3:B3");
  const mostrarPromocaoCell = sheetConfig.getCell(2, 0);
  const textoCell = sheetConfig.getCell(2, 1);

  let Cupom = "";
  let Promo = "";

  if (mostrarPromocaoCell.value === "VERDADEIRO") {
    Cupom = genCupom();
    Promo = textoCell.value;
  }

  const { nome, email, whatsapp, nota } = JSON.parse(req.body);

  await sheet.addRow({
    Nome: nome,
    Email: email,
    Whatsap: whatsapp,
    Cupom,
    Promo,
    Nota: nota,
    Data: moment().format("DD/MM/YYYY HH:mm"),
  });
  res.end(
    JSON.stringify({
      showCupom: Cupom !== "",
      Cupom,
      Promo,
    }),
  );
};
