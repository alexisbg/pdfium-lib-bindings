"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const download_1 = __importDefault(require("download"));
const path_1 = __importDefault(require("path"));
const chromiumVersion = 3702;
const dlParentURL = `https://github.com/bblanchon/pdfium-binaries/releases/download/chromium%2F${chromiumVersion}/`;
const filenames = [
    'pdfium-linux.tgz',
    'pdfium-darwin.tgz',
    'pdfium-windows-x64.zip',
    'pdfium-windows-x86.zip'
];
const destination = path_1.default.resolve(__dirname, '../pdfium/');
for (const fn of filenames) {
    downloadFile(fn)
        .then((filename) => {
        console.log(filename + ' has been downloaded'); // eslint-disable-line no-console
    })
        .catch((err) => {
        console.error(err); // eslint-disable-line no-console
        process.exit(1);
    });
}
async function downloadFile(filename) {
    try {
        await download_1.default(dlParentURL + filename, destination, {
            extract: true,
            filter: (file) => {
                // HACK: .zip files fail on include/ directory but these files are provided later by .tgz
                if (filename.endsWith('.zip') && file.path.match(/^include\//)) {
                    return false;
                }
                else {
                    return true;
                }
            }
        });
        return filename;
    }
    catch (err) {
        throw err;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGwtYmlucy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9kbC1iaW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsd0RBQWdDO0FBQ2hDLGdEQUF3QjtBQUd4QixNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUM7QUFDN0IsTUFBTSxXQUFXLEdBQ2YsNkVBQTZFLGVBQWUsR0FBRyxDQUFDO0FBQ2xHLE1BQU0sU0FBUyxHQUFHO0lBQ2hCLGtCQUFrQjtJQUNsQixtQkFBbUI7SUFDbkIsd0JBQXdCO0lBQ3hCLHdCQUF3QjtDQUN6QixDQUFDO0FBRUYsTUFBTSxXQUFXLEdBQUcsY0FBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUM7QUFHMUQsS0FBSyxNQUFNLEVBQUUsSUFBSSxTQUFTLEVBQUU7SUFFMUIsWUFBWSxDQUFDLEVBQUUsQ0FBQztTQUNiLElBQUksQ0FBQyxDQUFDLFFBQWdCLEVBQUUsRUFBRTtRQUN6QixPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsR0FBRyxzQkFBc0IsQ0FBQyxDQUFDLENBQUMsaUNBQWlDO0lBQ25GLENBQUMsQ0FBQztTQUNELEtBQUssQ0FBQyxDQUFDLEdBQVUsRUFBRSxFQUFFO1FBQ3BCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxpQ0FBaUM7UUFDckQsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNsQixDQUFDLENBQUMsQ0FBQztDQUNOO0FBR0QsS0FBSyxVQUFVLFlBQVksQ0FBQyxRQUFnQjtJQUUxQyxJQUFJO1FBQ0YsTUFBTSxrQkFBUSxDQUFDLFdBQVcsR0FBRyxRQUFRLEVBQUUsV0FBVyxFQUFFO1lBQ2xELE9BQU8sRUFBRSxJQUFJO1lBQ2IsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ2YseUZBQXlGO2dCQUN6RixJQUFJLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLEVBQUU7b0JBQzlELE9BQU8sS0FBSyxDQUFDO2lCQUNkO3FCQUNJO29CQUNILE9BQU8sSUFBSSxDQUFDO2lCQUNiO1lBQ0gsQ0FBQztTQUNGLENBQUMsQ0FBQztRQUVILE9BQU8sUUFBUSxDQUFDO0tBQ2pCO0lBRUQsT0FBTyxHQUFHLEVBQUU7UUFDVixNQUFNLEdBQUcsQ0FBQztLQUNYO0FBQ0gsQ0FBQyJ9