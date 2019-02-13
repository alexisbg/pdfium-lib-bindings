import FFI from 'ffi';
import Path from 'path';
import Ref, { Type } from 'ref';
import StructType from 'ref-struct';
import { PdfImageObjectMetadata, StructTypeWithRef } from './interfaces';
import { PdfiumFfiFuncs } from './pdfium-ffi-interface';


/* eslint-disable @typescript-eslint/camelcase */


// Find location of PDFium native library
let libPath = null;

if (process.platform === 'win32') {
  if (process.arch === 'x64') {
    libPath = '../pdfium/x64/bin/pdfium.dll';
  }
  else {
    libPath = '../pdfium/x86/bin/pdfium.dll';
  }
}
else if (process.platform === 'linux') {
  libPath = '../pdfium/lib/libpdfium.so';
}
else if (process.platform === 'darwin') {
  libPath = '../pdfium/lib/libpdfium.dylib';
}
else {
  throw new Error('Unsupported plateform: ' + process.platform);
}


// Types
const charPtr: Type = Ref.refType('char');
const voidPtr: Type = Ref.refType(Ref.types.void);

const FPDF_BITMAP: Type = voidPtr;
const FPDF_DOCUMENT: Type = voidPtr;
const FPDF_PAGE: Type = voidPtr;
const FPDF_PAGE_ptr: Type = Ref.refType(FPDF_PAGE);
const FPDF_PAGEOBJECT: Type = voidPtr;


// Structs
export const FPDF_FILEWRITE: StructTypeWithRef = StructType({
  version: Ref.types.int,
  WriteBlock: Ref.refType(Ref.types.void)
}) as StructTypeWithRef;
const FPDF_FILEWRITE_ptr: Type = Ref.refType(FPDF_FILEWRITE);

export const FPDF_IMAGEOBJ_METADATA: PdfImageObjectMetadata = StructType({
  width: Ref.types.uint,
  height: Ref.types.uint,
  horizontal_dpi: Ref.types.float,
  vertical_dpi: Ref.types.float,
  bits_per_pixel: Ref.types.uint,
  colorspace: Ref.types.int,
  marked_content_id: Ref.types.int
}) as PdfImageObjectMetadata;
const FPDF_IMAGEOBJ_METADATA_ptr: Type = Ref.refType(FPDF_IMAGEOBJ_METADATA);


