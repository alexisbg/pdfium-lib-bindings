import { PdfBitmap, PdfDocument, PdfPage, PdfPageObject } from './interfaces';


/* eslint-disable @typescript-eslint/camelcase */

export interface PdfiumFfiFuncs {

  FPDF_CloseDocument(document: PdfDocument): void;

  FPDF_ClosePage(page: PdfPage): void;

  FPDF_CreateNewDocument(): PdfDocument;

  FPDF_DestroyLibrary(): void;

  FPDF_GetLastError(): number;

  FPDF_GetPageCount(document: PdfDocument): number;

  FPDF_GetPageHeight(page: PdfPage): number;

  FPDF_GetPageWidth(page: PdfPage): number;

  FPDF_ImportPages(dest_doc: PdfDocument, src_doc: PdfDocument, pagerange: Buffer, index: number): number;

  FPDF_InitLibrary(): void;

  FPDF_LoadDocument(file_path: Buffer, password: Buffer | null): PdfDocument;

  FPDF_LoadMemDocument(data_buf: Buffer, size: number, password: Buffer | null): PdfDocument;

  FPDF_LoadPage(document: PdfDocument, page_index: number): PdfPage;

  FPDF_RenderPageBitmap(
    bitmap: PdfBitmap,
    page: PdfPage,
    start_x: number,
    start_y: number,
    size_x: number,
    size_y: number,
    rotate: number,
    flags: number
  ): void;

  FPDF_SaveAsCopy(document: PdfDocument, pFileWrite: Buffer, flags: number): number;

  FPDF_SaveWithVersion(document: PdfDocument, pFileWrite: Buffer, flags: number, version: number): number;

  FPDFBitmap_Create(width: number, height: number, alpha: number): PdfBitmap;

  FPDFBitmap_CreateEx(width: number, height: number, format: number, first_scan: Buffer, stride: number): PdfBitmap;

  FPDFBitmap_Destroy(bitmap: PdfBitmap): void;

  FPDFBitmap_GetBuffer(bitmap: PdfBitmap): Buffer;

  FPDFBitmap_FillRect(
    bitmap: PdfBitmap,
    left: number,
    top: number,
    width: number,
    height: number,
    color: number
  ): void;

  FPDFBitmap_GetStride(bitmap: PdfBitmap): number;

  FPDFImageObj_GetImageFilterCount(image_object: PdfPageObject): number;

  FPDFImageObj_GetImageMetadata(image_object: PdfPageObject, page: PdfPage, metadata: Buffer): number;

  FPDFImageObj_SetBitmap(pages: Buffer | null, count: number, image_object: PdfPageObject, bitmap: PdfBitmap): number;

  FPDFImageObj_SetMatrix(
    image_object: PdfPageObject,
    a: number,
    b: number,
    c: number,
    d: number,
    e: number,
    f: number
  ): number;

  FPDFPage_CountObjects(page: PdfPage): number;

  FPDFPage_GenerateContent(page: PdfPage): number;

  FPDFPage_HasTransparency(page: PdfPage): number;

  FPDFPage_InsertObject(page: PdfPage, page_obj: PdfPageObject): void;

  FPDFPage_New(document: PdfDocument, page_index: number, width: number, height: number): PdfPage;

  FPDFPageObj_CreateNewRect(x: number, y: number, w: number, h: number): PdfPageObject;

  FPDFPageObj_NewImageObj(document: PdfDocument): PdfPageObject;

  FPDFPageObj_SetFillColor(page_object: PdfPageObject, R: number, G: number, B: number, A: number): number;

  FPDFPageObj_SetStrokeColor(page_object: PdfPageObject, R: number, G: number, B: number, A: number): number;
}
