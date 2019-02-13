"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const pdfium_ffi_1 = __importStar(require("./pdfium-ffi"));
function generateContent(page) {
    pdfium_ffi_1.default.FPDFPage_GenerateContent(page);
    pdfium_ffi_1.checkError('FPDFPage_GenerateContent');
}
exports.generateContent = generateContent;
function insertObject(page, pageObj) {
    pdfium_ffi_1.default.FPDFPage_InsertObject(page, pageObj);
    pdfium_ffi_1.checkError('FPDFPage_InsertObject');
}
exports.insertObject = insertObject;
function newPage(document, pageIndex, width, height) {
    const page = pdfium_ffi_1.default.FPDFPage_New(document, pageIndex, width, height);
    pdfium_ffi_1.checkError('FPDFPage_New');
    return page;
}
exports.newPage = newPage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmaXVtLXBhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvcGRmaXVtLXBhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsMkRBQXFEO0FBSXJELFNBQWdCLGVBQWUsQ0FBQyxJQUFhO0lBRTNDLG9CQUFTLENBQUMsd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekMsdUJBQVUsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO0FBQ3pDLENBQUM7QUFKRCwwQ0FJQztBQUdELFNBQWdCLFlBQVksQ0FBQyxJQUFhLEVBQUUsT0FBc0I7SUFFaEUsb0JBQVMsQ0FBQyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDL0MsdUJBQVUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ3RDLENBQUM7QUFKRCxvQ0FJQztBQUdELFNBQWdCLE9BQU8sQ0FBQyxRQUFxQixFQUFFLFNBQWlCLEVBQUUsS0FBYSxFQUFFLE1BQWM7SUFFN0YsTUFBTSxJQUFJLEdBQVksb0JBQVMsQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDakYsdUJBQVUsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUUzQixPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFORCwwQkFNQyJ9