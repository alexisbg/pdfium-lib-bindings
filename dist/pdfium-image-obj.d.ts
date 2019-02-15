import { PdfBitmap, PdfImageObjectMetadata, PdfPage, PdfPageObject } from './interfaces';
export declare function getImageMetadata(imageObject: PdfPageObject, page: PdfPage): PdfImageObjectMetadata;
export declare function setImage(pages: Buffer | null, count: number, imageObject: PdfPageObject, bitmap: PdfBitmap): void;
export declare function setMatrix(imageObject: PdfPageObject, a: number, b: number, c: number, d: number, e: number, f: number): void;
