"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const ref_1 = __importDefault(require("ref"));
const pdfium_ffi_1 = __importStar(require("./pdfium-ffi"));
// FPDF_SaveAsCopy and FPDF_SaveWithVersion flags
exports.FPDF_INCREMENTAL = 1;
exports.FPDF_NO_INCREMENTAL = 2;
exports.FPDF_REMOVE_SECURITY = 3;
// Some of FPDF_RenderPageBitmap tags
exports.FPDF_ANNOT = 0x01;
exports.FPDF_LCD_TEXT = 0x02;
exports.FPDF_NO_NATIVETEXT = 0x04;
exports.FPDF_GRAYSCALE = 0x08;
exports.FPDF_REVERSE_BYTE_ORDER = 0x10;
exports.FPDF_DEBUG_INFO = 0x80;
exports.FPDF_PRINTING = 0x800;
function closeDocument(document) {
    pdfium_ffi_1.default.FPDF_CloseDocument(document);
    pdfium_ffi_1.checkError('FPDF_CloseDocument');
}
exports.closeDocument = closeDocument;
function closePage(page) {
    pdfium_ffi_1.default.FPDF_ClosePage(page);
    pdfium_ffi_1.checkError('FPDF_ClosePage');
}
exports.closePage = closePage;
function createNewDocument() {
    const doc = pdfium_ffi_1.default.FPDF_CreateNewDocument();
    pdfium_ffi_1.checkError('FPDF_CreateNewDocument');
    return doc;
}
exports.createNewDocument = createNewDocument;
function destroyLibrary() {
    pdfium_ffi_1.default.FPDF_DestroyLibrary();
    pdfium_ffi_1.checkError('FPDF_DestroyLibrary');
}
exports.destroyLibrary = destroyLibrary;
function getPageCount(document) {
    const count = pdfium_ffi_1.default.FPDF_GetPageCount(document);
    pdfium_ffi_1.checkError('FPDF_GetPageCount');
    return count;
}
exports.getPageCount = getPageCount;
function getPageHeight(page) {
    const h = pdfium_ffi_1.default.FPDF_GetPageHeight(page);
    pdfium_ffi_1.checkError('getPageHeight');
    return h;
}
exports.getPageHeight = getPageHeight;
function getPageWidth(page) {
    const w = pdfium_ffi_1.default.FPDF_GetPageWidth(page);
    pdfium_ffi_1.checkError('FPDF_GetPageWidth');
    return w;
}
exports.getPageWidth = getPageWidth;
async function importPagesAsync(destDoc, srcDoc, pageRange, insertIndex) {
    return new Promise((resolve, reject) => {
        let pageRangeBuff = ref_1.default.allocCString(pageRange);
        try {
            pdfium_ffi_1.default.FPDF_ImportPages(destDoc, srcDoc, pageRangeBuff, insertIndex);
            pdfium_ffi_1.checkError('FPDF_ImportPages');
            resolve();
        }
        catch (error) {
            reject(error);
        }
        finally {
            pageRangeBuff = null;
        }
    });
}
exports.importPagesAsync = importPagesAsync;
function initLibrary() {
    pdfium_ffi_1.default.FPDF_InitLibrary();
    pdfium_ffi_1.checkError('FPDF_InitLibrary');
}
exports.initLibrary = initLibrary;
async function loadDocumentFromBufferAsync(pdfData, password = null) {
    return new Promise((resolve, reject) => {
        let passwordBuff = null;
        if (password) {
            passwordBuff = ref_1.default.allocCString(password);
        }
        try {
            const doc = pdfium_ffi_1.default.FPDF_LoadMemDocument(pdfData, pdfData.byteLength, passwordBuff);
            pdfium_ffi_1.checkError('FPDF_LoadMemDocument');
            resolve(doc);
        }
        catch (err) {
            reject(err);
        }
        finally {
            passwordBuff = null;
        }
    });
}
exports.loadDocumentFromBufferAsync = loadDocumentFromBufferAsync;
async function loadDocumentFromFileAsync(filePath, password = null) {
    return new Promise((resolve, reject) => {
        let filePathBuff = ref_1.default.allocCString(filePath);
        let passwordBuff = null;
        if (password) {
            passwordBuff = ref_1.default.allocCString(password);
        }
        try {
            const doc = pdfium_ffi_1.default.FPDF_LoadDocument(filePathBuff, passwordBuff);
            pdfium_ffi_1.checkError('FPDF_LoadDocument');
            resolve(doc);
        }
        catch (err) {
            reject(err);
        }
        finally {
            filePathBuff = null;
            passwordBuff = null;
        }
    });
}
exports.loadDocumentFromFileAsync = loadDocumentFromFileAsync;
function loadPage(document, pageIndex) {
    const page = pdfium_ffi_1.default.FPDF_LoadPage(document, pageIndex);
    pdfium_ffi_1.checkError('FPDF_LoadPage');
    return page;
}
exports.loadPage = loadPage;
async function renderPageBitmapAsync(bitmap, page, startX, startY, sizeX, sizeY, rotate, flags) {
    return new Promise((resolve, reject) => {
        try {
            pdfium_ffi_1.default.FPDF_RenderPageBitmap(bitmap, page, startX, startY, sizeX, sizeY, rotate, flags);
            pdfium_ffi_1.checkError('FPDF_RenderPageBitmap');
            resolve();
        }
        catch (error) {
            reject(error);
        }
    });
}
exports.renderPageBitmapAsync = renderPageBitmapAsync;
async function saveAsCopyAsync(document, flags = 0) {
    return await saveWithVersionAsync(document, flags);
}
exports.saveAsCopyAsync = saveAsCopyAsync;
async function saveWithVersionAsync(document, flags = 0, version = 15) {
    return new Promise((resolve, reject) => {
        let savedDocBufferArr = [];
        let wb = pdfium_ffi_1.writeBlock(savedDocBufferArr);
        let pdfFileWrite = new pdfium_ffi_1.FPDF_FILEWRITE({
            version: 1,
            WriteBlock: wb
        });
        try {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            pdfium_ffi_1.default.FPDF_SaveWithVersion(document, pdfFileWrite.ref(), flags, version);
            pdfium_ffi_1.checkError('FPDF_SaveWithVersion');
            resolve(Buffer.concat(savedDocBufferArr));
        }
        catch (error) {
            reject(error);
        }
        finally {
            pdfFileWrite = null;
            wb = null;
            savedDocBufferArr = null;
        }
    });
}
exports.saveWithVersionAsync = saveWithVersionAsync;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmaXVtLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BkZml1bS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSw4Q0FBc0I7QUFDdEIsMkRBQWlGO0FBR2pGLGlEQUFpRDtBQUNwQyxRQUFBLGdCQUFnQixHQUFHLENBQUMsQ0FBQztBQUNyQixRQUFBLG1CQUFtQixHQUFHLENBQUMsQ0FBQztBQUN4QixRQUFBLG9CQUFvQixHQUFHLENBQUMsQ0FBQztBQUd0QyxxQ0FBcUM7QUFDeEIsUUFBQSxVQUFVLEdBQUcsSUFBSSxDQUFDO0FBQ2xCLFFBQUEsYUFBYSxHQUFHLElBQUksQ0FBQztBQUNyQixRQUFBLGtCQUFrQixHQUFHLElBQUksQ0FBQztBQUMxQixRQUFBLGNBQWMsR0FBRyxJQUFJLENBQUM7QUFDdEIsUUFBQSx1QkFBdUIsR0FBRyxJQUFJLENBQUM7QUFDL0IsUUFBQSxlQUFlLEdBQUcsSUFBSSxDQUFDO0FBQ3ZCLFFBQUEsYUFBYSxHQUFHLEtBQUssQ0FBQztBQUduQyxTQUFnQixhQUFhLENBQUMsUUFBcUI7SUFFakQsb0JBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2Qyx1QkFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUpELHNDQUlDO0FBR0QsU0FBZ0IsU0FBUyxDQUFDLElBQWE7SUFFckMsb0JBQVMsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDL0IsdUJBQVUsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQy9CLENBQUM7QUFKRCw4QkFJQztBQUdELFNBQWdCLGlCQUFpQjtJQUUvQixNQUFNLEdBQUcsR0FBZ0Isb0JBQVMsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQzVELHVCQUFVLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUVyQyxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUM7QUFORCw4Q0FNQztBQUdELFNBQWdCLGNBQWM7SUFF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