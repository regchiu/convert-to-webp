import path from 'path'

export const enwebp = (): string => {
  // Mac OS X
  if (process.platform === 'darwin') {
    if (process.arch === 'x64') {
      return path.join(__dirname, '../bin/libwebp-1.3.1-mac-x86-64/bin/cwebp')
    }

    if (process.arch === 'arm64') {
      return path.join(__dirname, '../bin/libwebp-1.3.1-mac-arm64/bin/cwebp')
    }
  }
  // Linux
  if (process.platform === 'linux') {
    if (process.arch === 'x64') {
      return path.join(__dirname, '../bin/libwebp-1.3.1-linux-x86-64/bin/cwebp')
    }

    if (process.arch === 'arm64') {
      return path.join(
        __dirname,
        '../bin/libwebp-1.3.1-linux-aarch64/bin/cwebp'
      )
    }
  }
  // Windows
  if (process.platform === 'win32') {
    // x64 only
    if (process.arch === 'x64') {
      return path.join(
        __dirname,
        '../bin/libwebp-1.3.1-windows-x64/bin/cwebp.exe'
      )
    }
    throw new Error(`Unsupported platform: ${process.platform} ${process.arch}`)
  }
  throw new Error(`Unsupported platform: ${process.platform} ${process.arch}`)
}
