import * as path from 'path'

export const enwebp = (): string => {
    // Mac OS X
    if (process.platform === 'darwin') {
        return path.join(__dirname, "../bin/libwebp-1.1.0-mac-10.15/bin/cwebp")
    }
    // Linux
    if (process.platform === 'linux') {
        return path.join(__dirname, "../bin/libwebp-1.1.0-linux-x86-64/bin/cwebp")
    }
    // Windows
    if (process.platform === 'win32') {
        // x64 only
        if (process.arch === 'x64') {
            return path.join(__dirname, '../bin/libwebp-1.1.0-windows-x64/bin/cwebp.exe')
        }
        throw new Error(`Unsupported platform: ${process.platform} ${process
            .arch}`)
    }
    throw new Error(`Unsupported platform: ${process.platform} ${process
        .arch}`)
}