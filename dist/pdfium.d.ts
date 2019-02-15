import { PdfBitmap, PdfDocument, PdfPage } from './interfaces';
export declare const FPDF_INCREMENTAL = 1;
export declare const FPDF_NO_INCREMENTAL = 2;
export declare const FPDF_REMOVE_SECURITY = 3;
export declare const FPDF_ANNOT = 1;
export declare const FPDF_LCD_TEXT = 2;
export declare const FPDF_NO_NATIVETEXT = 4;
export declare const FPDF_GRAYSCALE = 8;
export declare const FPDF_REVERSE_BYTE_ORDER = 16;
export declare const FPDF_DEBUG_INFO = 128;
export declare const FPDF_PRINTING = 2048;
export declare function closeDocument(document: PdfDocument): void;
export declare function closePage(page: PdfPage): void;
export declare function createNewDocument(): PdfDocument;
export declare function destroyLibrary(): void;
export declare function getPageCount(document: PdfDocument): number;
export declare function getPageHeight(page: PdfPage): number;
export declare function getPageWidth(page: PdfPage): number;
export declare function importPagesAsync(destDoc: PdfDocument, srcDoc: PdfDocument, pageRange: string, insertIndex: number): Promise<void>;
export declare function initLibrary(): void;
export declare function loadDocumentFromBufferAsync(pdfData: Buffer, password?: string | null): Promise<PdfDocument>;
export declare function loadDocumentFromFileAsync(filePath: string, password?: string | null): Promise<PdfDocument>;
export declare function loadPage(document: PdfDocument, pageIndex: number): PdfPage;
export declare function renderPageBitmapAsync(bitmap: PdfBitmap, page: PdfPage, startX: number, startY: number, sizeX: number, sizeY: number, rotate?: number, flags?: number): Promise<void>;
export declare function renderPageBitmapToRgbaBufferAsync(page: PdfPage, startX: number, startY: number, sizeX: number, sizeY: number): Promise<Buffer>;
export declare function saveAsCopyAsync(document: PdfDocument, flags?: number): Promise<Buffer>;
export declare function saveWithVersionAsync(document: PdfDocument, flags?: number, version?: number): Promise<Buffer>;
