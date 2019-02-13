import PDFiumFFI, { checkError, FPDF_IMAGEOBJ_METADATA } from './pdfium-ffi';
import { PdfBitmap, PdfImageObjectMetadata, PdfPage, PdfPageObject } from './interfaces';


export function getImageMetadata(imageObject: PdfPageObject, page: PdfPage): PdfImageObjectMetadata {

  const metadata: PdfImageObjectMetadata = new FPDF_IMAGEOBJ_METADATA();

  // FPDFImageObj_GetImageMetadata does not call FPDF_GetLastError
  if (!PDFiumFFI.FPDFImageObj_GetImageMetadata(imageObject, page, metadata.ref())) {
    throw new Error('FPDFImageObj_GetImageMetadata error');
  }

  return metadata;
}


export function setImage(pages: Buffer | null, count: number, imageObject: PdfPageObject, bitmap: PdfBitmap): void {

  PDFiumFFI.FPDFImageObj_SetBitmap(pages, count, imageObject, bitmap);
  checkError('FPDFImageObj_SetBitmap');
}


export function setMatrix(
  imageObject: PdfPageObject,
  a: number,
  b: number,
  c: number,
  d: number,
  e: number,
  f: number
): void {

  PDFiumFFI.FPDFImageObj_SetMatrix(imageObject, a, b, c, d, e, f);
  checkError('FPDFImageObj_SetMatrix');
}
