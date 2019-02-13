import StructType from 'ref-struct';
export interface PdfBitmap extends Buffer {
}
export interface PdfDocument extends Buffer {
}
export interface PdfImageObject extends Buffer {
}
export interface PdfPage extends Buffer {
}
export interface PdfPageObject extends Buffer {
}
export interface StructTypeWithRef extends StructType {
    ref(): Buffer;
}
export interface PdfImageObjectMetadata extends StructTypeWithRef {
    width: number;
    height: number;
    horizontal_dpi: number;
    vertical_dpi: number;
    bits_per_pixel: number;
    colorspace: number;
    marked_content_id: number;
}
