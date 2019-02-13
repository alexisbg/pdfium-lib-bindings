import PDFiumFFI, { checkError } from './pdfium-ffi';
import { PdfDocument, PdfPage, PdfPageObject } from './interfaces';


export function generateContent(page: PdfPage): void {

  PDFiumFFI.FPDFPage_GenerateContent(page);
  checkError('FPDFPage_GenerateContent');
}


export function insertObject(page: PdfPage, pageObj: PdfPageObject): void {

  PDFiumFFI.FPDFPage_InsertObject(page, pageObj);
  checkError('FPDFPage_InsertObject');
}


export function newPage(document: PdfDocument, pageIndex: number, width: number, height: number): PdfPage {

  const page: PdfPage = PDFiumFFI.FPDFPage_New(document, pageIndex, width, height);
  checkError('FPDFPage_New');

  return page;
}
