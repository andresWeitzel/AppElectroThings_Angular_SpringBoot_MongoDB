//External
import { Injectable } from "@angular/core";
//Pdf
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
//Excell
import * as XLSX from "xlsx";
//Services
import { ToastNotificationService } from "./toast-notification.service";

@Injectable({
  providedIn: "root",
})
export class GenerateFilesService {
  //Errors
  errMsj: string;

  constructor(private toastService: ToastNotificationService) {}

  generatePdf(pdfName: string, data: any) {
    try {
      this.toastService.success("Descargando Archivo .pdf!!");

      //Admitimos img
      const options = { logging: true, letterRendering: true, useCORS: true };

      html2canvas(data, options).then((canvas) => {
        let fileWidth = 208;

        let fileHeight = (canvas.height * (fileWidth - 1)) / canvas.width;
        const FILEURI = canvas.toDataURL("image/png");
        let PDF = new jsPDF("p", "mm", "a4");

        let position = 0;

        PDF.addImage(FILEURI, "PNG", 0, position, fileWidth, fileHeight);
        PDF.save(pdfName);
      });
    } catch (error) {
      this.errMsj = error.message;
      console.log(`Error in GenerateFilesService generatePdf() function. Caused by ${error}`);
      this.toastService.error(this.errMsj);
    }
  }

  generateCsv(csvName: string, data: any) {
    try {
      this.toastService.success("Descargando Archivo .csv!!");

      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

      const book: XLSX.WorkBook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(book, worksheet);

      //Reemplazamos el campo accion por vacio
      XLSX.utils.sheet_add_aoa(worksheet, [[""]], { origin: "K1" });

      //Reemplazamos el campo imagenes por vacio
      XLSX.utils.sheet_add_aoa(worksheet, [[""]], { origin: "C1" });

      XLSX.utils.sheet_to_csv;

      XLSX.writeFile(book, csvName);
    } catch (error) {
      this.errMsj = error.message;
      console.log(`Error in GenerateFilesService generateCsv() function. Caused by ${error}`);
      this.toastService.error(this.errMsj);
    }
  }

  generateExcel(excelName: string, data: any, paginate: any) {
    try {
      //Change here text content
      console.log(data);
      //Paginate
      let nroPage = paginate["nroPage"];
      let totalPages = paginate["totalPages"];
      let nroCurrentElements = paginate["nroCurrentElements"];
      let nroTotalElements = paginate["nroTotalElements"];

      this.toastService.success("Descargando Archivo .xslx!!");

      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

      const book: XLSX.WorkBook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(book, worksheet);

      //Reemplazamos el campo imagenes por vacio
      XLSX.utils.sheet_add_aoa(worksheet, [[""]], { origin: "F1" });

      //Reemplazamos el campo accion por vacio
      XLSX.utils.sheet_add_aoa(worksheet, [[""]], { origin: "K1" });

      //Agregamos paginado
      XLSX.utils.sheet_add_aoa(worksheet, [["NRO PAGINA"]], { origin: "L1" });

      XLSX.utils.sheet_add_aoa(worksheet, [[nroPage + "/" + totalPages]], {
        origin: "L2",
      });

      XLSX.utils.sheet_add_aoa(worksheet, [["NRO ELEMENTOS"]], {
        origin: "M1",
      });

      XLSX.utils.sheet_add_aoa(
        worksheet,
        [[nroCurrentElements + "/" + nroTotalElements]],
        { origin: "M2" }
      );

      XLSX.writeFile(book, excelName);
    } catch (error) {
      this.errMsj = error.message;
      console.log(`Error in GenerateFilesService generateExcel() function. Caused by ${error}`);
      this.toastService.error(this.errMsj);
    }
  }
}
