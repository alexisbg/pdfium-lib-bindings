import Ref from 'ref';
import PDFiumFFI, { checkError, writeBlock, FPDF_FILEWRITE } from './pdfium-ffi';
import * as PDFiumBitmap from './pdfium-bitmap';
import { PdfBitmap, PdfDocument, PdfPage, StructTypeWithRef } from './interfaces';

// FPDF_SaveAsCopy and FPDF_SaveWithVersion flags
export const FPDF_INCREMENTAL = 1;
export const FPDF_NO_INCREMENTAL = 2;
export const FPDF_REMOVE_SECURITY = 3;


// Some of FPDF_RenderPageBitmap tags
export const FPDF_ANNOT = 0x01;
export const FPDF_LCD_TEXT = 0x02;
export const FPDF_NO_NATIVETEXT = 0x04;
export const FPDF_GRAYSCALE = 0x08;
export const FPDF_REVERSE_BYTE_ORDER = 0x10;
export const FPDF_DEBUG_INFO = 0x80;
export const FPDF_PRINTING = 0x800;


export function closeDocument(document: PdfDocument): void {

  PDFiumFFI.FPDF_CloseDocument(document);
  checkError('FPDF_CloseDocument');
}


export function closePage(page: PdfPage): void {

  PDFiumFFI.FPDF_ClosePage(page);
  checkError('FPDF_ClosePage');
}


export function createNewDocument(): PdfDocument {

  const doc: PdfDocument = PDFiumFFI.FPDF_CreateNewDocument();
  checkError('FPDF_CreateNewDocument');

  return doc;
}


export function destroyLibrary(): void {

  PDFiumFFI.FPDF_DestroyLibrary();
  checkError('FPDF_DestroyLibrary');
}


export function getPageCount(document: PdfDocument): number {

  const count: number = PDFiumFFI.FPDF_GetPageCount(document);
  checkError('FPDF_GetPageCount');

  return count;
}


export function getPageHeight(page: PdfPage): number {

  const h: number = PDFiumFFI.FPDF_GetPageHeight(page);
  checkError('getPageHeight');

  return h;
}


export function getPageWidth(page: PdfPage): number {

  const w: number = PDFiumFFI.FPDF_GetPageWidth(page);
  checkError('FPDF_GetPageWidth');

  return w;
}


export async function importPagesAsync(
  destDoc: PdfDocument, srcDoc: PdfDocument, pageRange: string, insertIndex: number
): Promise<void> {

  let pageRangeBuff: Buffer | null = Ref.allocCString(pageRange);

  try {
    PDFiumFFI.FPDF_ImportPages(destDoc, srcDoc, pageRangeBuff, insertIndex);
    checkError('FPDF_ImportPages');
  }

  catch (error) {
    throw error;
  }

  finally {
    pageRangeBuff = null;
  }
}


export function initLibrary(): void {

  PDFiumFFI.FPDF_InitLibrary();
  checkError('FPDF_InitLibrary');
}


export async function loadDocumentFromBufferAsync(
  pdfData: Buffer, password: string | null = null
): Promise<PdfDocument> {

  let passwordBuff: Buffer | null = null;
  if (password) {
    passwordBuff = Ref.allocCString(password);
  }

  try {
    const doc: PdfDocument = PDFiumFFI.FPDF_LoadMemDocument(pdfData, pdfData.byteLength, passwordBuff);
    checkError('FPDF_LoadMemDocument');

    return doc;
  }

  catch (error) {
    throw error;
  }

  finally {
    passwordBuff = null;
  }
}


export async function loadDocumentFromFileAsync(
  filePath: string, password: string | null = null
): Promise<PdfDocument> {

  let filePathBuff: Buffer | null = Ref.allocCString(filePath);

  let passwordBuff: Buffer | null = null;
  if (password) {
    passwordBuff = Ref.allocCString(password);
  }

  try {
    const doc: PdfDocument = PDFiumFFI.FPDF_LoadDocument(filePathBuff, passwordBuff);
    checkError('FPDF_LoadDocument');

    return doc;
  }

  catch (error) {
    throw error;
  }

  finally {
    filePathBuff = null;
    passwordBuff = null;
  }
}


export function loadPage(document: PdfDocument, pageIndex: number): PdfPage {

  const page: PdfPage = PDFiumFFI.FPDF_LoadPage(document, pageIndex);
  checkError('FPDF_LoadPage');

  return page;
}


export async function renderPageBitmapAsync(
  bitmap: PdfBitmap,
  page: PdfPage,
  startX: number,
  startY: number,
  sizeX: number,
  sizeY: number,
  rotate: number = 0,
  flags: number = 0
): Promise<void> {

  PDFiumFFI.FPDF_RenderPageBitmap(bitmap, page, startX, startY, sizeX, sizeY, rotate, flags);
  checkError('FPDF_RenderPageBitmap');
}


export async function renderPageBitmapToRgbaBufferAsync(
  bitmap: PdfBitmap,
  page: PdfPage,
  startX: number,
  startY: number,
  sizeX: number,
  sizeY: number
): Promise<Buffer> {

  const width = sizeX - startX;
  const height = sizeY - startY;
  const channels = 4;

  // Create bitmap and its allocated buffer
  const pdfBitmap: PdfBitmap = PDFiumBitmap.create(width, height, 1);

  // Render page to bitmap
  renderPageBitmapAsync(bitmap, page, startX, startY, sizeX, sizeY);

  // Get raw bitmap buffer
  let bitmapBuffer = Ref.reinterpret(PDFiumBitmap.getBuffer(pdfBitmap), width * height * channels, 0);
  bitmapBuffer = Buffer.from(bitmapBuffer); // Copy it to a new buffer before destroying the bitmap

  // Destroy bitmap
  PDFiumBitmap.destroy(pdfBitmap);

  return bitmapBuffer;
}


export async function saveAsCopyAsync(document: PdfDocument, flags: number = 0): Promise<Buffer> {

  return await saveWithVersionAsync(document, flags);
}


export async function saveWithVersionAsync(
  document: PdfDocument, flags: number = 0, version: number = 15
): Promise<Buffer> {

  let savedDocBufferArr: Buffer[] | null = [];
  let wb: Buffer | null = writeBlock(savedDocBufferArr);
  let pdfFileWrite: StructTypeWithRef | null = new FPDF_FILEWRITE({
    version: 1,
    WriteBlock: wb
  });

  try {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    PDFiumFFI.FPDF_SaveWithVersion(document, pdfFileWrite!.ref(), flags, version);
    checkError('FPDF_SaveWithVersion');

    return Buffer.concat(savedDocBufferArr);
  }

  catch (error) {
    throw error;
  }

  finally {
    pdfFileWrite = null;
    wb = null;
    savedDocBufferArr = null;
  }
}
