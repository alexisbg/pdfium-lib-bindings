import PDFiumFFI, { checkError } from './pdfium-ffi';
import { PdfBitmap } from './interfaces';


// FPDFBitmap_CreateEx formats
/* eslint-disable @typescript-eslint/camelcase */
export const FPDFBitmap_Unknown = 0;
export const FPDFBitmap_Gray = 1;
export const FPDFBitmap_BGR = 2;
export const FPDFBitmap_BGRx = 3;
export const FPDFBitmap_BGRA = 4;
/* eslint-enable @typescript-eslint/camelcase */


export function create(width: number, height: number, alpha: number): PdfBitmap {

  const bmp: PdfBitmap = PDFiumFFI.FPDFBitmap_Create(width, height, alpha);
  checkError('FPDFBitmap_Create');

  return bmp;
}


export function createEx(width: number, height: number, format: number, firstScan: Buffer, stride: number): PdfBitmap {

  const bmp: PdfBitmap = PDFiumFFI.FPDFBitmap_CreateEx(width, height, format, firstScan, stride);
  checkError('FPDFBitmap_CreateEx');

  return bmp;
}


export function destroy(bitmap: PdfBitmap): void {

  PDFiumFFI.FPDFBitmap_Destroy(bitmap);
  checkError('FPDFBitmap_Destroy');
}


export function getBuffer(bitmap: PdfBitmap): Buffer {

  const buff: Buffer = PDFiumFFI.FPDFBitmap_GetBuffer(bitmap);
  checkError('FPDFBitmap_GetBuffer');

  return buff;
}


export function getStride(bitmap: PdfBitmap): number {

  const stride: number = PDFiumFFI.FPDFBitmap_GetStride(bitmap);
  checkError('FPDFBitmap_GetStride');

  return stride;
}
