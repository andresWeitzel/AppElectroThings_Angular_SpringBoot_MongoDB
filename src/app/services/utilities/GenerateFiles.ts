import { NgToastService } from 'ng-angular-popup';
//Pdf
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
//Excell
import * as XLSX from 'xlsx';

export class GenerateFiles {
  constructor(private toast: NgToastService) {}

  generatePdf(pdfName: string, data: any) {
    try {
      setTimeout(() => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Descargando Archivo .pdf!!',
          duration: 2000,
        });
      }, 200);

      //Admitimos img
      const options = { logging: true, letterRendering: true, useCORS: true };

      html2canvas(data, options).then((canvas) => {
        let fileWidth = 208;

        let fileHeight = (canvas.height * (fileWidth - 1)) / canvas.width;
        const FILEURI = canvas.toDataURL('image/png');
        let PDF = new jsPDF('p', 'mm', 'a4');

        let position = 0;

        PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
        PDF.save(pdfName);
      });
    } catch (error) {
      setTimeout(() => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'No se ha podido descargar el archivo .pdf!!',
          duration: 2000,
        });
      }, 200);
    }
  }

  generateCsv(csvName: string, data: any) {
    try {
      setTimeout(() => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Descargando Archivo .csv!!',
          duration: 2000,
        });
      }, 200);

      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

      const book: XLSX.WorkBook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(book, worksheet);

      //Reemplazamos el campo accion por vacio
      XLSX.utils.sheet_add_aoa(worksheet, [['']], { origin: 'K1' });

      //Reemplazamos el campo imagenes por vacio
      XLSX.utils.sheet_add_aoa(worksheet, [['']], { origin: 'C1' });

      XLSX.utils.sheet_to_csv;

      XLSX.writeFile(book, csvName);
    } catch (error) {
      setTimeout(() => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'No se ha podido descargar el archivo .csv!!',
          duration: 2000,
        });
      }, 200);
    }
  }

  generateExcel(excelName: string, data: any, paginate: any) {
    try {
      //Paginate
      let nroPage = paginate['nroPage'];
      let totalPages = paginate['totalPages'];
      let nroCurrentElements = paginate['nroCurrentElements'];
      let nroTotalElements = paginate['nroTotalElements'];

      setTimeout(() => {
        this.toast.success({
          detail: 'SUCCESS',
          summary: 'Descargando Archivo .xlsx!!',
          duration: 2000,
        });
      }, 200);

      const worksheet: XLSX.WorkSheet = XLSX.utils.table_to_sheet(data);

      const book: XLSX.WorkBook = XLSX.utils.book_new();

      XLSX.utils.book_append_sheet(book, worksheet);

      //Reemplazamos el campo accion por vacio
      XLSX.utils.sheet_add_aoa(worksheet, [['']], { origin: 'K1' });

      //Reemplazamos el campo imagenes por vacio
      XLSX.utils.sheet_add_aoa(worksheet, [['']], { origin: 'C1' });

      //Agregamos paginado
      XLSX.utils.sheet_add_aoa(worksheet, [['NRO PAGINA']], { origin: 'L1' });

      XLSX.utils.sheet_add_aoa(worksheet, [[nroPage + '/' + totalPages]], {
        origin: 'L2',
      });

      XLSX.utils.sheet_add_aoa(worksheet, [['NRO ELEMENTOS']], {
        origin: 'M1',
      });

      XLSX.utils.sheet_add_aoa(
        worksheet,
        [[nroCurrentElements + '/' + nroTotalElements]],
        { origin: 'M2' },
      );

      XLSX.writeFile(book, excelName);
    } catch (error) {
      setTimeout(() => {
        this.toast.error({
          detail: 'ERROR',
          summary: 'No se ha podido descargar el archivo .xlsx!!',
          duration: 2000,
        });
      }, 200);
    }
  }
}
