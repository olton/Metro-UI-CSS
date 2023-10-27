import fs from "fs";
import * as path from "path";

const readFiles = (dirname, onFile, onError = () => {}) => {
    fs.readdir(dirname, function(err, filenames) {
        if (err) {
            onError(err);
            return;
        }
        filenames.forEach(function(filename) {
            fs.readFile(dirname + filename, 'utf-8', function(err, content) {
                if (err) {
                    onError(err);
                    return;
                }
                onFile(filename, content);
            });
        });
    });
}

const sourceDir = './tests/'
const targetDir = './cypress/e2e/'
const test = `
describe('Test $file', () => {
  it('passes', () => {
    cy.visit('tests/$file')
  })
})
`

fs.readdir(targetDir, (err, files) => {
    if (err) throw err;

    for (const file of files) {
        fs.unlink(path.join(targetDir, file), (err) => {
            if (err) throw err;
        });
    }
});

readFiles(sourceDir, (filename, content) => {
    const [name, _] = filename.split(".")
    fs.writeFile(`${targetDir}/${name}.cy.js`, `${test.replaceAll('$file', filename)}`, function (error) {
        if (error) {
            throw error;
        } else {
            console.log(`File ${filename} created`);
        }
    });
}, (e) => {
    console.log(e)
})

