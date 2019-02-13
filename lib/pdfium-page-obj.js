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
function newImageObj(document) {
    const pageObj = pdfium_ffi_1.default.FPDFPageObj_NewImageObj(document);
    pdfium_ffi_1.checkError('FPDFPageObj_NewImageObj');
    return pageObj;
}
exports.newImageObj = newImageObj;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmaXVtLXBhZ2Utb2JqLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3BkZml1bS1wYWdlLW9iai50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSwyREFBcUQ7QUFJckQsU0FBZ0IsV0FBVyxDQUFDLFFBQXFCO0lBRS9DLE1BQU0sT0FBTyxHQUFrQixvQkFBUyxDQUFDLHVCQUF1QixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzNFLHVCQUFVLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUV0QyxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBTkQsa0NBTUMifQ==