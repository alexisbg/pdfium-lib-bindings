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
function getImageMetadata(imageObject, page) {
    const metadata = new pdfium_ffi_1.FPDF_IMAGEOBJ_METADATA();
    // FPDFImageObj_GetImageMetadata does not call FPDF_GetLastError
    if (!pdfium_ffi_1.default.FPDFImageObj_GetImageMetadata(imageObject, page, metadata.ref())) {
        throw new Error('FPDFImageObj_GetImageMetadata error');
    }
    return metadata;
}
exports.getImageMetadata = getImageMetadata;
function setImage(pages, count, imageObject, bitmap) {
    pdfium_ffi_1.default.FPDFImageObj_SetBitmap(pages, count, imageObject, bitmap);
    pdfium_ffi_1.checkError('FPDFImageObj_SetBitmap');
}
exports.setImage = setImage;
function setMatrix(imageObject, a, b, c, d, e, f) {
    pdfium_ffi_1.default.FPDFImageObj_SetMatrix(imageObject, a, b, c, d, e, f);
    pdfium_ffi_1.checkError('FPDFImageObj_SetMatrix');
}
exports.setMatrix = setMatrix;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmaXVtLWltYWdlLW9iai5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wZGZpdW0taW1hZ2Utb2JqLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJEQUE2RTtBQUk3RSxTQUFnQixnQkFBZ0IsQ0FBQyxXQUEwQixFQUFFLElBQWE7SUFFeEUsTUFBTSxRQUFRLEdBQTJCLElBQUksbUNBQXNCLEVBQUUsQ0FBQztJQUV0RSxnRUFBZ0U7SUFDaEUsSUFBSSxDQUFDLG9CQUFTLENBQUMsNkJBQTZCLENBQUMsV0FBVyxFQUFFLElBQUksRUFBRSxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRTtRQUMvRSxNQUFNLElBQUksS0FBSyxDQUFDLHFDQUFxQyxDQUFDLENBQUM7S0FDeEQ7SUFFRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDO0FBVkQsNENBVUM7QUFHRCxTQUFnQixRQUFRLENBQUMsS0FBb0IsRUFBRSxLQUFhLEVBQUUsV0FBMEIsRUFBRSxNQUFpQjtJQUV6RyxvQkFBUyxDQUFDLHNCQUFzQixDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ3BFLHVCQUFVLENBQUMsd0JBQXdCLENBQUMsQ0FBQztBQUN2QyxDQUFDO0FBSkQsNEJBSUM7QUFHRCxTQUFnQixTQUFTLENBQ3ZCLFdBQTBCLEVBQzFCLENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUyxFQUNULENBQVMsRUFDVCxDQUFTLEVBQ1QsQ0FBUztJQUdULG9CQUFTLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7SUFDaEUsdUJBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO0FBQ3ZDLENBQUM7QUFaRCw4QkFZQyJ9