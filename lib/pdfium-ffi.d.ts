import { PdfImageObjectMetadata, StructTypeWithRef } from './interfaces';
import { PdfiumFfiFuncs } from './pdfium-ffi-interface';
export declare const FPDF_FILEWRITE: StructTypeWithRef;
export declare const FPDF_IMAGEOBJ_METADATA: PdfImageObjectMetadata;
declare const pdfiumFuncs: PdfiumFfiFuncs;
export declare function writeBlock(bufferArray: Buffer[]): Buffer;
export declare function checkError(funcName: string): void;
export default pdfiumFuncs;
