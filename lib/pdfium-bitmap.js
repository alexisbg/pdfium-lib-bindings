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
// FPDFBitmap_CreateEx formats
/* eslint-disable @typescript-eslint/camelcase */
exports.FPDFBitmap_Unknown = 0;
exports.FPDFBitmap_Gray = 1;
exports.FPDFBitmap_BGR = 2;
exports.FPDFBitmap_BGRx = 3;
exports.FPDFBitmap_BGRA = 4;
/* eslint-enable @typescript-eslint/camelcase */
function create(width, height, alpha) {
    const bmp = pdfium_ffi_1.default.FPDFBitmap_Create(width, height, alpha);
    pdfium_ffi_1.checkError('FPDFBitmap_Create');
    return bmp;
}
exports.create = create;
function createEx(width, height, format, firstScan, stride) {
    const bmp = pdfium_ffi_1.default.FPDFBitmap_CreateEx(width, height, format, firstScan, stride);
    pdfium_ffi_1.checkError('FPDFBitmap_CreateEx');
    return bmp;
}
exports.createEx = createEx;
function destroy(bitmap) {
    pdfium_ffi_1.default.FPDFBitmap_Destroy(bitmap);
    pdfium_ffi_1.checkError('FPDFBitmap_Destroy');
}
exports.destroy = destroy;
function getBuffer(bitmap) {
    const buff = pdfium_ffi_1.default.FPDFBitmap_GetBuffer(bitmap);
    pdfium_ffi_1.checkError('FPDFBitmap_GetBuffer');
    return buff;
}
exports.getBuffer = getBuffer;
function getStride(bitmap) {
    const stride = pdfium_ffi_1.default.FPDFBitmap_GetStride(bitmap);
    pdfium_ffi_1.checkError('FPDFBitmap_GetStride');
    return stride;
}
exports.getStride = getStride;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGRmaXVtLWJpdG1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9wZGZpdW0tYml0bWFwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLDJEQUFxRDtBQUlyRCw4QkFBOEI7QUFDOUIsaURBQWlEO0FBQ3BDLFFBQUEsa0JBQWtCLEdBQUcsQ0FBQyxDQUFDO0FBQ3ZCLFFBQUEsZUFBZSxHQUFHLENBQUMsQ0FBQztBQUNwQixRQUFBLGNBQWMsR0FBRyxDQUFDLENBQUM7QUFDbkIsUUFBQSxlQUFlLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLFFBQUEsZUFBZSxHQUFHLENBQUMsQ0FBQztBQUNqQyxnREFBZ0Q7QUFHaEQsU0FBZ0IsTUFBTSxDQUFDLEtBQWEsRUFBRSxNQUFjLEVBQUUsS0FBYTtJQUVqRSxNQUFNLEdBQUcsR0FBYyxvQkFBUyxDQUFDLGlCQUFpQixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDekUsdUJBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRWhDLE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQztBQU5ELHdCQU1DO0FBR0QsU0FBZ0IsUUFBUSxDQUFDLEtBQWEsRUFBRSxNQUFjLEVBQUUsTUFBYyxFQUFFLFNBQWlCLEVBQUUsTUFBYztJQUV2RyxNQUFNLEdBQUcsR0FBYyxvQkFBUyxDQUFDLG1CQUFtQixDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUMvRix1QkFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7SUFFbEMsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDO0FBTkQsNEJBTUM7QUFHRCxTQUFnQixPQUFPLENBQUMsTUFBaUI7SUFFdkMsb0JBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNyQyx1QkFBVSxDQUFDLG9CQUFvQixDQUFDLENBQUM7QUFDbkMsQ0FBQztBQUpELDBCQUlDO0FBR0QsU0FBZ0IsU0FBUyxDQUFDLE1BQWlCO0lBRXpDLE1BQU0sSUFBSSxHQUFXLG9CQUFTLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDNUQsdUJBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBRW5DLE9BQU8sSUFBSSxDQUFDO0FBQ2QsQ0FBQztBQU5ELDhCQU1DO0FBR0QsU0FBZ0IsU0FBUyxDQUFDLE1BQWlCO0lBRXpDLE1BQU0sTUFBTSxHQUFXLG9CQUFTLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDOUQsdUJBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO0lBRW5DLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUM7QUFORCw4QkFNQyJ9