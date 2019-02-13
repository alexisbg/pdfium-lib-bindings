"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ffi_1 = __importDefault(require("ffi"));
const path_1 = __importDefault(require("path"));
const ref_1 = __importDefault(require("ref"));
const ref_struct_1 = __importDefault(require("ref-struct"));
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
const charPtr = ref_1.default.refType('char');
const voidPtr = ref_1.default.refType(ref_1.default.types.void);
const FPDF_BITMAP = voidPtr;
const FPDF_DOCUMENT = voidPtr;
const FPDF_PAGE = voidPtr;
const FPDF_PAGE_ptr = ref_1.default.refType(FPDF_PAGE);
const FPDF_PAGEOBJECT = voidPtr;
// Structs
exports.FPDF_FILEWRITE = ref_struct_1.default({
    version: ref_1.default.types.int,
    WriteBlock: ref_1.default.refType(ref_1.default.types.void)
});
const FPDF_FILEWRITE_ptr = ref_1.default.refType(exports.FPDF_FILEWRITE);
exports.FPDF_IMAGEOBJ_METADATA = ref_struct_1.default({
    width: ref_1.default.types.uint,
    height: ref_1.default.types.uint,
    horizontal_dpi: ref_1.default.types.float,
    vertical_dpi: ref_1.default.types.float,
    bits_per_pixel: ref_1.default.types.uint,
    colorspace: ref_1.default.types.int,
    marked_content_id: ref_1.default.types.int
});
const FPDF_IMAGEOBJ_METADATA_ptr = ref_1.default.refType(exports.FPDF_IMAGEOBJ_METADATA);
// Mapping of useful functions
/* eslint-disable key-spacing */
const pdfiumFuncs = ffi_1.default.Library(path_1.default.resolve(__dirname, libPath), {
    FPDF_CloseDocument: ['void', [FPDF_DOCUMENT]],
    FPDF_ClosePage: ['void', [FPDF_PAGE]],
    FPDF_CreateNewDocument: [FPDF_DOCUMENT, []],
    FPDF_DestroyLibrary: ['void', []],
    FPDF_GetLastError: ['ulong', []],
    FPDF_GetPageCount: ['int', [FPDF_DOCUMENT]],
    FPDF_GetPageHeight: ['double', [FPDF_PAGE]],
    FPDF_GetPageWidth: ['double', [FPDF_PAGE]],
    FPDF_InitLibrary: ['void', []],
    FPDF_ImportPages: ['int', [FPDF_DOCUMENT, FPDF_DOCUMENT, charPtr /* Buffer */, 'int']],
    FPDF_LoadDocument: [FPDF_DOCUMENT, [charPtr /* Buffer */, charPtr /* Buffer */]],
    FPDF_LoadMemDocument: [FPDF_DOCUMENT, [voidPtr /* Buffer */, 'int', charPtr /* Buffer */]],
    FPDF_LoadPage: [FPDF_PAGE, [FPDF_DOCUMENT, 'int']],
    FPDF_RenderPageBitmap: ['void', [FPDF_BITMAP, FPDF_PAGE, 'int', 'int', 'int', 'int', 'int', 'int']],
    FPDF_SaveAsCopy: ['int', [FPDF_DOCUMENT, FPDF_FILEWRITE_ptr, 'uint']],
    FPDF_SaveWithVersion: ['int', [FPDF_DOCUMENT, FPDF_FILEWRITE_ptr, 'uint', 'int']],
    FPDFBitmap_Create: [FPDF_BITMAP, ['int', 'int', 'int']],
    FPDFBitmap_CreateEx: [FPDF_BITMAP, ['int', 'int', 'int', voidPtr /* Buffer */, 'int']],
    FPDFBitmap_Destroy: ['void', [FPDF_BITMAP]],
    FPDFBitmap_GetBuffer: [voidPtr, [FPDF_BITMAP]],
    FPDFBitmap_FillRect: ['void', [FPDF_BITMAP, 'int', 'int', 'int', 'int', 'ulong']],
    FPDFBitmap_GetStride: ['int', [FPDF_BITMAP]],
    FPDFImageObj_GetImageFilterCount: ['int', [FPDF_PAGEOBJECT]],
    FPDFImageObj_GetImageMetadata: ['int', [FPDF_PAGEOBJECT, FPDF_PAGE, FPDF_IMAGEOBJ_METADATA_ptr /* Buffer */]],
    FPDFImageObj_SetBitmap: ['int', [FPDF_PAGE_ptr, 'int', FPDF_PAGEOBJECT, FPDF_BITMAP]],
    FPDFImageObj_SetMatrix: ['int', [FPDF_PAGEOBJECT, 'double', 'double', 'double', 'double', 'double', 'double']],
    FPDFPage_CountObjects: ['int', [FPDF_PAGE]],
    FPDFPage_GenerateContent: ['int', [FPDF_PAGE]],
    FPDFPage_HasTransparency: ['int', [FPDF_PAGE]],
    FPDFPage_InsertObject: ['void', [FPDF_PAGE, FPDF_PAGEOBJECT]],
    FPDFPage_New: [FPDF_PAGE, [FPDF_DOCUMENT, 'int', 'double', 'double']],
    FPDFPageObj_CreateNewRect: [FPDF_PAGEOBJECT, ['float', 'float', 'float', 'float']],
    FPDFPageObj_NewImageObj: [FPDF_PAGEOBJECT, [FPDF_DOCUMENT]],
    FPDFPageObj_SetFillColor: ['int', [FPDF_PAGEOBJECT, 'uint', 'uint', 'uint', 'uint']],
    FPDFPageObj_SetStrokeColor: ['int', [FPDF_PAGEOBJECT, 'uint', 'uint', 'uint', 'uint']],
});
/* eslint-enable key-spacing */
// WriteBlock callback of FPDF_SaveAsCopy and FPDF_SaveWithVersion
function writeBlock(bufferArray) {
    const cb = ffi_1.default.Callback('int', [FPDF_FILEWRITE_ptr, voidPtr, 'int'], 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fpdfFilewritePtr, dataPtr, size) => {
        const buff = ref_1.default.reinterpret(dataPtr, size, 0);
        bufferArray.push(Buffer.from(buff));
        return size;
    });
    return cb;
}
exports.writeBlock = writeBlock;
function checkError(funcName) {
    const errors = [
        'FPDF_ERR_SUCCESS',
        'FPDF_ERR_UNKNOWN',
        'FPDF_ERR_FILE',
        'FPDF_ERR_FORMAT',
        'FPDF_ERR_PASSWORD',
        'FPDF_ERR_SECURITY',
        'FPDF_ERR_PAGE' // 6
    ];
    const err = pdfiumFuncs.FPDF_GetLastError();
    if (err) {
        throw new Error(`${funcName} error: ${errors[err]}`);
    }
}
exports.checkError = checkError;
exports.default = pdfiumFuncs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmaXVtLWZmaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wZGZpdW0tZmZpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOENBQXNCO0FBQ3RCLGdEQUF3QjtBQUN4Qiw4Q0FBZ0M7QUFDaEMsNERBQW9DO0FBS3BDLGlEQUFpRDtBQUdqRCx5Q0FBeUM7QUFDekMsSUFBSSxPQUFPLEdBQUcsSUFBSSxDQUFDO0FBRW5CLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7SUFDaEMsSUFBSSxPQUFPLENBQUMsSUFBSSxLQUFLLEtBQUssRUFBRTtRQUMxQixPQUFPLEdBQUcsOEJBQThCLENBQUM7S0FDMUM7U0FDSTtRQUNILE9BQU8sR0FBRyw4QkFBOEIsQ0FBQztLQUMxQztDQUNGO0tBQ0ksSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtJQUNyQyxPQUFPLEdBQUcsNEJBQTRCLENBQUM7Q0FDeEM7S0FDSSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssUUFBUSxFQUFFO0lBQ3RDLE9BQU8sR0FBRywrQkFBK0IsQ0FBQztDQUMzQztLQUNJO0lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyx5QkFBeUIsR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7Q0FDL0Q7QUFHRCxRQUFRO0FBQ1IsTUFBTSxPQUFPLEdBQVMsYUFBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztBQUMxQyxNQUFNLE9BQU8sR0FBUyxhQUFHLENBQUMsT0FBTyxDQUFDLGFBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7QUFFbEQsTUFBTSxXQUFXLEdBQVMsT0FBTyxDQUFDO0FBQ2xDLE1BQU0sYUFBYSxHQUFTLE9BQU8sQ0FBQztBQUNwQyxNQUFNLFNBQVMsR0FBUyxPQUFPLENBQUM7QUFDaEMsTUFBTSxhQUFhLEdBQVMsYUFBRyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNuRCxN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