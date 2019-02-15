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
function renderPageBitmapAsync(bitmap, page, startX, startY, sizeX, sizeY, rotate = 0, flags = 0) {
    return __awaiter(this, void 0, void 0, function* () {
        pdfiumFuncs.FPDF_RenderPageBitmap(bitmap, page, startX, startY, sizeX, sizeY, rotate, flags);
        checkError('FPDF_RenderPageBitmap');
    });
}
function renderPageBitmapToRgbaBufferAsync(page, startX, startY, sizeX, sizeY) {
    return __awaiter(this, void 0, void 0, function* () {
        const width = sizeX - startX;
        const height = sizeY - startY;
        const channels = 4;
        // Create bitmap and its allocated buffer
        const pdfBitmap = create(width, height, 1);
        // Render page to bitmap
        yield renderPageBitmapAsync(pdfBitmap, page, startX, startY, sizeX, sizeY);
        // Get raw bitmap buffer
        let bitmapBuffer = Ref.reinterpret(getBuffer(pdfBitmap), width * height * channels, 0);
        bitmapBuffer = Buffer.from(bitmapBuffer); // Copy it to a new buffer before destroying the bitmap
        // Destroy bitmap
        destroy(pdfBitmap);
        return bitmapBuffer;
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
    renderPageBitmapToRgbaBufferAsync: renderPageBitmapToRgbaBufferAsync,
    saveAsCopyAsync: saveAsCopyAsync,
    saveWithVersionAsync: saveWithVersionAsync
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VzIjpbIi4uL3NyYy9wZGZpdW0tZmZpLnRzIiwiLi4vc3JjL3BkZml1bS1iaXRtYXAudHMiLCIuLi9zcmMvcGRmaXVtLnRzIiwiLi4vc3JjL3BkZml1bS1pbWFnZS1vYmoudHMiLCIuLi9zcmMvcGRmaXVtLXBhZ2UudHMiLCIuLi9zcmMvcGRmaXVtLXBhZ2Utb2JqLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBGRkkgZnJvbSAnZmZpJztcbmltcG9ydCBQYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IFJlZiwgeyBUeXBlIH0gZnJvbSAncmVmJztcbmltcG9ydCBTdHJ1Y3RUeXBlIGZyb20gJ3JlZi1zdHJ1Y3QnO1xuaW1wb3J0IHsgUGRmSW1hZ2VPYmplY3RNZXRhZGF0YSwgU3RydWN0VHlwZVdpdGhSZWYgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUGRmaXVtRmZpRnVuY3MgfSBmcm9tICcuL3BkZml1bS1mZmktaW50ZXJmYWNlJztcblxuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlICovXG5cblxuLy8gRmluZCBsb2NhdGlvbiBvZiBQREZpdW0gbmF0aXZlIGxpYnJhcnlcbmxldCBsaWJQYXRoID0gbnVsbDtcblxuaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicpIHtcbiAgaWYgKHByb2Nlc3MuYXJjaCA9PT0gJ3g2NCcpIHtcbiAgICBsaWJQYXRoID0gJy4uL3BkZml1bS94NjQvYmluL3BkZml1bS5kbGwnO1xuICB9XG4gIGVsc2Uge1xuICAgIGxpYlBhdGggPSAnLi4vcGRmaXVtL3g4Ni9iaW4vcGRmaXVtLmRsbCc7XG4gIH1cbn1cbmVsc2UgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICdsaW51eCcpIHtcbiAgbGliUGF0aCA9ICcuLi9wZGZpdW0vbGliL2xpYnBkZml1bS5zbyc7XG59XG5lbHNlIGlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnZGFyd2luJykge1xuICBsaWJQYXRoID0gJy4uL3BkZml1bS9saWIvbGlicGRmaXVtLmR5bGliJztcbn1cbmVsc2Uge1xuICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIHBsYXRlZm9ybTogJyArIHByb2Nlc3MucGxhdGZvcm0pO1xufVxuXG5cbi8vIFR5cGVzXG5jb25zdCBjaGFyUHRyOiBUeXBlID0gUmVmLnJlZlR5cGUoJ2NoYXInKTtcbmNvbnN0IHZvaWRQdHI6IFR5cGUgPSBSZWYucmVmVHlwZShSZWYudHlwZXMudm9pZCk7XG5cbmNvbnN0IEZQREZfQklUTUFQOiBUeXBlID0gdm9pZFB0cjtcbmNvbnN0IEZQREZfRE9DVU1FTlQ6IFR5cGUgPSB2b2lkUHRyO1xuY29uc3QgRlBERl9QQUdFOiBUeXBlID0gdm9pZFB0cjtcbmNvbnN0IEZQREZfUEFHRV9wdHI6IFR5cGUgPSBSZWYucmVmVHlwZShGUERGX1BBR0UpO1xuY29uc3QgRlBERl9QQUdFT0JKRUNUOiBUeXBlID0gdm9pZFB0cjtcblxuXG4vLyBTdHJ1Y3RzXG5leHBvcnQgY29uc3QgRlBERl9GSUxFV1JJVEU6IFN0cnVjdFR5cGVXaXRoUmVmID0gU3RydWN0VHlwZSh7XG4gIHZlcnNpb246IFJlZi50eXBlcy5pbnQsXG4gIFdyaXRlQmxvY2s6IFJlZi5yZWZUeXBlKFJlZi50eXBlcy52b2lkKVxufSkgYXMgU3RydWN0VHlwZVdpdGhSZWY7XG5jb25zdCBGUERGX0ZJTEVXUklURV9wdHI6IFR5cGUgPSBSZWYucmVmVHlwZShGUERGX0ZJTEVXUklURSk7XG5cbmV4cG9ydCBjb25zdCBGUERGX0lNQUdFT0JKX01FVEFEQVRBOiBQZGZJbWFnZU9iamVjdE1ldGFkYXRhID0gU3RydWN0VHlwZSh7XG4gIHdpZHRoOiBSZWYudHlwZXMudWludCxcbiAgaGVpZ2h0OiBSZWYudHlwZXMudWludCxcbiAgaG9yaXpvbnRhbF9kcGk6IFJlZi50eXBlcy5mbG9hdCxcbiAgdmVydGljYWxfZHBpOiBSZWYudHlwZXMuZmxvYXQsXG4gIGJpdHNfcGVyX3BpeGVsOiBSZWYudHlwZXMudWludCxcbiAgY29sb3JzcGFjZTogUmVmLnR5cGVzLmludCxcbiAgbWFya2VkX2NvbnRlbnRfaWQ6IFJlZi50eXBlcy5pbnRcbn0pIGFzIFBkZkltYWdlT2JqZWN0TWV0YWRhdGE7XG5jb25zdCBGUERGX0lNQUdFT0JKX01FVEFEQVRBX3B0cjogVHlwZSA9IFJlZi5yZWZUeXBlKEZQREZfSU1BR0VPQkpfTUVUQURBVEEpO1xuXG5cbi8vIE1hcHBpbmcgb2YgdXNlZnVsIGZ1bmN0aW9uc1xuLyogZXNsaW50LWRpc2FibGUga2V5LXNwYWNpbmcgKi9cbmNvbnN0IHBkZml1bUZ1bmNzOiBQZGZpdW1GZmlGdW5jcyA9IEZGSS5MaWJyYXJ5KFBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIGxpYlBhdGgpLCB7XG4gIEZQREZfQ2xvc2VEb2N1bWVudDogICAgICAgICAgICAgICBbJ3ZvaWQnLCBbRlBERl9ET0NVTUVOVF1dLFxuICBGUERGX0Nsb3NlUGFnZTogICAgICAgICAgICAgICAgICAgWyd2b2lkJywgW0ZQREZfUEFHRV1dLFxuICBGUERGX0NyZWF0ZU5ld0RvY3VtZW50OiAgICAgICAgICAgW0ZQREZfRE9DVU1FTlQsIFtdXSxcbiAgRlBERl9EZXN0cm95TGlicmFyeTogICAgICAgICAgICAgIFsndm9pZCcsIFtdXSxcbiAgRlBERl9HZXRMYXN0RXJyb3I6ICAgICAgICAgICAgICAgIFsndWxvbmcnLCBbXV0sXG4gIEZQREZfR2V0UGFnZUNvdW50OiAgICAgICAgICAgICAgICBbJ2ludCcsIFtGUERGX0RPQ1VNRU5UXV0sXG4gIEZQREZfR2V0UGFnZUhlaWdodDogICAgICAgICAgICAgICBbJ2RvdWJsZScsIFtGUERGX1BBR0VdXSxcbiAgRlBERl9HZXRQYWdlV2lkdGg6ICAgICAgICAgICAgICAgIFsnZG91YmxlJywgW0ZQREZfUEFHRV1dLFxuICBGUERGX0luaXRMaWJyYXJ5OiAgICAgICAgICAgICAgICAgWyd2b2lkJywgW11dLFxuICBGUERGX0ltcG9ydFBhZ2VzOiAgICAgICAgICAgICAgICAgWydpbnQnLCBbRlBERl9ET0NVTUVOVCwgRlBERl9ET0NVTUVOVCwgY2hhclB0ciAvKiBCdWZmZXIgKi8sICdpbnQnXV0sXG4gIEZQREZfTG9hZERvY3VtZW50OiAgICAgICAgICAgICAgICBbRlBERl9ET0NVTUVOVCwgW2NoYXJQdHIgLyogQnVmZmVyICovLCBjaGFyUHRyIC8qIEJ1ZmZlciAqL11dLFxuICBGUERGX0xvYWRNZW1Eb2N1bWVudDogICAgICAgICAgICAgW0ZQREZfRE9DVU1FTlQsIFt2b2lkUHRyIC8qIEJ1ZmZlciAqLywgJ2ludCcsIGNoYXJQdHIgLyogQnVmZmVyICovXV0sXG4gIEZQREZfTG9hZFBhZ2U6ICAgICAgICAgICAgICAgICAgICBbRlBERl9QQUdFLCBbRlBERl9ET0NVTUVOVCwgJ2ludCddXSxcbiAgRlBERl9SZW5kZXJQYWdlQml0bWFwOiAgICAgICAgICAgIFsndm9pZCcsIFtGUERGX0JJVE1BUCwgRlBERl9QQUdFLCAnaW50JywgJ2ludCcsICdpbnQnLCAnaW50JywgJ2ludCcsICdpbnQnXV0sXG4gIEZQREZfU2F2ZUFzQ29weTogICAgICAgICAgICAgICAgICBbJ2ludCcsIFtGUERGX0RPQ1VNRU5ULCBGUERGX0ZJTEVXUklURV9wdHIsICd1aW50J11dLFxuICBGUERGX1NhdmVXaXRoVmVyc2lvbjogICAgICAgICAgICAgWydpbnQnLCBbRlBERl9ET0NVTUVOVCwgRlBERl9GSUxFV1JJVEVfcHRyLCAndWludCcsICdpbnQnXV0sXG5cbiAgRlBERkJpdG1hcF9DcmVhdGU6ICAgICAgICAgICAgICAgIFtGUERGX0JJVE1BUCwgWydpbnQnLCAnaW50JywgJ2ludCddXSxcbiAgRlBERkJpdG1hcF9DcmVhdGVFeDogICAgICAgICAgICAgIFtGUERGX0JJVE1BUCwgWydpbnQnLCAnaW50JywgJ2ludCcsIHZvaWRQdHIgLyogQnVmZmVyICovLCAnaW50J11dLFxuICBGUERGQml0bWFwX0Rlc3Ryb3k6ICAgICAgICAgICAgICAgWyd2b2lkJywgW0ZQREZfQklUTUFQXV0sXG4gIEZQREZCaXRtYXBfR2V0QnVmZmVyOiAgICAgICAgICAgICBbdm9pZFB0ciwgW0ZQREZfQklUTUFQXV0sXG4gIEZQREZCaXRtYXBfRmlsbFJlY3Q6ICAgICAgICAgICAgICBbJ3ZvaWQnLCBbRlBERl9CSVRNQVAsICdpbnQnLCAnaW50JywgJ2ludCcsICdpbnQnLCAndWxvbmcnXV0sXG4gIEZQREZCaXRtYXBfR2V0U3RyaWRlOiAgICAgICAgICAgICBbJ2ludCcsIFtGUERGX0JJVE1BUF1dLFxuXG4gIEZQREZJbWFnZU9ial9HZXRJbWFnZUZpbHRlckNvdW50OiBbJ2ludCcsIFtGUERGX1BBR0VPQkpFQ1RdXSxcbiAgRlBERkltYWdlT2JqX0dldEltYWdlTWV0YWRhdGE6ICAgIFsnaW50JywgW0ZQREZfUEFHRU9CSkVDVCwgRlBERl9QQUdFLCBGUERGX0lNQUdFT0JKX01FVEFEQVRBX3B0ciAvKiBCdWZmZXIgKi9dXSxcbiAgRlBERkltYWdlT2JqX1NldEJpdG1hcDogICAgICAgICAgIFsnaW50JywgW0ZQREZfUEFHRV9wdHIsICdpbnQnLCBGUERGX1BBR0VPQkpFQ1QsIEZQREZfQklUTUFQXV0sXG4gIEZQREZJbWFnZU9ial9TZXRNYXRyaXg6ICAgICAgICAgICBbJ2ludCcsIFtGUERGX1BBR0VPQkpFQ1QsICdkb3VibGUnLCAnZG91YmxlJywgJ2RvdWJsZScsICdkb3VibGUnLCAnZG91YmxlJywgJ2RvdWJsZSddXSxcblxuICBGUERGUGFnZV9Db3VudE9iamVjdHM6ICAgICAgICAgICAgWydpbnQnLCBbRlBERl9QQUdFXV0sXG4gIEZQREZQYWdlX0dlbmVyYXRlQ29udGVudDogICAgICAgICBbJ2ludCcsIFtGUERGX1BBR0VdXSxcbiAgRlBERlBhZ2VfSGFzVHJhbnNwYXJlbmN5OiAgICAgICAgIFsnaW50JywgW0ZQREZfUEFHRV1dLFxuICBGUERGUGFnZV9JbnNlcnRPYmplY3Q6ICAgICAgICAgICAgWyd2b2lkJywgW0ZQREZfUEFHRSwgRlBERl9QQUdFT0JKRUNUXV0sXG4gIEZQREZQYWdlX05ldzogICAgICAgICAgICAgICAgICAgICBbRlBERl9QQUdFLCBbRlBERl9ET0NVTUVOVCwgJ2ludCcsICdkb3VibGUnLCAnZG91YmxlJ11dLFxuXG4gIEZQREZQYWdlT2JqX0NyZWF0ZU5ld1JlY3Q6ICAgICAgICBbRlBERl9QQUdFT0JKRUNULCBbJ2Zsb2F0JywgJ2Zsb2F0JywgJ2Zsb2F0JywgJ2Zsb2F0J11dLFxuICBGUERGUGFnZU9ial9OZXdJbWFnZU9iajogICAgICAgICAgW0ZQREZfUEFHRU9CSkVDVCwgW0ZQREZfRE9DVU1FTlRdXSxcbiAgRlBERlBhZ2VPYmpfU2V0RmlsbENvbG9yOiAgICAgICAgIFsnaW50JywgW0ZQREZfUEFHRU9CSkVDVCwgJ3VpbnQnLCAndWludCcsICd1aW50JywgJ3VpbnQnXV0sXG4gIEZQREZQYWdlT2JqX1NldFN0cm9rZUNvbG9yOiAgICAgICBbJ2ludCcsIFtGUERGX1BBR0VPQkpFQ1QsICd1aW50JywgJ3VpbnQnLCAndWludCcsICd1aW50J11dLFxufSk7XG4vKiBlc2xpbnQtZW5hYmxlIGtleS1zcGFjaW5nICovXG5cblxuLy8gV3JpdGVCbG9jayBjYWxsYmFjayBvZiBGUERGX1NhdmVBc0NvcHkgYW5kIEZQREZfU2F2ZVdpdGhWZXJzaW9uXG5leHBvcnQgZnVuY3Rpb24gd3JpdGVCbG9jayhidWZmZXJBcnJheTogQnVmZmVyW10pOiBCdWZmZXIge1xuXG4gIGNvbnN0IGNiID0gRkZJLkNhbGxiYWNrKFxuICAgICdpbnQnLFxuICAgIFtGUERGX0ZJTEVXUklURV9wdHIsIHZvaWRQdHIsICdpbnQnXSxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIChmcGRmRmlsZXdyaXRlUHRyOiBhbnksIGRhdGFQdHI6IEJ1ZmZlciwgc2l6ZTogbnVtYmVyKSA9PiB7XG4gICAgICBjb25zdCBidWZmID0gUmVmLnJlaW50ZXJwcmV0KGRhdGFQdHIsIHNpemUsIDApO1xuICAgICAgYnVmZmVyQXJyYXkucHVzaChCdWZmZXIuZnJvbShidWZmKSk7XG5cbiAgICAgIHJldHVybiBzaXplO1xuICAgIH1cbiAgKTtcblxuICByZXR1cm4gY2I7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrRXJyb3IoZnVuY05hbWU6IHN0cmluZyk6IHZvaWQge1xuXG4gIGNvbnN0IGVycm9ycyA9IFtcbiAgICAnRlBERl9FUlJfU1VDQ0VTUycsIC8vIDBcbiAgICAnRlBERl9FUlJfVU5LTk9XTicsIC8vIDFcbiAgICAnRlBERl9FUlJfRklMRScsIC8vIDJcbiAgICAnRlBERl9FUlJfRk9STUFUJywgLy8gM1xuICAgICdGUERGX0VSUl9QQVNTV09SRCcsIC8vIDRcbiAgICAnRlBERl9FUlJfU0VDVVJJVFknLCAvLyA1XG4gICAgJ0ZQREZfRVJSX1BBR0UnIC8vIDZcbiAgXTtcblxuICBjb25zdCBlcnIgPSBwZGZpdW1GdW5jcy5GUERGX0dldExhc3RFcnJvcigpO1xuICBpZiAoZXJyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGAke2Z1bmNOYW1lfSBlcnJvcjogJHtlcnJvcnNbZXJyXX1gKTtcbiAgfVxufVxuXG5cbmV4cG9ydCBkZWZhdWx0IHBkZml1bUZ1bmNzO1xuIiwiaW1wb3J0IFBERml1bUZGSSwgeyBjaGVja0Vycm9yIH0gZnJvbSAnLi9wZGZpdW0tZmZpJztcbmltcG9ydCB7IFBkZkJpdG1hcCB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cblxuLy8gRlBERkJpdG1hcF9DcmVhdGVFeCBmb3JtYXRzXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvY2FtZWxjYXNlICovXG5leHBvcnQgY29uc3QgRlBERkJpdG1hcF9Vbmtub3duID0gMDtcbmV4cG9ydCBjb25zdCBGUERGQml0bWFwX0dyYXkgPSAxO1xuZXhwb3J0IGNvbnN0IEZQREZCaXRtYXBfQkdSID0gMjtcbmV4cG9ydCBjb25zdCBGUERGQml0bWFwX0JHUnggPSAzO1xuZXhwb3J0IGNvbnN0IEZQREZCaXRtYXBfQkdSQSA9IDQ7XG4vKiBlc2xpbnQtZW5hYmxlIEB0eXBlc2NyaXB0LWVzbGludC9jYW1lbGNhc2UgKi9cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyLCBhbHBoYTogbnVtYmVyKTogUGRmQml0bWFwIHtcblxuICBjb25zdCBibXA6IFBkZkJpdG1hcCA9IFBERml1bUZGSS5GUERGQml0bWFwX0NyZWF0ZSh3aWR0aCwgaGVpZ2h0LCBhbHBoYSk7XG4gIGNoZWNrRXJyb3IoJ0ZQREZCaXRtYXBfQ3JlYXRlJyk7XG5cbiAgcmV0dXJuIGJtcDtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRXgod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIGZvcm1hdDogbnVtYmVyLCBmaXJzdFNjYW46IEJ1ZmZlciwgc3RyaWRlOiBudW1iZXIpOiBQZGZCaXRtYXAge1xuXG4gIGNvbnN0IGJtcDogUGRmQml0bWFwID0gUERGaXVtRkZJLkZQREZCaXRtYXBfQ3JlYXRlRXgod2lkdGgsIGhlaWdodCwgZm9ybWF0LCBmaXJzdFNjYW4sIHN0cmlkZSk7XG4gIGNoZWNrRXJyb3IoJ0ZQREZCaXRtYXBfQ3JlYXRlRXgnKTtcblxuICByZXR1cm4gYm1wO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBkZXN0cm95KGJpdG1hcDogUGRmQml0bWFwKTogdm9pZCB7XG5cbiAgUERGaXVtRkZJLkZQREZCaXRtYXBfRGVzdHJveShiaXRtYXApO1xuICBjaGVja0Vycm9yKCdGUERGQml0bWFwX0Rlc3Ryb3knKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0QnVmZmVyKGJpdG1hcDogUGRmQml0bWFwKTogQnVmZmVyIHtcblxuICBjb25zdCBidWZmOiBCdWZmZXIgPSBQREZpdW1GRkkuRlBERkJpdG1hcF9HZXRCdWZmZXIoYml0bWFwKTtcbiAgY2hlY2tFcnJvcignRlBERkJpdG1hcF9HZXRCdWZmZXInKTtcblxuICByZXR1cm4gYnVmZjtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RyaWRlKGJpdG1hcDogUGRmQml0bWFwKTogbnVtYmVyIHtcblxuICBjb25zdCBzdHJpZGU6IG51bWJlciA9IFBERml1bUZGSS5GUERGQml0bWFwX0dldFN0cmlkZShiaXRtYXApO1xuICBjaGVja0Vycm9yKCdGUERGQml0bWFwX0dldFN0cmlkZScpO1xuXG4gIHJldHVybiBzdHJpZGU7XG59XG4iLCJpbXBvcnQgUmVmIGZyb20gJ3JlZic7XG5pbXBvcnQgUERGaXVtRkZJLCB7IGNoZWNrRXJyb3IsIHdyaXRlQmxvY2ssIEZQREZfRklMRVdSSVRFIH0gZnJvbSAnLi9wZGZpdW0tZmZpJztcbmltcG9ydCAqIGFzIFBERml1bUJpdG1hcCBmcm9tICcuL3BkZml1bS1iaXRtYXAnO1xuaW1wb3J0IHsgUGRmQml0bWFwLCBQZGZEb2N1bWVudCwgUGRmUGFnZSwgU3RydWN0VHlwZVdpdGhSZWYgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG4vLyBGUERGX1NhdmVBc0NvcHkgYW5kIEZQREZfU2F2ZVdpdGhWZXJzaW9uIGZsYWdzXG5leHBvcnQgY29uc3QgRlBERl9JTkNSRU1FTlRBTCA9IDE7XG5leHBvcnQgY29uc3QgRlBERl9OT19JTkNSRU1FTlRBTCA9IDI7XG5leHBvcnQgY29uc3QgRlBERl9SRU1PVkVfU0VDVVJJVFkgPSAzO1xuXG5cbi8vIFNvbWUgb2YgRlBERl9SZW5kZXJQYWdlQml0bWFwIHRhZ3NcbmV4cG9ydCBjb25zdCBGUERGX0FOTk9UID0gMHgwMTtcbmV4cG9ydCBjb25zdCBGUERGX0xDRF9URVhUID0gMHgwMjtcbmV4cG9ydCBjb25zdCBGUERGX05PX05BVElWRVRFWFQgPSAweDA0O1xuZXhwb3J0IGNvbnN0IEZQREZfR1JBWVNDQUxFID0gMHgwODtcbmV4cG9ydCBjb25zdCBGUERGX1JFVkVSU0VfQllURV9PUkRFUiA9IDB4MTA7XG5leHBvcnQgY29uc3QgRlBERl9ERUJVR19JTkZPID0gMHg4MDtcbmV4cG9ydCBjb25zdCBGUERGX1BSSU5USU5HID0gMHg4MDA7XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb3NlRG9jdW1lbnQoZG9jdW1lbnQ6IFBkZkRvY3VtZW50KTogdm9pZCB7XG5cbiAgUERGaXVtRkZJLkZQREZfQ2xvc2VEb2N1bWVudChkb2N1bWVudCk7XG4gIGNoZWNrRXJyb3IoJ0ZQREZfQ2xvc2VEb2N1bWVudCcpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBjbG9zZVBhZ2UocGFnZTogUGRmUGFnZSk6IHZvaWQge1xuXG4gIFBERml1bUZGSS5GUERGX0Nsb3NlUGFnZShwYWdlKTtcbiAgY2hlY2tFcnJvcignRlBERl9DbG9zZVBhZ2UnKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTmV3RG9jdW1lbnQoKTogUGRmRG9jdW1lbnQge1xuXG4gIGNvbnN0IGRvYzogUGRmRG9jdW1lbnQgPSBQREZpdW1GRkkuRlBERl9DcmVhdGVOZXdEb2N1bWVudCgpO1xuICBjaGVja0Vycm9yKCdGUERGX0NyZWF0ZU5ld0RvY3VtZW50Jyk7XG5cbiAgcmV0dXJuIGRvYztcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gZGVzdHJveUxpYnJhcnkoKTogdm9pZCB7XG5cbiAgUERGaXVtRkZJLkZQREZfRGVzdHJveUxpYnJhcnkoKTtcbiAgY2hlY2tFcnJvcignRlBERl9EZXN0cm95TGlicmFyeScpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYWdlQ291bnQoZG9jdW1lbnQ6IFBkZkRvY3VtZW50KTogbnVtYmVyIHtcblxuICBjb25zdCBjb3VudDogbnVtYmVyID0gUERGaXVtRkZJLkZQREZfR2V0UGFnZUNvdW50KGRvY3VtZW50KTtcbiAgY2hlY2tFcnJvcignRlBERl9HZXRQYWdlQ291bnQnKTtcblxuICByZXR1cm4gY291bnQ7XG59XG5cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFBhZ2VIZWlnaHQocGFnZTogUGRmUGFnZSk6IG51bWJlciB7XG5cbiAgY29uc3QgaDogbnVtYmVyID0gUERGaXVtRkZJLkZQREZfR2V0UGFnZUhlaWdodChwYWdlKTtcbiAgY2hlY2tFcnJvcignZ2V0UGFnZUhlaWdodCcpO1xuXG4gIHJldHVybiBoO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQYWdlV2lkdGgocGFnZTogUGRmUGFnZSk6IG51bWJlciB7XG5cbiAgY29uc3QgdzogbnVtYmVyID0gUERGaXVtRkZJLkZQREZfR2V0UGFnZVdpZHRoKHBhZ2UpO1xuICBjaGVja0Vycm9yKCdGUERGX0dldFBhZ2VXaWR0aCcpO1xuXG4gIHJldHVybiB3O1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbXBvcnRQYWdlc0FzeW5jKFxuICBkZXN0RG9jOiBQZGZEb2N1bWVudCwgc3JjRG9jOiBQZGZEb2N1bWVudCwgcGFnZVJhbmdlOiBzdHJpbmcsIGluc2VydEluZGV4OiBudW1iZXJcbik6IFByb21pc2U8dm9pZD4ge1xuXG4gIGxldCBwYWdlUmFuZ2VCdWZmOiBCdWZmZXIgfCBudWxsID0gUmVmLmFsbG9jQ1N0cmluZyhwYWdlUmFuZ2UpO1xuXG4gIHRyeSB7XG4gICAgUERGaXVtRkZJLkZQREZfSW1wb3J0UGFnZXMoZGVzdERvYywgc3JjRG9jLCBwYWdlUmFuZ2VCdWZmLCBpbnNlcnRJbmRleCk7XG4gICAgY2hlY2tFcnJvcignRlBERl9JbXBvcnRQYWdlcycpO1xuICB9XG5cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cblxuICBmaW5hbGx5IHtcbiAgICBwYWdlUmFuZ2VCdWZmID0gbnVsbDtcbiAgfVxufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0TGlicmFyeSgpOiB2b2lkIHtcblxuICBQREZpdW1GRkkuRlBERl9Jbml0TGlicmFyeSgpO1xuICBjaGVja0Vycm9yKCdGUERGX0luaXRMaWJyYXJ5Jyk7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWREb2N1bWVudEZyb21CdWZmZXJBc3luYyhcbiAgcGRmRGF0YTogQnVmZmVyLCBwYXNzd29yZDogc3RyaW5nIHwgbnVsbCA9IG51bGxcbik6IFByb21pc2U8UGRmRG9jdW1lbnQ+IHtcblxuICBsZXQgcGFzc3dvcmRCdWZmOiBCdWZmZXIgfCBudWxsID0gbnVsbDtcbiAgaWYgKHBhc3N3b3JkKSB7XG4gICAgcGFzc3dvcmRCdWZmID0gUmVmLmFsbG9jQ1N0cmluZyhwYXNzd29yZCk7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGRvYzogUGRmRG9jdW1lbnQgPSBQREZpdW1GRkkuRlBERl9Mb2FkTWVtRG9jdW1lbnQocGRmRGF0YSwgcGRmRGF0YS5ieXRlTGVuZ3RoLCBwYXNzd29yZEJ1ZmYpO1xuICAgIGNoZWNrRXJyb3IoJ0ZQREZfTG9hZE1lbURvY3VtZW50Jyk7XG5cbiAgICByZXR1cm4gZG9jO1xuICB9XG5cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cblxuICBmaW5hbGx5IHtcbiAgICBwYXNzd29yZEJ1ZmYgPSBudWxsO1xuICB9XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGxvYWREb2N1bWVudEZyb21GaWxlQXN5bmMoXG4gIGZpbGVQYXRoOiBzdHJpbmcsIHBhc3N3b3JkOiBzdHJpbmcgfCBudWxsID0gbnVsbFxuKTogUHJvbWlzZTxQZGZEb2N1bWVudD4ge1xuXG4gIGxldCBmaWxlUGF0aEJ1ZmY6IEJ1ZmZlciB8IG51bGwgPSBSZWYuYWxsb2NDU3RyaW5nKGZpbGVQYXRoKTtcblxuICBsZXQgcGFzc3dvcmRCdWZmOiBCdWZmZXIgfCBudWxsID0gbnVsbDtcbiAgaWYgKHBhc3N3b3JkKSB7XG4gICAgcGFzc3dvcmRCdWZmID0gUmVmLmFsbG9jQ1N0cmluZyhwYXNzd29yZCk7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGRvYzogUGRmRG9jdW1lbnQgPSBQREZpdW1GRkkuRlBERl9Mb2FkRG9jdW1lbnQoZmlsZVBhdGhCdWZmLCBwYXNzd29yZEJ1ZmYpO1xuICAgIGNoZWNrRXJyb3IoJ0ZQREZfTG9hZERvY3VtZW50Jyk7XG5cbiAgICByZXR1cm4gZG9jO1xuICB9XG5cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cblxuICBmaW5hbGx5IHtcbiAgICBmaWxlUGF0aEJ1ZmYgPSBudWxsO1xuICAgIHBhc3N3b3JkQnVmZiA9IG51bGw7XG4gIH1cbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZFBhZ2UoZG9jdW1lbnQ6IFBkZkRvY3VtZW50LCBwYWdlSW5kZXg6IG51bWJlcik6IFBkZlBhZ2Uge1xuXG4gIGNvbnN0IHBhZ2U6IFBkZlBhZ2UgPSBQREZpdW1GRkkuRlBERl9Mb2FkUGFnZShkb2N1bWVudCwgcGFnZUluZGV4KTtcbiAgY2hlY2tFcnJvcignRlBERl9Mb2FkUGFnZScpO1xuXG4gIHJldHVybiBwYWdlO1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiByZW5kZXJQYWdlQml0bWFwQXN5bmMoXG4gIGJpdG1hcDogUGRmQml0bWFwLFxuICBwYWdlOiBQZGZQYWdlLFxuICBzdGFydFg6IG51bWJlcixcbiAgc3RhcnRZOiBudW1iZXIsXG4gIHNpemVYOiBudW1iZXIsXG4gIHNpemVZOiBudW1iZXIsXG4gIHJvdGF0ZTogbnVtYmVyID0gMCxcbiAgZmxhZ3M6IG51bWJlciA9IDBcbik6IFByb21pc2U8dm9pZD4ge1xuXG4gIFBERml1bUZGSS5GUERGX1JlbmRlclBhZ2VCaXRtYXAoYml0bWFwLCBwYWdlLCBzdGFydFgsIHN0YXJ0WSwgc2l6ZVgsIHNpemVZLCByb3RhdGUsIGZsYWdzKTtcbiAgY2hlY2tFcnJvcignRlBERl9SZW5kZXJQYWdlQml0bWFwJyk7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlbmRlclBhZ2VCaXRtYXBUb1JnYmFCdWZmZXJBc3luYyhcbiAgcGFnZTogUGRmUGFnZSxcbiAgc3RhcnRYOiBudW1iZXIsXG4gIHN0YXJ0WTogbnVtYmVyLFxuICBzaXplWDogbnVtYmVyLFxuICBzaXplWTogbnVtYmVyXG4pOiBQcm9taXNlPEJ1ZmZlcj4ge1xuXG4gIGNvbnN0IHdpZHRoID0gc2l6ZVggLSBzdGFydFg7XG4gIGNvbnN0IGhlaWdodCA9IHNpemVZIC0gc3RhcnRZO1xuICBjb25zdCBjaGFubmVscyA9IDQ7XG5cbiAgLy8gQ3JlYXRlIGJpdG1hcCBhbmQgaXRzIGFsbG9jYXRlZCBidWZmZXJcbiAgY29uc3QgcGRmQml0bWFwOiBQZGZCaXRtYXAgPSBQREZpdW1CaXRtYXAuY3JlYXRlKHdpZHRoLCBoZWlnaHQsIDEpO1xuXG4gIC8vIFJlbmRlciBwYWdlIHRvIGJpdG1hcFxuICBhd2FpdCByZW5kZXJQYWdlQml0bWFwQXN5bmMocGRmQml0bWFwLCBwYWdlLCBzdGFydFgsIHN0YXJ0WSwgc2l6ZVgsIHNpemVZKTtcblxuICAvLyBHZXQgcmF3IGJpdG1hcCBidWZmZXJcbiAgbGV0IGJpdG1hcEJ1ZmZlciA9IFJlZi5yZWludGVycHJldChQREZpdW1CaXRtYXAuZ2V0QnVmZmVyKHBkZkJpdG1hcCksIHdpZHRoICogaGVpZ2h0ICogY2hhbm5lbHMsIDApO1xuICBiaXRtYXBCdWZmZXIgPSBCdWZmZXIuZnJvbShiaXRtYXBCdWZmZXIpOyAvLyBDb3B5IGl0IHRvIGEgbmV3IGJ1ZmZlciBiZWZvcmUgZGVzdHJveWluZyB0aGUgYml0bWFwXG5cbiAgLy8gRGVzdHJveSBiaXRtYXBcbiAgUERGaXVtQml0bWFwLmRlc3Ryb3kocGRmQml0bWFwKTtcblxuICByZXR1cm4gYml0bWFwQnVmZmVyO1xufVxuXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzYXZlQXNDb3B5QXN5bmMoZG9jdW1lbnQ6IFBkZkRvY3VtZW50LCBmbGFnczogbnVtYmVyID0gMCk6IFByb21pc2U8QnVmZmVyPiB7XG5cbiAgcmV0dXJuIGF3YWl0IHNhdmVXaXRoVmVyc2lvbkFzeW5jKGRvY3VtZW50LCBmbGFncyk7XG59XG5cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNhdmVXaXRoVmVyc2lvbkFzeW5jKFxuICBkb2N1bWVudDogUGRmRG9jdW1lbnQsIGZsYWdzOiBudW1iZXIgPSAwLCB2ZXJzaW9uOiBudW1iZXIgPSAxNVxuKTogUHJvbWlzZTxCdWZmZXI+IHtcblxuICBsZXQgc2F2ZWREb2NCdWZmZXJBcnI6IEJ1ZmZlcltdIHwgbnVsbCA9IFtdO1xuICBsZXQgd2I6IEJ1ZmZlciB8IG51bGwgPSB3cml0ZUJsb2NrKHNhdmVkRG9jQnVmZmVyQXJyKTtcbiAgbGV0IHBkZkZpbGVXcml0ZTogU3RydWN0VHlwZVdpdGhSZWYgfCBudWxsID0gbmV3IEZQREZfRklMRVdSSVRFKHtcbiAgICB2ZXJzaW9uOiAxLFxuICAgIFdyaXRlQmxvY2s6IHdiXG4gIH0pO1xuXG4gIHRyeSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICBQREZpdW1GRkkuRlBERl9TYXZlV2l0aFZlcnNpb24oZG9jdW1lbnQsIHBkZkZpbGVXcml0ZSEucmVmKCksIGZsYWdzLCB2ZXJzaW9uKTtcbiAgICBjaGVja0Vycm9yKCdGUERGX1NhdmVXaXRoVmVyc2lvbicpO1xuXG4gICAgcmV0dXJuIEJ1ZmZlci5jb25jYXQoc2F2ZWREb2NCdWZmZXJBcnIpO1xuICB9XG5cbiAgY2F0Y2ggKGVycm9yKSB7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cblxuICBmaW5hbGx5IHtcbiAgICBwZGZGaWxlV3JpdGUgPSBudWxsO1xuICAgIHdiID0gbnVsbDtcbiAgICBzYXZlZERvY0J1ZmZlckFyciA9IG51bGw7XG4gIH1cbn1cbiIsImltcG9ydCBQREZpdW1GRkksIHsgY2hlY2tFcnJvciwgRlBERl9JTUFHRU9CSl9NRVRBREFUQSB9IGZyb20gJy4vcGRmaXVtLWZmaSc7XG5pbXBvcnQgeyBQZGZCaXRtYXAsIFBkZkltYWdlT2JqZWN0TWV0YWRhdGEsIFBkZlBhZ2UsIFBkZlBhZ2VPYmplY3QgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRJbWFnZU1ldGFkYXRhKGltYWdlT2JqZWN0OiBQZGZQYWdlT2JqZWN0LCBwYWdlOiBQZGZQYWdlKTogUGRmSW1hZ2VPYmplY3RNZXRhZGF0YSB7XG5cbiAgY29uc3QgbWV0YWRhdGE6IFBkZkltYWdlT2JqZWN0TWV0YWRhdGEgPSBuZXcgRlBERl9JTUFHRU9CSl9NRVRBREFUQSgpO1xuXG4gIC8vIEZQREZJbWFnZU9ial9HZXRJbWFnZU1ldGFkYXRhIGRvZXMgbm90IGNhbGwgRlBERl9HZXRMYXN0RXJyb3JcbiAgaWYgKCFQREZpdW1GRkkuRlBERkltYWdlT2JqX0dldEltYWdlTWV0YWRhdGEoaW1hZ2VPYmplY3QsIHBhZ2UsIG1ldGFkYXRhLnJlZigpKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignRlBERkltYWdlT2JqX0dldEltYWdlTWV0YWRhdGEgZXJyb3InKTtcbiAgfVxuXG4gIHJldHVybiBtZXRhZGF0YTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0SW1hZ2UocGFnZXM6IEJ1ZmZlciB8IG51bGwsIGNvdW50OiBudW1iZXIsIGltYWdlT2JqZWN0OiBQZGZQYWdlT2JqZWN0LCBiaXRtYXA6IFBkZkJpdG1hcCk6IHZvaWQge1xuXG4gIFBERml1bUZGSS5GUERGSW1hZ2VPYmpfU2V0Qml0bWFwKHBhZ2VzLCBjb3VudCwgaW1hZ2VPYmplY3QsIGJpdG1hcCk7XG4gIGNoZWNrRXJyb3IoJ0ZQREZJbWFnZU9ial9TZXRCaXRtYXAnKTtcbn1cblxuXG5leHBvcnQgZnVuY3Rpb24gc2V0TWF0cml4KFxuICBpbWFnZU9iamVjdDogUGRmUGFnZU9iamVjdCxcbiAgYTogbnVtYmVyLFxuICBiOiBudW1iZXIsXG4gIGM6IG51bWJlcixcbiAgZDogbnVtYmVyLFxuICBlOiBudW1iZXIsXG4gIGY6IG51bWJlclxuKTogdm9pZCB7XG5cbiAgUERGaXVtRkZJLkZQREZJbWFnZU9ial9TZXRNYXRyaXgoaW1hZ2VPYmplY3QsIGEsIGIsIGMsIGQsIGUsIGYpO1xuICBjaGVja0Vycm9yKCdGUERGSW1hZ2VPYmpfU2V0TWF0cml4Jyk7XG59XG4iLCJpbXBvcnQgUERGaXVtRkZJLCB7IGNoZWNrRXJyb3IgfSBmcm9tICcuL3BkZml1bS1mZmknO1xuaW1wb3J0IHsgUGRmRG9jdW1lbnQsIFBkZlBhZ2UsIFBkZlBhZ2VPYmplY3QgfSBmcm9tICcuL2ludGVyZmFjZXMnO1xuXG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUNvbnRlbnQocGFnZTogUGRmUGFnZSk6IHZvaWQge1xuXG4gIFBERml1bUZGSS5GUERGUGFnZV9HZW5lcmF0ZUNvbnRlbnQocGFnZSk7XG4gIGNoZWNrRXJyb3IoJ0ZQREZQYWdlX0dlbmVyYXRlQ29udGVudCcpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBpbnNlcnRPYmplY3QocGFnZTogUGRmUGFnZSwgcGFnZU9iajogUGRmUGFnZU9iamVjdCk6IHZvaWQge1xuXG4gIFBERml1bUZGSS5GUERGUGFnZV9JbnNlcnRPYmplY3QocGFnZSwgcGFnZU9iaik7XG4gIGNoZWNrRXJyb3IoJ0ZQREZQYWdlX0luc2VydE9iamVjdCcpO1xufVxuXG5cbmV4cG9ydCBmdW5jdGlvbiBuZXdQYWdlKGRvY3VtZW50OiBQZGZEb2N1bWVudCwgcGFnZUluZGV4OiBudW1iZXIsIHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogUGRmUGFnZSB7XG5cbiAgY29uc3QgcGFnZTogUGRmUGFnZSA9IFBERml1bUZGSS5GUERGUGFnZV9OZXcoZG9jdW1lbnQsIHBhZ2VJbmRleCwgd2lkdGgsIGhlaWdodCk7XG4gIGNoZWNrRXJyb3IoJ0ZQREZQYWdlX05ldycpO1xuXG4gIHJldHVybiBwYWdlO1xufVxuIiwiaW1wb3J0IFBERml1bUZGSSwgeyBjaGVja0Vycm9yIH0gZnJvbSAnLi9wZGZpdW0tZmZpJztcbmltcG9ydCB7IFBkZkRvY3VtZW50LCBQZGZQYWdlT2JqZWN0IH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuXG5leHBvcnQgZnVuY3Rpb24gbmV3SW1hZ2VPYmooZG9jdW1lbnQ6IFBkZkRvY3VtZW50KTogUGRmUGFnZU9iamVjdCB7XG5cbiAgY29uc3QgcGFnZU9iajogUGRmUGFnZU9iamVjdCA9IFBERml1bUZGSS5GUERGUGFnZU9ial9OZXdJbWFnZU9iaihkb2N1bWVudCk7XG4gIGNoZWNrRXJyb3IoJ0ZQREZQYWdlT2JqX05ld0ltYWdlT2JqJyk7XG5cbiAgcmV0dXJuIHBhZ2VPYmo7XG59XG4iXSwibmFtZXMiOlsiUERGaXVtRkZJIiwiUERGaXVtQml0bWFwLmNyZWF0ZSIsIlBERml1bUJpdG1hcC5nZXRCdWZmZXIiLCJQREZpdW1CaXRtYXAuZGVzdHJveSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFRQTs7QUFJQSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUM7QUFFbkIsSUFBSSxPQUFPLENBQUMsUUFBUSxLQUFLLE9BQU8sRUFBRTtJQUNoQyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssS0FBSyxFQUFFO1FBQzFCLE9BQU8sR0FBRyw4QkFBOEIsQ0FBQztLQUMxQztTQUNJO1FBQ0gsT0FBTyxHQUFHLDhCQUE4QixDQUFDO0tBQzFDO0NBQ0Y7S0FDSSxJQUFJLE9BQU8sQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO0lBQ3JDLE9BQU8sR0FBRyw0QkFBNEIsQ0FBQztDQUN4QztLQUNJLElBQUksT0FBTyxDQUFDLFFBQVEsS0FBSyxRQUFRLEVBQUU7SUFDdEMsT0FBTyxHQUFHLCtCQUErQixDQUFDO0NBQzNDO0tBQ0k7SUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztDQUMvRDs7QUFJRCxNQUFNLE9BQU8sR0FBUyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0FBQzFDLE1BQU0sT0FBTyxHQUFTLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUVsRCxNQUFNLFdBQVcsR0FBUyxPQUFPLENBQUM7QUFDbEMsTUFBTSxhQUFhLEdBQVMsT0FBTyxDQUFDO0FBQ3BDLE1BQU0sU0FBUyxHQUFTLE9BQU8sQ0FBQztBQUNoQyxNQUFNLGFBQWEsR0FBUyxHQUFHLENB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
