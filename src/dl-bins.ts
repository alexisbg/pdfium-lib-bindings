import Download from 'download';
import Path from 'path';


const chromiumVersion = 3702;
const dlParentURL =
  `https://github.com/bblanchon/pdfium-binaries/releases/download/chromium%2F${chromiumVersion}/`;
const filenames = [
  'pdfium-linux.tgz',
  'pdfium-darwin.tgz',
  'pdfium-windows-x64.zip',
  'pdfium-windows-x86.zip'
];

const destination = Path.resolve(__dirname, '../pdfium/');


for (const fn of filenames) {

  downloadFile(fn)
    .then((filename: string) => {
      console.log(filename + ' has been downloaded'); // eslint-disable-line no-console
    })
    .catch((err: Error) => {
      console.error(err); // eslint-disable-line no-console
      process.exit(1);
    });
}


async function downloadFile(filename: string): Promise<string> {

  try {
    await Download(dlParentURL + filename, destination, {
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
