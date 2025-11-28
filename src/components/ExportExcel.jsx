import React from 'react'
import { RxDownload } from 'react-icons/rx';
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";

export default function ExportExcel({ apiData, fileName }) {
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const exportToCSV = (apiData, fileName) => {
    const ws = XLSX.utils.json_to_sheet(apiData);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <div>
      <button
        onClick={(e) => exportToCSV(apiData, fileName)}
        className='px-4 py-3 border text-xs rounded flex items-center gap-1 outline-none focus:ring-2'
      >
        <RxDownload />
        Download.csv
      </button>
    </div>
  )
}
