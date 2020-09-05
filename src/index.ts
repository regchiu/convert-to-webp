import * as childProcess from 'child_process'
import * as fs from 'fs'
import { enwebp } from './enwebp'

export const grantPermission = (): void => {
    const arr = [enwebp()]
    arr.forEach(exePath => {
        fs.chmodSync(exePath, 0o755)
    });
};

// convert image to webp
export const cwebp = (inputImage: string, outputImage: string, options: string) => {

    const query = `${options} ${inputImage} -o ${outputImage}`

    return new Promise((resolve, reject) => {
        childProcess.execFile(`${enwebp()}`, query.split(/\s+/), { shell: true }, (error, stdout, stderr) => {
            if (error) {
                reject(error)
            }
            resolve(stdout ? stdout : stderr)
        });
    })
}