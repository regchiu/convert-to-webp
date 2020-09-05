import * as path from 'path'
import { enwebp } from '../src/enwebp'

describe('Test process platform', () => {
    let round = 0
    const originalPlatform = process.platform
    const originalArch = process.arch
    const platforms = ['darwin', 'linux', 'win32', 'win32', 'any']

    beforeEach(() => {
        if (round === 2) {
            Object.defineProperty(process, 'arch', {
                value: 'x64'
            })
        }
        if (round === 3) {
            Object.defineProperty(process, 'arch', {
                value: 'x32'
            })
        }
        Object.defineProperty(process, 'platform', {
            value: platforms[round]
        })
        round++;
    })

    test('Mac OS X', () => {
        expect(enwebp()).toBe(path.join(__dirname, "../bin/libwebp-1.1.0-mac-10.15/bin/cwebp"))
    })

    test('Linux', () => {
        expect(enwebp()).toBe(path.join(__dirname, "../bin/libwebp-1.1.0-linux-x86-64/bin/cwebp"))
    })

    test('Windows x64', () => {
        expect(enwebp()).toBe(path.join(__dirname, '../bin/libwebp-1.1.0-windows-x64/bin/cwebp.exe'))
    })

    test('Windows x86', () => {
        expect(() => { enwebp() }).toThrowError(new Error(`Unsupported platform: ${process.platform} ${process
            .arch}`))
    })

    test('Any', () => {
        expect(() => { enwebp() }).toThrowError(new Error(`Unsupported platform: ${process.platform} ${process
            .arch}`))
    })

    afterAll(() => {
        Object.defineProperty(process, 'platform', {
            value: originalPlatform
        });
        Object.defineProperty(process, 'arch', {
            value: originalArch
        });
    });
})