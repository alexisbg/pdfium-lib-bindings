'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Ref = _interopDefault(require('ref'));
var FFI = _interopDefault(require('ffi'));
var Path = _interopDefault(require('path'));
var StructType = _interopDefault(require('ref-struct'));

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

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
const charPtr = Ref.refType('char');
const voidPtr = Ref.refType(Ref.types.void);
const FPDF_BITMAP = voidPtr;
const FPDF_DOCUMENT = voidPtr;
const FPDF_PAGE = voidPtr;
const FPDF_PAGE_ptr = Ref.refType(FPDF_PAGE);
const FPDF_PAGEOBJECT = voidPtr;
// Structs
const FPDF_FILEWRITE = StructType({
    version: Ref.types.int,
    WriteBlock: Ref.refType(Ref.types.void)
});
const FPDF_FILEWRITE_ptr = Ref.refType(FPDF_FILEWRITE);
const FPDF_IMAGEOBJ_METADATA = StructType({
    width: Ref.types.uint,
    height: Ref.types.uint,
    horizontal_dpi: Ref.types.float,
    vertical_dpi: Ref.types.float,
    bits_per_pixel: Ref.types.uint,
    colorspace: Ref.types.int,
    marked_content_id: Ref.types.int
});
const FPDF_IMAGEOBJ_METADATA_ptr = Ref.refType(FPDF_IMAGEOBJ_METADATA);
// Mapping of useful functions
/* eslint-disable key-spacing */
const pdfiumFuncs = FFI.Library(Path.resolve(__dirname, libPath), {
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
    const cb = FFI.Callback('int', [FPDF_FILEWRITE_ptr, voidPtr, 'int'], 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (fpdfFilewritePtr, dataPtr, size) => {
        const buff = Ref.reinterpret(dataPtr, size, 0);
        bufferArray.push(Buffer.from(buff));
        return size;
    });
    return cb;
}
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

// FPDF_SaveAsCopy and FPDF_SaveWithVersion flags
const FPDF_INCREMENTAL = 1;
const FPDF_NO_INCREMENTAL = 2;
const FPDF_REMOVE_SECURITY = 3;
// Some of FPDF_RenderPageBitmap tags
const FPDF_ANNOT = 0x01;
const FPDF_LCD_TEXT = 0x02;
const FPDF_NO_NATIVETEXT = 0x04;
const FPDF_GRAYSCALE = 0x08;
const FPDF_REVERSE_BYTE_ORDER = 0x10;
const FPDF_DEBUG_INFO = 0x80;
const FPDF_PRINTING = 0x800;
function closeDocument(document) {
    pdfiumFuncs.FPDF_CloseDocument(document);
    checkError('FPDF_CloseDocument');
}
function closePage(page) {
    pdfiumFuncs.FPDF_ClosePage(page);
    checkError('FPDF_ClosePage');
}
function createNewDocument() {
    const doc = pdfiumFuncs.FPDF_CreateNewDocument();
    checkError('FPDF_CreateNewDocument');
    return doc;
}
function destroyLibrary() {
    pdfiumFuncs.FPDF_DestroyLibrary();
    checkError('FPDF_DestroyLibrary');
}
function getPageCount(document) {
    const count = pdfiumFuncs.FPDF_GetPageCount(document);
    checkError('FPDF_GetPageCount');
    return count;
}
function getPageHeight(page) {
    const h = pdfiumFuncs.FPDF_GetPageHeight(page);
    checkError('getPageHeight');
    return h;
}
function getPageWidth(page) {
    const w = pdfiumFuncs.FPDF_GetPageWidth(page);
    checkError('FPDF_GetPageWidth');
    return w;
}
function importPagesAsync(destDoc, srcDoc, pageRange, insertIndex) {
    return __awaiter(this, void 0, void 0, function* () {
        let pageRangeBuff = Ref.allocCString(pageRange);
        try {
            pdfiumFuncs.FPDF_ImportPages(destDoc, srcDoc, pageRangeBuff, insertIndex);
            checkError('FPDF_ImportPages');
        }
        catch (error) {
            throw error;
        }
        finally {
            pageRangeBuff = null;
        }
    });
}
function initLibrary() {
    pdfiumFuncs.FPDF_InitLibrary();
    checkError('FPDF_InitLibrary');
}
function loadDocumentFromBufferAsync(pdfData, password = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let passwordBuff = null;
        if (password) {
            passwordBuff = Ref.allocCString(password);
        }
        try {
            const doc = pdfiumFuncs.FPDF_LoadMemDocument(pdfData, pdfData.byteLength, passwordBuff);
            checkError('FPDF_LoadMemDocument');
            return doc;
        }
        catch (error) {
            throw error;
        }
        finally {
            passwordBuff = null;
        }
    });
}
function loadDocumentFromFileAsync(filePath, password = null) {
    return __awaiter(this, void 0, void 0, function* () {
        let filePathBuff = Ref.allocCString(filePath);
        let passwordBuff = null;
        if (password) {
            passwordBuff = Ref.allocCString(password);
        }
        try {
            const doc = pdfiumFuncs.FPDF_LoadDocument(filePathBuff, passwordBuff);
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
    });
}
function loadPage(document, pageIndex) {
    const page = pdfiumFuncs.FPDF_LoadPage(document, pageIndex);
    checkError('FPDF_LoadPage');
    return page;
}
function renderPageBitmapAsync(bitmap, page, startX, startY, sizeX, sizeY, rotate, flags) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            pdfiumFuncs.FPDF_RenderPageBitmap(bitmap, page, startX, startY, sizeX, sizeY, rotate, flags);
            checkError('FPDF_RenderPageBitmap');
        }
        catch (error) {
            throw error;
        }
    });
}
function saveAsCopyAsync(document, flags = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield saveWithVersionAsync(document, flags);
    });
}
function saveWithVersionAsync(document, flags = 0, version = 15) {
    return __awaiter(this, void 0, void 0, function* () {
        let savedDocBufferArr = [];
        let wb = writeBlock(savedDocBufferArr);
        let pdfFileWrite = new FPDF_FILEWRITE({
            version: 1,
            WriteBlock: wb
        });
        try {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            pdfiumFuncs.FPDF_SaveWithVersion(document, pdfFileWrite.ref(), flags, version);
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
    });
}

var pdfium = /*#__PURE__*/Object.freeze({
    FPDF_INCREMENTAL: FPDF_INCREMENTAL,
    FPDF_NO_INCREMENTAL: FPDF_NO_INCREMENTAL,
    FPDF_REMOVE_SECURITY: FPDF_REMOVE_SECURITY,
    FPDF_ANNOT: FPDF_ANNOT,
    FPDF_LCD_TEXT: FPDF_LCD_TEXT,
    FPDF_NO_NATIVETEXT: FPDF_NO_NATIVETEXT,
    FPDF_GRAYSCALE: FPDF_GRAYSCALE,
    FPDF_REVERSE_BYTE_ORDER: FPDF_REVERSE_BYTE_ORDER,
    FPDF_DEBUG_INFO: FPDF_DEBUG_INFO,
    FPDF_PRINTING: FPDF_PRINTING,
    closeDocument: closeDocument,
    closePage: closePage,
    createNewDocument: createNewDocument,
    destroyLibrary: destroyLibrary,
    getPageCount: getPageCount,
    getPageHeight: getPageHeight,
    getPageWidth: getPageWidth,
    importPagesAsync: importPagesAsync,
    initLibrary: initLibrary,
    loadDocumentFromBufferAsync: loadDocumentFromBufferAsync,
    loadDocumentFromFileAsync: loadDocumentFromFileAsync,
    loadPage: loadPage,
    renderPageBitmapAsync: renderPageBitmapAsync,
    saveAsCopyAsync: saveAsCopyAsync,
    saveWithVersionAsync: saveWithVersionAsync
});

// FPDFBitmap_CreateEx formats
/* eslint-disable @typescript-eslint/camelcase */
const FPDFBitmap_Unknown = 0;
const FPDFBitmap_Gray = 1;
const FPDFBitmap_BGR = 2;
const FPDFBitmap_BGRx = 3;
const FPDFBitmap_BGRA = 4;
/* eslint-enable @typescript-eslint/camelcase */
function create(width, height, alpha) {
    const bmp = pdfiumFuncs.FPDFBitmap_Create(width, height, alpha);
    checkError('FPDFBitmap_Create');
    return bmp;
}
function createEx(width, height, format, firstScan, stride) {
    const bmp = pdfiumFuncs.FPDFBitmap_CreateEx(width, height, format, firstScan, stride);
    checkError('FPDFBitmap_CreateEx');
    return bmp;
}
function destroy(bitmap) {
    pdfiumFuncs.FPDFBitmap_Destroy(bitmap);
    checkError('FPDFBitmap_Destroy');
}
function getBuffer(bitmap) {
    const buff = pdfiumFuncs.FPDFBitmap_GetBuffer(bitmap);
    checkError('FPDFBitmap_GetBuffer');
    return buff;
}
function getStride(bitmap) {
    const stride = pdfiumFuncs.FPDFBitmap_GetStride(bitmap);
    checkError('FPDFBitmap_GetStride');
    return stride;
}

var pdfiumBitmap = /*#__PURE__*/Object.freeze({
    FPDFBitmap_Unknown: FPDFBitmap_Unknown,
    FPDFBitmap_Gray: FPDFBitmap_Gray,
    FPDFBitmap_BGR: FPDFBitmap_BGR,
    FPDFBitmap_BGRx: FPDFBitmap_BGRx,
    FPDFBitmap_BGRA: FPDFBitmap_BGRA,
    create: create,
    createEx: createEx,
    destroy: destroy,
    getBuffer: getBuffer,
    getStride: getStride
});

function getImageMetadata(imageObject, page) {
    const metadata = new FPDF_IMAGEOBJ_METADATA();
    // FPDFImageObj_GetImageMetadata does not call FPDF_GetLastError
    if (!pdfiumFuncs.FPDFImageObj_GetImageMetadata(imageObject, page, metadata.ref())) {
        throw new Error('FPDFImageObj_GetImageMetadata error');
    }
    return metadata;
}
function setImage(pages, count, imageObject, bitmap) {
    pdfiumFuncs.FPDFImageObj_SetBitmap(pages, count, imageObject, bitmap);
    checkError('FPDFImageObj_SetBitmap');
}
function setMatrix(imageObject, a, b, c, d, e, f) {
    pdfiumFuncs.FPDFImageObj_SetMatrix(imageObject, a, b, c, d, e, f);
    checkError('FPDFImageObj_SetMatrix');
}

var pdfiumImageObj = /*#__PURE__*/Object.freeze({
    getImageMetadata: getImageMetadata,
    setImage: setImage,
    setMatrix: setMatrix
});

function generateContent(page) {
    pdfiumFuncs.FPDFPage_GenerateContent(page);
    checkError('FPDFPage_GenerateContent');
}
function insertObject(page, pageObj) {
    pdfiumFuncs.FPDFPage_InsertObject(page, pageObj);
    checkError('FPDFPage_InsertObject');
}
function newPage(document, pageIndex, width, height) {
    const page = pdfiumFuncs.FPDFPage_New(document, pageIndex, width, height);
    checkError('FPDFPage_New');
    return page;
}

var pdfiumPage = /*#__PURE__*/Object.freeze({
    generateContent: generateContent,
    insertObject: insertObject,
    newPage: newPage
});

function newImageObj(document) {
    const pageObj = pdfiumFuncs.FPDFPageObj_NewImageObj(document);
    checkError('FPDFPageObj_NewImageObj');
    return pageObj;
}

var pdfiumPageObj = /*#__PURE__*/Object.freeze({
    newImageObj: newImageObj
});

exports.PDFium = pdfium;
exports.PDFiumBitmap = pdfiumBitmap;
exports.PDFiumImageObj = pdfiumImageObj;
exports.PDFiumPage = pdfiumPage;
exports.PDFiumPageObj = pdfiumPageObj;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9wZGZpdW0tZmZpLnRzIiwiLi4vc3JjL3BkZml1bS50cyIsIi4uL3NyYy9wZGZpdW0tYml0bWFwLnRzIiwiLi4vc3JjL3BkZml1bS1pbWFnZS1vYmoudHMiLCIuLi9zcmMvcGRmaXVtLXBhZ2UudHMiLCIuLi9zcmMvcGRmaXVtLXBhZ2Utb2JqLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGRkkgZnJvbSAnZmZpJztcbmltcG9ydCBQYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IFJlZiwgeyBUeXBlIH0gZnJvbSAncmVmJztcbmltcG9ydCBTdHJ1Y3RUeXBlIGZyb20gJ3JlZi1zdHJ1Y3QnO1xuaW1wb3J0IHsgUGRmSW1hZ2VPYmplY3RNZXRhZGF0YSwgU3RydWN0VHlwZVdpdGhSZWYgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUGRmaXVtRmZpRnVuY3MgfSBmcm9tICcuL3BkZml1bS1mZmktaW50ZXJmYWNlJztcblxuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlICovXG5cblxuLy8gRmluZCBsb2NhdGlvbiBvZiBQREZpdW0gbmF0aXZlIGxpYnJhcnlcbmxldCBsaWJQYXRoID0gbnVsbDtcblxuaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpIHtcbiAgaWYgKHByb2Nlc3MuYXJjaCA9PT0gJ3g2NCcpIHtcbiAgICBsaWJQYXRoID0gJy4uL3BkZml1bS94NjQvYmluL3BkZml1bS5kbGwnO1xuICB9XG4gIGVsc2Uge1xuICAgIGxpYlBhdGggPSAnLi4vcGRmaXVtL3g4Ni9iaW4vcGRmaXVtLmRsbCc7XG4gIH1cbn1cbmVsc2UgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICdsaW51eCcpIHtcbiAgbGliUGF0aCA9ICcuLi9wZGZpdW0vbGliL2xpYnBkZml1bS5zbyc7XG59XG5lbHNlIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnZGFyd2luJykge1xuICBsaWJQYXRoID0gJy4uL3BkZml1bS9saWIvbGlicGRmaXVtLmR5bGliJztcbn1cbmVsc2Uge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHBsYXRlZm9ybTogJyArIHByb2Nlc3MucGxhdGZvcm0pO1xufVxuXG5cbi8vIFR5cGVzXG5jb25zdCBjaGFyUHRyOiBUeXBlID0gUmVmLnJlZlR5cGUoJ2NoYXInKTtcbmNvbnN0IHZvaWRQdHI6IFR5cGUgPSBSZWYucmVmVHlwZShSZWYudHlwZXMudm9pZCk7XG5cbmNvbnN0IEZQREZfQklUTUFQOiBUeXBlID0gdm9pZFB0cjtcbmNvbnN0IEZQREZfRE9DVU1FTlQ6IFR5cGUgPSB2b2lkUHRyO1xuY29uc3QgRlBERl9QQUdFOiBUeXBlID0gdm9pZFB0cjtcbmNvbnN0IEZQREZfUEFHRV9wdHI6IFR5cGUgPSBSZWYucmVmVHlwZShGUERGX1BBR0UpO1xuY29uc3QgRlBERl9QQUdFT0JKRUNUOiBUeXBlID0gdm9pZFB0cjtcblxuXG4vLyBTdHJ1Y3RzXG5leHBvcnQgY29uc3QgRlBERl9GSUxFV1JJVEU6IFN0cnVjdFR5cGVXaXRoUmVmID0gU3RydWN0VHlwZSh7XG4gIHZlcnNpb246IFJlZi50eXBlcy5pbnQsXG4gIFdyaXRlQmxvY2s6IFJlZi5yZWZUeXBlKFJlZi50eXBlcy52b2lkKVxufSkgYXMgU3RydWN0VHlwZVdpdGhSZWY7XG5jb25zdCBGUERGX0ZJTEVXUklURV9wdHI6IFR5cGUgPSBSZWYucmVmVHlwZShGUERGX0ZJTEVXUklURSk7XG5cbmV4cG9ydCBjb25zdCBGUERGX0lNQUdFT0JKX01FVEFEQVRBOiBQZGZJbWFnZU9iamVjdE1ldGFkYXRhID0gU3RydWN0VHlwZSh7XG4gIHdpZHRoOiBSZWYudHlwZXMudWludCxcbiAgaGVpZ2h0OiBSZWYudHlwZXMudWludCxcbiAgaG9yaXpvbnRhbF9kcGk6IFJlZi50eXBlcy5mbG9hdCxcbiAgdmVydGljYWxfZHBpOiBSZWYudHlwZXMuZmxvYXQsXG4gIGJpdHNfcGVyX3BpeGVsOiBSZWYudHlwZXMudWludCxcbiAgY29sb3JzcGFjZTogUmVmLnR5cGVzLmludCxcbiAgbWFya2VkX2NvbnRlbnRfaWQ6IFJlZi50eXBlcy5pbnRcbn0pIGFzIFBkZkltYWdlT2JqZWN0TWV0YWRhdGE7XG5jb25zdCBGUERGX0lNQUdFT0JKX01FVEFEQVRBX3B0cjogVHlwZSA9IFJlZi5yZWZUeXBlKEZQREZfSU1BR0VPQkpfTUVUQURBVEEpO1xuXG5cbi8vIE1hcHBpbmcgb2YgdXNlZnVsIGZ1bmN0aW9uc1xuLyogZXNsaW50LWRpc2FibGUga2V5LXNwYWNpbmcgKi9cbmNvbnN0IHBkZml1bUZ1bmNzOiBQZGZpdW1GZmlGdW5jcyA9IEZGSS5MaWJyYXJ5KFBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIGxpYlBhdGgpLCB7XG4gIEZQREZfQ2xvc2VEb2N1bWVudDogICAgICAgICAgICAgICBbJ3ZvaWQnLCBbRlBERl9ET0NVTUVOVF1dLFxuICBGUERGX0Nsb3NlUGFnZTogICAgICAgICAgICAgICAgICAgWyd2b2lkJywgW0ZQREZfUEFHRV1dLFxuICBGUERGX0NyZWF0ZU5ld0RvY3VtZW50OiAgICAgICAgICAgW0ZQREZfRE9DVU1FTlQsIFtdXSxcbiAgRlBERl9EZXN0cm95TGlicmFyeTogICAgICAgICAgICAgIFsndm9pZCcsIFtdXSxcbiAgRlBERl9HZXRMYXN0RXJyb3I6ICAgICAgICAgICAgICAgIFsndWxvbmcnLCBbXV0sXG4gIEZQREZfR2V0UGFnZUNvdW50OiAgICAgICAgICAgICAgICBbJ2ludCcsIFtGUERGX0RPQ1VNRU5UXV0sXG4gIEZQREZfR2V0UGFnZUhlaWdodDogICAgICAgICAgICAgICBbJ2RvdWJsZScsIFtGUERGX1BBR0VdXSxcbiAgRlBERl9HZXRQYWdlV2lkdGg6ICAgICAgICAgICAgICAgIFsnZG91YmxlJywgW0ZQREZfUEFHRV1dLFxuICBGUERGX0luaXRMaWJyYXJ5OiAgICAgICAgICAgICAgICAgWyd2b2lkJywgW11dLFxuICBGUERGX0ltcG9ydFBhZ2VzOiAgICAgICAgICAgICAgICAgWydpbnQnLCBbRlBERl9ET0NVTUVOVCwgRlBERl9ET0NVTUVOVCwgY2hhclB0ciAvKiBCdWZmZXIgKi8sICdpbnQnXV0sXG4gIEZQREZfTG9hZERvY3VtZW50OiAgICAgICAgICAgICAgICBbRlBERl9ET0NVTUVOVCwgW2NoYXJQdHIgLyogQnVmZmVyICovLCBjaGFyUHRyIC8qIEJ1ZmZlciAqL11dLFxuICBGUERGX0xvYWRNZW1Eb2N1bWVudDogICAgICAgICAgICAgW0ZQREZfRE9DVU1FTlQsIFt2b2lkUHRyIC8qIEJ1ZmZlciAqLywgJ2ludCcsIGNoYXJQdHIgLyogQnVmZmVyICovXV0sXG4gIEZQREZfTG9hZFBhZ2U6ICAgICAgICAgICAgICAgICAgICBbRlBERl9QQUdFLCBbRlBERl9ET0NVTUVOVCwgJ2ludCddXSxcbiAgRlBERl9SZW5kZXJQYWdlQml0bWFwOiAgICAgICAgICAgIFsndm9pZCcsIFtGUERGX0JJVE1BUCwgRlBERl9QQUdFLCAnaW50JywgJ2ludCcsICdpbnQnLCAnaW50JywgJ2ludCcsICdpbnQnXV0sXG4gIEZQREZfU2F2ZUFzQ29weTogICAgICAgICAgICAgICAgICBbJ2ludCcsIFtGUERGX0RPQ1VNRU5ULCBGUERGX0ZJTEVXUklURV9wdHIsICd1aW50J11dLFxuICBGUERGX1NhdmVXaXRoVmVyc2lvbjogICAgICAgICAgICAgWydpbnQnLCBbRlBERl9ET0NVTUVOVCwgRlBERl9GSUxFV1JJVEVfcHRyLCAndWludCcsICdpbnQnXV0sXG5cbiAgRlBERkJpdG1hcF9DcmVhdGU6ICAgICAgICAgICAgICAgIFtGUERGX0JJVE1BUCwgWydpbnQnLCAnaW50JywgJ2ludCddXSxcbiAgRlBERkJpdG1hcF9DcmVhdGVFeDogICAgICAgICAgICAgIFtGUERGX0JJVE1BUCwgWydpbnQnLCAnaW50JywgJ2ludCcsIHZvaWRQdHIgLyogQnVmZmVyICovLCAnaW50J11dLFxuICBGUERGQml0bWFwX0Rlc3Ryb3k6ICAgICAgICAgICAgICAgWyd2b2lkJywgW0ZQREZfQklUTUFQXV0sXG4gIEZQREZCaXRtYXBfR2V0QnVmZmVyOiAgICAgICAgICAgICBbdm9pZFB0ciwgW0ZQREZfQklUTUFQXV0sXG4gIEZQREZCaXRtYXBfRmlsbFJlY3Q6ICAgICAgICAgICAgICBbJ3ZvaWQnLCBbRlBERl9CSVRNQVAsICdpbnQnLCAnaW50JywgJ2ludCcsICdpbnQnLCAndWxvbmcnXV0sXG4gIEZQREZCaXRtYXBfR2V0U3RyaWRlOiAgICAgICAgICAgICBbJ2ludCcsIFtGUERGX0JJVE1BUF1dLFxuXG4gIEZQREZJbWFnZU9ial9HZXRJbWFnZUZpbHRlckNvdW50OiBbJ2ludCcsIFtGUERGX1BBR0VPQkpFQ1RdXSxcbiAgRlBERkltYWdlT2JqX0dldEltYWdlTWV0YWRhdGE6ICAgIFsnaW50JywgW0ZQREZfUEFHRU9CSkVDVCwgRlBERl9QQUdFLCBGUERGX0lNQUdFT0JKX01FVEFEQVRBX3B0ciAvKiBCdWZmZXIgKi9dXSxcbiAgRlBERkltYWdlT2JqX1NldEJpdG1hcDogICAgICAgICAgIFsnaW50JywgW0ZQREZfUEFHRV9wdHIsICdpbnQnLCBGUERGX1BBR0VPQkpFQ1QsIEZQREZfQklUTUFQXV0sXG4gIEZQREZJbWFnZU9ial9TZXRNYXRyaXg6ICAgICAgICAgICBbJ2ludCcsIFtGUERGX1BBR0VPQkpFQ1QsICdkb3VibGUnLCAnZG91YmxlJywgJ2RvdWJsZScsICdkb3VibGUnLCAnZG91YmxlJywgJ2RvdWJsZSddXSxcblxuICBGUERGUGFnZV9Db3VudE9iamVjdHM6ICAgICAgICAgICAgWydpbnQnLCBbRlBERl9QQUdFXV0sXG4gIEZQREZQYWdlX0dlbmVyYXRlQ29udGVudDogICAgICAgICBbJ2ludCcsIFtGUERGX1BBR0VdXSxcbiAgRlBERlBhZ2VfSGFzVHJhbnNwYXJlbmN5OiAgICAgICAgIFsnaW50JywgW0ZQREZfUEFHRV1dLFxuICBGUERGUGFnZV9JbnNlcnRPYmplY3Q6ICAgICAgICAgICAgWyd2b2lkJywgW0ZQREZfUEFHRSwgRlBERl9QQUdFT0JKRUNUXV0sXG4gIEZQREZQYWdlX05ldzogICAgICAgICAgICAgICAgICAgICBbRlBERl9QQUdFLCBbRlBERl9ET0NVTUVOVCwgJ2ludCcsICdkb3VibGUnLCAnZG91YmxlJ11dLFxuXG4gIEZQREZQYWdlT2JqX0NyZWF0ZU5ld1JlY3Q6ICAgICAgICBbRlBERl9QQUdFT0JKRUNULCBbJ2Zsb2F0JywgJ2Zsb2F0JywgJ2Zsb2F0JywgJ2Zsb2F0J11dLFxuICBGUERGUGFnZU9ial9OZXdJbWFnZU9iajogICAgICAgICAgW0ZQREZfUEFHRU9CSkVDVCwgW0ZQREZfRE9DVU1FTlRdXSxcbiAgRlBERlBhZ2VPYmpfU2V0RmlsbENvbG9yOiAgICAgICAgIFsnaW50JywgW0ZQREZfUEFHRU9CSkVDVCwgJ3VpbnQnLCAndWludCcsICd1aW50JywgJ3VpbnQnXV0sXG4gIEZQREZQYWdlT2JqX1NldFN0cm9rZUNvbG9yOiAgICAgICBbJ2ludCcsIFtGUERGX1BBR0VPQkpFQ1QsICd1aW50JywgJ3VpbnQnLCAndWludCcsICd1aW50J11dLFxufSk7XG4vKiBlc2xpbnQtZW5hYmxlIGtleS1zcGFjaW5nICovXG5cblxuLy8gV3JpdGVCbG9jayBjYWxsYmFjayBvZiBGUERGX1NhdmVBc0NvcHkgYW5kIEZQREZfU2F2ZVdpdGhWZXJzaW9uXG5leHBvcnQgZnVuY3Rpb24gd3JpdGVCbG9jayhidWZmZXJBcnJheTogQnVmZmVyW10pOiBCdWZmZXIge1xuXG4gIGNvbnN0IGNiID0gRkZJLkNhbGxiYWNrKFxuICAgICdpbnQnLFxuICAgIFtGUERGX0ZJTEVXUklURV9wdHIsIHZvaWRQdHIsICdpbnQnXSxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIChmcGRmRmlsZXdyaXRlUHRyOiBhbnksIGRhdGFQdHI6IEJ1ZmZlciwgc2l6ZTogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBidWZmID0gUmVmLnJlaW50ZXJwcmV0KGRhdGFQdHIsIHNpemUsIDApO1xuICAgICAgYnVmZmVyQXJyYXkucHVzaChCdWZmZXIuZnJvbShidWZmKSk7XG5cbiAgICAgIHJldHVybiBzaXplO1xuICAgIH1cbiAgKTtcblxuICByZXR1cm4gY2I7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrRXJyb3IoZnVuY05hbWU6IHN0cmluZyk6IHZvaWQge1xuXG4gIGNvbnN0IGVycm9ycyA9IFtcbiAgICAnRlBERl9FUlJfU1VDQ0VTUycsIC8vIDBcbiAgICAnRlBERl9FUlJfVU5LTk9XTicsIC8vIDFcbiAgICAnRlBERl9FUlJfRklMRScsIC8vIDJcbiAgICAnRlBERl9FUlJfRk9STUFUJywgLy8gM1xuICAgICdGUERGX0VSUl9QQVNTV09SRCcsIC8vIDRcbiAgICAnRlBERl9FUlJfU0VDVVJJVFknLCAvLyA1XG4gICAgJ0ZQREZfRVJSX1BBR0UnIC8vIDZcbiAgXTtcblxuICBjb25zdCBlcnIgPSBwZGZpdW1GdW5jcy5GUERGX0dldExhc3RFcnJvcigpO1xuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke2Z1bmNOYW1lfSBlcnJvcjogJHtlcnJvcnNbZXJyXX1gKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHBkZml1bUZ1bmNzO1xuIiwiaW1wb3J0IFJlZiBmcm9tICdyZWYnO1xuaW1wb3J0IFBERml1bUZGSSwgeyBjaGVja0Vycm9yLCB3cml0ZUJsb2NrLCBGUERGX0ZJTEVXUklURSB9IGZyb20gJy4vcGRmaXVtLWZmaSc7XG5pbXBvcnQgeyBQZGZCaXRtYXAsIFBkZkRvY3VtZW50LCBQZGZQYWdlLCBTdHJ1Y3RUeXBlV2l0aFJlZiB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbi8vIEZQREZfU2F2ZUFzQ29weSBhbmQgRlBERl9TYXZlV2l0aFZlcnNpb24gZmxhZ3NcbmV4cG9ydCBjb25zdCBGUERGX0lOQ1JFTUVOVEFMID0gMTtcbmV4cG9ydCBjb25zdCBGUERGX05PX0lOQ1JFTUVOVEFMID0gMjtcbmV4cG9ydCBjb25zdCBGUERGX1JFTU9WRV9TRUNVUklUWSA9IDM7XG5cblxuLy8gU29tZSBvZiBGUERGX1JlbmRlclBhZ2VCaXRtYXAgdGFnc1xuZXhwb3J0IGNvbnN0IEZQREZfQU5OT1QgPSAweDAxO1xuZXhwb3J0IGNvbnN0IEZQREZfTENEX1RFWFQgPSAweDAyO1xuZXhwb3J0IGNvbnN0IEZQREZfTk9fTkFUSVZFVEVYVCA9IDB4MDQ7XG5leHBvcnQgY29uc3QgRlBERl9HUkFZU0NBTEUgPSAweDA4O1xuZXhwb3J0IGNvbnN0IEZQREZfUkVWRVJTRV9CWVRFX09SREVSID0gMHgxMDtcbmV4cG9ydCBjb25zdCBGUERGX0RFQlVHX0lORk8gPSAweDgwO1xuZXhwb3J0IGNvbnN0IEZQREZfUFJJTlRJTkcgPSAweDgwMDtcblxuXG5leHBvcnQgZnVuY3Rpb24gY2xvc2VEb2N1bWVudChkb2N1bWVudDogUGRmRG9jdW1lbnQpOiB2b2lkIHtcblxuICBQREZpdW1GRkkuRlBERl9DbG9zZURvY3VtZW50KGRvY3VtZW50KTtcbiAgY2hlY2tFcnJvcignRlBERl9DbG9zZURvY3VtZW50Jyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlUGFnZShwYWdlOiBQZGZQYWdlKTogdm9pZCB7XG5cbiAgUERGaXVtRkZJLkZQREZfQ2xvc2VQYWdlKHBhZ2UpO1xuICBjaGVja0Vycm9yKCdGUERGX0Nsb3NlUGFnZScpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVOZXdEb2N1bWVudCgpOiBQZGZEb2N1bWVudCB7XG5cbiAgY29uc3QgZG9jOiBQZGZEb2N1bWVudCA9IFBERml1bUZGSS5GUERGX0NyZWF0ZU5ld0RvY3VtZW50KCk7XG4gIGNoZWNrRXJyb3IoJ0ZQREZfQ3JlYXRlTmV3RG9jdW1lbnQnKTtcblxuICByZXR1cm4gZG9jO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95TGlicmFyeSgpOiB2b2lkIHtcblxuICBQREZpdW1GRkkuRlBERl9EZXN0cm95TGlicmFyeSgpO1xuICBjaGVja0Vycm9yKCdGUERGX0Rlc3Ryb3lMaWJyYXJ5Jyk7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhZ2VDb3VudChkb2N1bWVudDogUGRmRG9jdW1lbnQpOiBudW1iZXIge1xuXG4gIGNvbnN0IGNvdW50OiBudW1iZXIgPSBQREZpdW1GRkkuRlBERl9HZXRQYWdlQ291bnQoZG9jdW1lbnQpO1xuICBjaGVja0Vycm9yKCdGUERGX0dldFBhZ2VDb3VudCcpO1xuXG4gIHJldHVybiBjb3VudDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGFnZUhlaWdodChwYWdlOiBQZGZQYWdlKTogbnVtYmVyIHtcblxuICBjb25zdCBoOiBudW1iZXIgPSBQREZpdW1GRkkuRlBERl9HZXRQYWdlSGVpZ2h0KHBhZ2UpO1xuICBjaGVja0Vycm9yKCdnZXRQYWdlSGVpZ2h0Jyk7XG5cbiAgcmV0dXJuIGg7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhZ2VXaWR0aChwYWdlOiBQZGZQYWdlKTogbnVtYmVyIHtcblxuICBjb25zdCB3OiBudW1iZXIgPSBQREZpdW1GRkkuRlBERl9HZXRQYWdlV2lkdGgocGFnZSk7XG4gIGNoZWNrRXJyb3IoJ0ZQREZfR2V0UGFnZVdpZHRoJyk7XG5cbiAgcmV0dXJuIHc7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltcG9ydFBhZ2VzQXN5bmMoXG4gIGRlc3REb2M6IFBkZkRvY3VtZW50LCBzcmNEb2M6IFBkZkRvY3VtZW50LCBwYWdlUmFuZ2U6IHN0cmluZywgaW5zZXJ0SW5kZXg6IG51bWJlclxuKTogUHJvbWlzZTx2b2lkPiB7XG5cbiAgbGV0IHBhZ2VSYW5nZUJ1ZmY6IEJ1ZmZlciB8IG51bGwgPSBSZWYuYWxsb2NDU3RyaW5nKHBhZ2VSYW5nZSk7XG5cbiAgdHJ5IHtcbiAgICBQREZpdW1GRkkuRlBERl9JbXBvcnRQYWdlcyhkZXN0RG9jLCBzcmNEb2MsIHBhZ2VSYW5nZUJ1ZmYsIGluc2VydEluZGV4KTtcbiAgICBjaGVja0Vycm9yKCdGUERGX0ltcG9ydFBhZ2VzJyk7XG4gIH1cblxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxuXG4gIGZpbmFsbHkge1xuICAgIHBhZ2VSYW5nZUJ1ZmYgPSBudWxsO1xuICB9XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRMaWJyYXJ5KCk6IHZvaWQge1xuXG4gIFBERml1bUZGSS5GUERGX0luaXRMaWJyYXJ5KCk7XG4gIGNoZWNrRXJyb3IoJ0ZQREZfSW5pdExpYnJhcnknKTtcbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZERvY3VtZW50RnJvbUJ1ZmZlckFzeW5jKFxuICBwZGZEYXRhOiBCdWZmZXIsIHBhc3N3b3JkOiBzdHJpbmcgfCBudWxsID0gbnVsbFxuKTogUHJvbWlzZTxQZGZEb2N1bWVudD4ge1xuXG4gIGxldCBwYXNzd29yZEJ1ZmY6IEJ1ZmZlciB8IG51bGwgPSBudWxsO1xuICBpZiAocGFzc3dvcmQpIHtcbiAgICBwYXNzd29yZEJ1ZmYgPSBSZWYuYWxsb2NDU3RyaW5nKHBhc3N3b3JkKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgZG9jOiBQZGZEb2N1bWVudCA9IFBERml1bUZGSS5GUERGX0xvYWRNZW1Eb2N1bWVudChwZGZEYXRhLCBwZGZEYXRhLmJ5dGVMZW5ndGgsIHBhc3N3b3JkQnVmZik7XG4gICAgY2hlY2tFcnJvcignRlBERl9Mb2FkTWVtRG9jdW1lbnQnKTtcblxuICAgIHJldHVybiBkb2M7XG4gIH1cblxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxuXG4gIGZpbmFsbHkge1xuICAgIHBhc3N3b3JkQnVmZiA9IG51bGw7XG4gIH1cbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbG9hZERvY3VtZW50RnJvbUZpbGVBc3luYyhcbiAgZmlsZVBhdGg6IHN0cmluZywgcGFzc3dvcmQ6IHN0cmluZyB8IG51bGwgPSBudWxsXG4pOiBQcm9taXNlPFBkZkRvY3VtZW50PiB7XG5cbiAgbGV0IGZpbGVQYXRoQnVmZjogQnVmZmVyIHwgbnVsbCA9IFJlZi5hbGxvY0NTdHJpbmcoZmlsZVBhdGgpO1xuXG4gIGxldCBwYXNzd29yZEJ1ZmY6IEJ1ZmZlciB8IG51bGwgPSBudWxsO1xuICBpZiAocGFzc3dvcmQpIHtcbiAgICBwYXNzd29yZEJ1ZmYgPSBSZWYuYWxsb2NDU3RyaW5nKHBhc3N3b3JkKTtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgZG9jOiBQZGZEb2N1bWVudCA9IFBERml1bUZGSS5GUERGX0xvYWREb2N1bWVudChmaWxlUGF0aEJ1ZmYsIHBhc3N3b3JkQnVmZik7XG4gICAgY2hlY2tFcnJvcignRlBERl9Mb2FkRG9jdW1lbnQnKTtcblxuICAgIHJldHVybiBkb2M7XG4gIH1cblxuICBjYXRjaCAoZXJyb3IpIHtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxuXG4gIGZpbmFsbHkge1xuICAgIGZpbGVQYXRoQnVmZiA9IG51bGw7XG4gICAgcGFzc3dvcmRCdWZmID0gbnVsbDtcbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkUGFnZShkb2N1bWVudDogUGRmRG9jdW1lbnQsIHBhZ2VJbmRleDogbnVtYmVyKTogUGRmUGFnZSB7XG5cbiAgY29uc3QgcGFnZTogUGRmUGFnZSA9IFBERml1bUZGSS5GUERGX0xvYWRQYWdlKGRvY3VtZW50LCBwYWdlSW5kZXgpO1xuICBjaGVja0Vycm9yKCdGUERGX0xvYWRQYWdlJyk7XG5cbiAgcmV0dXJuIHBhZ2U7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbmRlclBhZ2VCaXRtYXBBc3luYyhcbiAgYml0bWFwOiBQZGZCaXRtYXAsXG4gIHBhZ2U6IFBkZlBhZ2UsXG4gIHN0YXJ0WDogbnVtYmVyLFxuICBzdGFydFk6IG51bWJlcixcbiAgc2l6ZVg6IG51bWJlcixcbiAgc2l6ZVk6IG51bWJlcixcbiAgcm90YXRlOiBudW1iZXIsXG4gIGZsYWdzOiBudW1iZXJcbik6IFByb21pc2U8dm9pZD4ge1xuXG4gIHRyeSB7XG4gICAgUERGaXVtRkZJLkZQREZfUmVuZGVyUGFnZUJpdG1hcChiaXRtYXAsIHBhZ2UsIHN0YXJ0WCwgc3RhcnRZLCBzaXplWCwgc2l6ZVksIHJvdGF0ZSwgZmxhZ3MpO1xuICAgIGNoZWNrRXJyb3IoJ0ZQREZfUmVuZGVyUGFnZUJpdG1hcCcpO1xuICB9XG5cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2F2ZUFzQ29weUFzeW5jKGRvY3VtZW50OiBQZGZEb2N1bWVudCwgZmxhZ3M6IG51bWJlciA9IDApOiBQcm9taXNlPEJ1ZmZlcj4ge1xuXG4gIHJldHVybiBhd2FpdCBzYXZlV2l0aFZlcnNpb25Bc3luYyhkb2N1bWVudCwgZmxhZ3MpO1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlV2l0aFZlcnNpb25Bc3luYyhcbiAgZG9jdW1lbnQ6IFBkZkRvY3VtZW50LCBmbGFnczogbnVtYmVyID0gMCwgdmVyc2lvbjogbnVtYmVyID0gMTVcbik6IFByb21pc2U8QnVmZmVyPiB7XG5cbiAgbGV0IHNhdmVkRG9jQnVmZmVyQXJyOiBCdWZmZXJbXSB8IG51bGwgPSBbXTtcbiAgbGV0IHdiOiBCdWZmZXIgfCBudWxsID0gd3JpdGVCbG9jayhzYXZlZERvY0J1ZmZlckFycik7XG4gIGxldCBwZGZGaWxlV3JpdGU6IFN0cnVjdFR5cGVXaXRoUmVmIHwgbnVsbCA9IG5ldyBGUERGX0ZJTEVXUklURSh7XG4gICAgdmVyc2lvbjogMSxcbiAgICBXcml0ZUJsb2NrOiB3YlxuICB9KTtcblxuICB0cnkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgUERGaXVtRkZJLkZQREZfU2F2ZVdpdGhWZXJzaW9uKGRvY3VtZW50LCBwZGZGaWxlV3JpdGUhLnJlZigpLCBmbGFncywgdmVyc2lvbik7XG4gICAgY2hlY2tFcnJvcignRlBERl9TYXZlV2l0aFZlcnNpb24nKTtcblxuICAgIHJldHVybiBCdWZmZXIuY29uY2F0KHNhdmVkRG9jQnVmZmVyQXJyKTtcbiAgfVxuXG4gIGNhdGNoIChlcnJvcikge1xuICAgIHRocm93IGVycm9yO1xuICB9XG5cbiAgZmluYWxseSB7XG4gICAgcGRmRmlsZVdyaXRlID0gbnVsbDtcbiAgICB3YiA9IG51bGw7XG4gICAgc2F2ZWREb2NCdWZmZXJBcnIgPSBudWxsO1xuICB9XG59XG4iLCJpbXBvcnQgUERGaXVtRkZJLCB7IGNoZWNrRXJyb3IgfSBmcm9tICcuL3BkZml1bS1mZmknO1xuaW1wb3J0IHsgUGRmQml0bWFwIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuXG4vLyBGUERGQml0bWFwX0NyZWF0ZUV4IGZvcm1hdHNcbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2UgKi9cbmV4cG9ydCBjb25zdCBGUERGQml0bWFwX1Vua25vd24gPSAwO1xuZXhwb3J0IGNvbnN0IEZQREZCaXRtYXBfR3JheSA9IDE7XG5leHBvcnQgY29uc3QgRlBERkJpdG1hcF9CR1IgPSAyO1xuZXhwb3J0IGNvbnN0IEZQREZCaXRtYXBfQkdSeCA9IDM7XG5leHBvcnQgY29uc3QgRlBERkJpdG1hcF9CR1JBID0gNDtcbi8qIGVzbGludC1lbmFibGUgQHR5cGVzY3JpcHQtZXNsaW50L2NhbWVsY2FzZSAqL1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGUod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGFscGhhOiBudW1iZXIpOiBQZGZCaXRtYXAge1xuXG4gIGNvbnN0IGJtcDogUGRmQml0bWFwID0gUERGaXVtRkZJLkZQREZCaXRtYXBfQ3JlYXRlKHdpZHRoLCBoZWlnaHQsIGFscGhhKTtcbiAgY2hlY2tFcnJvcignRlBERkJpdG1hcF9DcmVhdGUnKTtcblxuICByZXR1cm4gYm1wO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVFeCh3aWR0aDogbnVtYmVyLCBoZWlnaHQ6IG51bWJlciwgZm9ybWF0OiBudW1iZXIsIGZpcnN0U2NhbjogQnVmZmVyLCBzdHJpZGU6IG51bWJlcik6IFBkZkJpdG1hcCB7XG5cbiAgY29uc3QgYm1wOiBQZGZCaXRtYXAgPSBQREZpdW1GRkkuRlBERkJpdG1hcF9DcmVhdGVFeCh3aWR0aCwgaGVpZ2h0LCBmb3JtYXQsIGZpcnN0U2Nhbiwgc3RyaWRlKTtcbiAgY2hlY2tFcnJvcignRlBERkJpdG1hcF9DcmVhdGVFeCcpO1xuXG4gIHJldHVybiBibXA7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGRlc3Ryb3koYml0bWFwOiBQZGZCaXRtYXApOiB2b2lkIHtcblxuICBQREZpdW1GRkkuRlBERkJpdG1hcF9EZXN0cm95KGJpdG1hcCk7XG4gIGNoZWNrRXJyb3IoJ0ZQREZCaXRtYXBfRGVzdHJveScpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCdWZmZXIoYml0bWFwOiBQZGZCaXRtYXApOiBCdWZmZXIge1xuXG4gIGNvbnN0IGJ1ZmY6IEJ1ZmZlciA9IFBERml1bUZGSS5GUERGQml0bWFwX0dldEJ1ZmZlcihiaXRtYXApO1xuICBjaGVja0Vycm9yKCdGUERGQml0bWFwX0dldEJ1ZmZlcicpO1xuXG4gIHJldHVybiBidWZmO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTdHJpZGUoYml0bWFwOiBQZGZCaXRtYXApOiBudW1iZXIge1xuXG4gIGNvbnN0IHN0cmlkZTogbnVtYmVyID0gUERGaXVtRkZJLkZQREZCaXRtYXBfR2V0U3RyaWRlKGJpdG1hcCk7XG4gIGNoZWNrRXJyb3IoJ0ZQREZCaXRtYXBfR2V0U3RyaWRlJyk7XG5cbiAgcmV0dXJuIHN0cmlkZTtcbn1cbiIsImltcG9ydCBQREZpdW1GRkksIHsgY2hlY2tFcnJvciwgRlBERl9JTUFHRU9CSl9NRVRBREFUQSB9IGZyb20gJy4vcGRmaXVtLWZmaSc7XG5pbXBvcnQgeyBQZGZCaXRtYXAsIFBkZkltYWdlT2JqZWN0TWV0YWRhdGEsIFBkZlBhZ2UsIFBkZlBhZ2VPYmplY3QgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZU1ldGFkYXRhKGltYWdlT2JqZWN0OiBQZGZQYWdlT2JqZWN0LCBwYWdlOiBQZGZQYWdlKTogUGRmSW1hZ2VPYmplY3RNZXRhZGF0YSB7XG5cbiAgY29uc3QgbWV0YWRhdGE6IFBkZkltYWdlT2JqZWN0TWV0YWRhdGEgPSBuZXcgRlBERl9JTUFHRU9CSl9NRVRBREFUQSgpO1xuXG4gIC8vIEZQREZJbWFnZU9ial9HZXRJbWFnZU1ldGFkYXRhIGRvZXMgbm90IGNhbGwgRlBERl9HZXRMYXN0RXJyb3JcbiAgaWYgKCFQREZpdW1GRkkuRlBERkltYWdlT2JqX0dldEltYWdlTWV0YWRhdGEoaW1hZ2VPYmplY3QsIHBhZ2UsIG1ldGFkYXRhLnJlZigpKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignRlBERkltYWdlT2JqX0dldEltYWdlTWV0YWRhdGEgZXJyb3InKTtcbiAgfVxuXG4gIHJldHVybiBtZXRhZGF0YTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SW1hZ2UocGFnZXM6IEJ1ZmZlciB8IG51bGwsIGNvdW50OiBudW1iZXIsIGltYWdlT2JqZWN0OiBQZGZQYWdlT2JqZWN0LCBiaXRtYXA6IFBkZkJpdG1hcCk6IHZvaWQge1xuXG4gIFBERml1bUZGSS5GUERGSW1hZ2VPYmpfU2V0Qml0bWFwKHBhZ2VzLCBjb3VudCwgaW1hZ2VPYmplY3QsIGJpdG1hcCk7XG4gIGNoZWNrRXJyb3IoJ0ZQREZJbWFnZU9ial9TZXRCaXRtYXAnKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0TWF0cml4KFxuICBpbWFnZU9iamVjdDogUGRmUGFnZU9iamVjdCxcbiAgYTogbnVtYmVyLFxuICBiOiBudW1iZXIsXG4gIGM6IG51bWJlcixcbiAgZDogbnVtYmVyLFxuICBlOiBudW1iZXIsXG4gIGY6IG51bWJlclxuKTogdm9pZCB7XG5cbiAgUERGaXVtRkZJLkZQREZJbWFnZU9ial9TZXRNYXRyaXgoaW1hZ2VPYmplY3QsIGEsIGIsIGMsIGQsIGUsIGYpO1xuICBjaGVja0Vycm9yKCdGUERGSW1hZ2VPYmpfU2V0TWF0cml4Jyk7XG59XG4iLCJpbXBvcnQgUERGaXVtRkZJLCB7IGNoZWNrRXJyb3IgfSBmcm9tICcuL3BkZml1bS1mZmknO1xuaW1wb3J0IHsgUGRmRG9jdW1lbnQsIFBkZlBhZ2UsIFBkZlBhZ2VPYmplY3QgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUNvbnRlbnQocGFnZTogUGRmUGFnZSk6IHZvaWQge1xuXG4gIFBERml1bUZGSS5GUERGUGFnZV9HZW5lcmF0ZUNvbnRlbnQocGFnZSk7XG4gIGNoZWNrRXJyb3IoJ0ZQREZQYWdlX0dlbmVyYXRlQ29udGVudCcpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRPYmplY3QocGFnZTogUGRmUGFnZSwgcGFnZU9iajogUGRmUGFnZU9iamVjdCk6IHZvaWQge1xuXG4gIFBERml1bUZGSS5GUERGUGFnZV9JbnNlcnRPYmplY3QocGFnZSwgcGFnZU9iaik7XG4gIGNoZWNrRXJyb3IoJ0ZQREZQYWdlX0luc2VydE9iamVjdCcpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdQYWdlKGRvY3VtZW50OiBQZGZEb2N1bWVudCwgcGFnZUluZGV4OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogUGRmUGFnZSB7XG5cbiAgY29uc3QgcGFnZTogUGRmUGFnZSA9IFBERml1bUZGSS5GUERGUGFnZV9OZXcoZG9jdW1lbnQsIHBhZ2VJbmRleCwgd2lkdGgsIGhlaWdodCk7XG4gIGNoZWNrRXJyb3IoJ0ZQREZQYWdlX05ldycpO1xuXG4gIHJldHVybiBwYWdlO1xufVxuIiwiaW1wb3J0IFBERml1bUZGSSwgeyBjaGVja0Vycm9yIH0gZnJvbSAnLi9wZGZpdW0tZmZpJztcbmltcG9ydCB7IFBkZkRvY3VtZW50LCBQZGZQYWdlT2JqZWN0IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuXG5leHBvcnQgZnVuY3Rpb24gbmV3SW1hZ2VPYmooZG9jdW1lbnQ6IFBkZkRvY3VtZW50KTogUGRmUGFnZU9iamVjdCB7XG5cbiAgY29uc3QgcGFnZU9iajogUGRmUGFnZU9iamVjdCA9IFBERml1bUZGSS5GUERGUGFnZU9ial9OZXdJbWFnZU9iaihkb2N1bWVudCk7XG4gIGNoZWNrRXJyb3IoJ0ZQREZQYWdlT2JqX05ld0ltYWdlT2JqJyk7XG5cbiAgcmV0dXJuIHBhZ2VPYmo7XG59XG4iXSwibmFtZXMiOlsiUERGaXVtRkZJIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVFBOztBQUlBLElBQUksT0FBTyxHQUFHLElBQUksQ0FBQztBQUVuQixJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO0lBQ2hDLElBQUksT0FBTyxDQUFDLElBQUksS0FBSyxLQUFLLEVBQUU7UUFDMUIsT0FBTyxHQUFHLDhCQUE4QixDQUFDO0tBQzFDO1NBQ0k7UUFDSCxPQUFPLEdBQUcsOEJBQThCLENBQUM7S0FDMUM7Q0FDRjtLQUNJLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxPQUFPLEVBQUU7SUFDckMsT0FBTyxHQUFHLDRCQUE0QixDQUFDO0NBQ3hDO0tBQ0ksSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLFFBQVEsRUFBRTtJQUN0QyxPQUFPLEdBQUcsK0JBQStCLENBQUM7Q0FDM0M7S0FDSTtJQUNILE1BQU0sSUFBSSxLQUFLLENBQUMseUJBQXlCLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0NBQy9EOztBQUlELE1BQU0sT0FBTyxHQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7QUFDMUMsTUFBTSxPQUFPLEdBQVMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBRWxELE1BQU0sV0FBVyxHQUFTLE9BQU8sQ0FBQztBQUNsQyxNQUFNLGFBQWEsR0FBUyxPQUFPLENBQUM7QUFDcEMsTUFBTSxTQUFTLEdBQVMsT0FBTyxDQUFDO0FBQ2hDLE1BQU0s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
