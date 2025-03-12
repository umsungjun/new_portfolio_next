import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { JWT } from "google-auth-library";
import { credentials } from "./credentials.js";

const GOOGLE_SPREADSHEET_DOC_ID =
  "1WvRp8d3u8NCIbAHm9V48-cLsDsyjriIELUCL_1mW-88";
const VITE_GOOGLE_SPREADSHEET_ID = "527383987";
const languages = ["ko", "en"];
const header = {
  key: "KEY",
  ko: "KO",
  en: "EN",
};

/* 저장할 파일 경로 */
const localesPath = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../messages"
);

async function loadSpreadSheet() {
  const serviceAccountAuth = new JWT({
    email: credentials.client_email,
    key: credentials.private_key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const doc = new GoogleSpreadsheet(
    GOOGLE_SPREADSHEET_DOC_ID,
    serviceAccountAuth
  );

  await doc.loadInfo();

  const sheet = doc.sheetsById[VITE_GOOGLE_SPREADSHEET_ID];
  const rows = await sheet.getRows();

  const translations = {};

  rows.forEach((row) => {
    const key = row.get(header.key);
    languages.forEach((lng) => {
      const translation = row.get(header[lng]);

      if (!translations[lng]) {
        translations[lng] = {};
      }

      translations[lng][key] = translation ?? "";
    });
  });

  /* messages 폴더 안에 파일 명 가져오기  localeFilesList: [ 'en.json', 'ko.json' ]*/
  fs.readdir(localesPath, (error, localeFilesList) => {
    if (error) {
      throw error;
    }

    localeFilesList
      .map((fileName) => fileName.split(".")[0])
      .forEach((language) => {
        const localeJsonFilePath = `${localesPath}/${language}.json`;

        const jsonString = JSON.stringify(translations[language], null, 2);

        fs.writeFile(localeJsonFilePath, jsonString, "utf8", (error) => {
          if (error) {
            throw error;
          }
          console.log(`${language} 다국어 파일 내려받기 성공`);
        });
      });
  });
}

loadSpreadSheet().catch((error) => {
  console.error("다국어 파일 내려받기 실패:", error);
});
