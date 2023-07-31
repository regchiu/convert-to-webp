import * as path from 'path'
import { enwebp } from '../src/enwebp'
import { text } from 'stream/consumers'

describe('Test process platform', () => {
  let round = 0
  const originalPlatform = process.platform
  const originalArch = process.arch
  const platforms = [
    'darwin',
    'darwin',
    'linux',
    'linux',
    'win32',
    'win32',
    'any'
  ]

  beforeEach(() => {
    if (round === 0) {
      Object.defineProperty(process, 'arch', {
        value: 'x64'
      })
    }
    if (round === 1) {
      Object.defineProperty(process, 'arch', {
        value: 'arm64'
      })
    }
    if (round === 2) {
      Object.defineProperty(process, 'arch', {
        value: 'x64'
      })
    }
    if (round === 3) {
      Object.defineProperty(process, 'arch', {
        value: 'arm64'
      })
    }
    if (round === 4) {
      Object.defineProperty(process, 'arch', {
        value: 'x64'
      })
    }
    if (round === 5) {
      Object.defineProperty(process, 'arch', {
        value: 'x32'
      })
    }
    Object.defineProperty(process, 'platform', {
      value: platforms[round]
    })
    round++
  })

  test('macOS (x86_64)', () => {
    expect(enwebp()).toBe(
      path.join(__dirname, '../bin/libwebp-1.3.1-mac-x86-64/bin/cwebp')
    )
  })

  test('macOS (arm64)', () => {
    expect(enwebp()).toBe(
      path.join(__dirname, '../bin/libwebp-1.3.1-mac-arm64/bin/cwebp')
    )
  })

  test('GNU/Linux-x86_64', () => {
    expect(enwebp()).toBe(
      path.join(__dirname, '../bin/libwebp-1.3.1-linux-x86-64/bin/cwebp')
    )
  })

  test('GGNU/Linux-AArch64', () => {
    expect(enwebp()).toBe(
      path.join(__dirname, '../bin/libwebp-1.3.1-linux-aarch64/bin/cwebp')
    )
  })

  test('Windows-x64', () => {
    expect(enwebp()).toBe(
      path.join(__dirname, '../bin/libwebp-1.3.1-windows-x64/bin/cwebp.exe')
    )
  })

  test('Windows-x86', () => {
    expect(() => {
      enwebp()
    }).toThrowError(
      new Error(`Unsupported platform: ${process.platform} ${process.arch}`)
    )
  })

  test('Any', () => {
    expect(() => {
      enwebp()
    }).toThrowError(
      new Error(`Unsupported platform: ${process.platform} ${process.arch}`)
    )
  })

  afterAll(() => {
    Object.defineProperty(process, 'platform', {
      value: originalPlatform
    })
    Object.defineProperty(process, 'arch', {
      value: originalArch
    })
  })
})
