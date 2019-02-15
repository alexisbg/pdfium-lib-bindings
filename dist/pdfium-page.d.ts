import { PdfDocument, PdfPage, PdfPageObject } from './interfaces';
export declare function generateContent(page: PdfPage): void;
export declare function insertObject(page: PdfPage, pageObj: PdfPageObject): void;
export declare function newPage(document: PdfDocument, pageIndex: number, width: number, height: number): PdfPage;
