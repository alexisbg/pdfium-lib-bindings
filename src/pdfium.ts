import Ref from 'ref';
import PDFiumFFI, { checkError, writeBlock, FPDF_FILEWRITE } from './pdfium-ffi';
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

  return new Promise((resolve, reject) => {

    let pageRangeBuff: Buffer | null = Ref.allocCString(pageRange);

    try {
      PDFiumFFI.FPDF_ImportPages(destDoc, srcDoc, pageRangeBuff, insertIndex);
      checkError('FPDF_ImportPages');

      resolve();
    }

    catch (error) {
      reject(error);
    }

    finally {
      pageRangeBuff = null;
    }
  });
}


export function initLibrary(): void {

  PDFiumFFI.FPDF_InitLibrary();
  checkError('FPDF_InitLibrary');
}


export async function loadDocumentFromBufferAsync(
  pdfData: Buffer, password: string | null = null
): Promise<PdfDocument> {

  return new Promise((resolve, reject) => {

    let passwordBuff: Buffer | null = null;
    if (password) {
      passwordBuff = Ref.allocCString(password);
    }

    try {
      const doc: PdfDocument = PDFiumFFI.FPDF_LoadMemDocument(pdfData, pdfData.byteLength, passwordBuff);
      checkError('FPDF_LoadMemDocument');

      resolve(doc);
    }

    catch (err) {
      reject(err);
    }

    finally {
      passwordBuff = null;
    }
  });
}


export async function loadDocumentFromFileAsync(
  filePath: string, password: string | null = null
): Promise<PdfDocument> {

  return new Promise((resolve, reject) => {

    let filePathBuff: Buffer | null = Ref.allocCString(filePath);

    let passwordBuff: Buffer | null = null;
    if (password) {
      passwordBuff = Ref.allocCString(password);
    }

    try {
      const doc: PdfDocument = PDFiumFFI.FPDF_LoadDocument(filePathBuff, passwordBuff);
      checkError('FPDF_LoadDocument');

      resolve(doc);
    }

    catch (err) {
      reject(err);
    }

    finally {
      filePathBuff = null;
      passwordBuff = null;
    }
  });
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
  rotate: number,
  flags: number
): Promise<void> {

  return new Promise((resolve, reject) => {

    try {
      PDFiumFFI.FPDF_RenderPageBitmap(bitmap, page, startX, startY, sizeX, sizeY, rotate, flags);
      checkError('FPDF_RenderPageBitmap');

      resolve();
    }

    catch (error) {
      reject(error);
    }
  });
}


export async function saveAsCopyAsync(document: PdfDocument, flags: number = 0): Promise<Buffer> {

  return await saveWithVersionAsync(document, flags);
}


export async function saveWithVersionAsync(
  document: PdfDocument, flags: number = 0, version: number = 15
): Promise<Buffer> {

  return new Promise((resolve, reject) => {

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

      resolve(Buffer.concat(savedDocBufferArr));
    }

    catch (error) {
      reject(error);
    }

    finally {
      pdfFileWrite = null;
      wb = null;
      savedDocBufferArr = null;
    }
  });
}
