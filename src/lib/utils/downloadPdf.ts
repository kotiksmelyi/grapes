import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const handleDownloadPdf = async (element: HTMLElement | null) => {
  if (element) {
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL('image/png');

    const pdf = new jsPDF();
    const pdfWidth = pdf.internal.pageSize.getWidth() / 1.4;
    const pdfHeight = pdf.internal.pageSize.getHeight();

    pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('print.pdf');
  }
};
