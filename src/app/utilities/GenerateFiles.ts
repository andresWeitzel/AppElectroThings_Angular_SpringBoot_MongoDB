import { NgToastService } from 'ng-angular-popup';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export class GenerateFiles {
  constructor(private toast: NgToastService) {}

  generatePdf(pdfName: string, data: any) {
    //TOAST SUCCESS
    setTimeout(() => {
      this.toast.success({
        detail: 'SUCCESS',
        summary: 'Descargando Archivo .pdf!!',
        duration: 2000,
      });
    }, 200);
    //FIN TOAST SUCCESS

    //Admitimos img
    const options = { logging: true, letterRendering: true, useCORS: true };

    html2canvas(data, options).then((canvas) => {
      let fileWidth = 208;

      let fileHeight = (canvas.height * (fileWidth-1)) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');

      let position = 0;

      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save(pdfName);
    });
  }
}
