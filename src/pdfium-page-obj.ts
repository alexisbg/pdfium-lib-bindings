import PDFiumFFI, { checkError } from './pdfium-ffi';
import { PdfDocument, PdfPageObject } from './interfaces';


export function newImageObj(document: PdfDocument): PdfPageObject {

  const pageObj: PdfPageObject = PDFiumFFI.FPDFPageObj_NewImageObj(document);
  checkError('FPDFPageObj_NewImageObj');

  return pageObj;
}