// Mapping of useful functions
/* eslint-disable key-spacing */
const pdfiumFuncs: PdfiumFfiFuncs = FFI.Library(Path.resolve(__dirname, libPath), {
  FPDF_CloseDocument:               ['void', [FPDF_DOCUMENT]],
  FPDF_ClosePage:                   ['void', [FPDF_PAGE]],
  FPDF_CreateNewDocument:           [FPDF_DOCUMENT, []],
  FPDF_DestroyLibrary:              ['void', []],
  FPDF_GetLastError:                ['ulong', []],
  FPDF_GetPageCount:                ['int', [FPDF_DOCUMENT]],
  FPDF_GetPageHeight:               ['double', [FPDF_PAGE]],
  FPDF_GetPageWidth:                ['double', [FPDF_PAGE]],
  FPDF_InitLibrary:                 ['void', []],
  FPDF_ImportPages:                 ['int', [FPDF_DOCUMENT, FPDF_DOCUMENT, charPtr /* Buffer */, 'int']],
  FPDF_LoadDocument:                [FPDF_DOCUMENT, [charPtr /* Buffer */, charPtr /* Buffer */]],
  FPDF_LoadMemDocument:             [FPDF_DOCUMENT, [voidPtr /* Buffer */, 'int', charPtr /* Buffer */]],
  FPDF_LoadPage:                    [FPDF_PAGE, [FPDF_DOCUMENT, 'int']],
  FPDF_RenderPageBitmap:            ['void', [FPDF_BITMAP, FPDF_PAGE, 'int', 'int', 'int', 'int', 'int', 'int']],
  FPDF_SaveAsCopy:                  ['int', [FPDF_DOCUMENT, FPDF_FILEWRITE_ptr, 'uint']],
  FPDF_SaveWithVersion:             ['int', [FPDF_DOCUMENT, FPDF_FILEWRITE_ptr, 'uint', 'int']],

  FPDFBitmap_Create:                [FPDF_BITMAP, ['int', 'int', 'int']],
  FPDFBitmap_CreateEx:              [FPDF_BITMAP, ['int', 'int', 'int', voidPtr /* Buffer */, 'int']],
  FPDFBitmap_Destroy:               ['void', [FPDF_BITMAP]],
  FPDFBitmap_GetBuffer:             [voidPtr, [FPDF_BITMAP]],
  FPDFBitmap_FillRect:              ['void', [FPDF_BITMAP, 'int', 'int', 'int', 'int', 'ulong']],
  FPDFBitmap_GetStride:             ['int', [FPDF_BITMAP]],

  FPDFImageObj_GetImageFilterCount: ['int', [FPDF_PAGEOBJECT]],
  FPDFImageObj_GetImageMetadata:    ['int', [FPDF_PAGEOBJECT, FPDF_PAGE, FPDF_IMAGEOBJ_METADATA_ptr /* Buffer */]],
  FPDFImageObj_SetBitmap:           ['int', [FPDF_PAGE_ptr, 'int', FPDF_PAGEOBJECT, FPDF_BITMAP]],
  FPDFImageObj_SetMatrix:           ['int', [FPDF_PAGEOBJECT, 'double', 'double', 'double', 'double', 'double', 'double']],

  FPDFPage_CountObjects:            ['int', [FPDF_PAGE]],
  FPDFPage_GenerateContent:         ['int', [FPDF_PAGE]],
  FPDFPage_HasTransparency:         ['int', [FPDF_PAGE]],
  FPDFPage_InsertObject:            ['void', [FPDF_PAGE, FPDF_PAGEOBJECT]],
  FPDFPage_New:                     [FPDF_PAGE, [FPDF_DOCUMENT, 'int', 'double', 'double']],

  FPDFPageObj_CreateNewRect:        [FPDF_PAGEOBJECT, ['float', 'float', 'float', 'float']],
  FPDFPageObj_NewImageObj:          [FPDF_PAGEOBJECT, [FPDF_DOCUMENT]],
  FPDFPageObj_SetFillColor:         ['int', [FPDF_PAGEOBJECT, 'uint', 'uint', 'uint', 'uint']],
  FPDFPageObj_SetStrokeColor:       ['int', [FPDF_PAGEOBJECT, 'uint', 'uint', 'uint', 'uint']],
});
/* eslint-enable key-spacing */


// WriteBlock callback of FPDF_SaveAsCopy and FPDF_SaveWithVersion
export function writeBlock(bufferArray: Buffer[]): Buffer {

  const cb = FFI.Callback(
    'int',
    [FPDF_FILEWRITE_ptr, voidPtr, 'int'],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fpdfFilewritePtr: any, dataPtr: Buffer, size: number) => {
      const buff = Ref.reinterpret(dataPtr, size, 0);
      bufferArray.push(Buffer.from(buff));

      return size;
    }
  );

  return cb;
}


export function checkError(funcName: string): void {

  const errors = [
    'FPDF_ERR_SUCCESS', // 0
    'FPDF_ERR_UNKNOWN', // 1
    'FPDF_ERR_FILE', // 2
    'FPDF_ERR_FORMAT', // 3
    'FPDF_ERR_PASSWORD', // 4
    'FPDF_ERR_SECURITY', // 5
    'FPDF_ERR_PAGE' // 6
  ];

  const err = pdfiumFuncs.FPDF_GetLastError();
  if (err) {
    throw new Error(`${funcName} error: ${errors[err]}`);
  }
}


export default pdfiumFuncs;
