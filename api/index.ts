import express from 'express'
import multer from 'multer'
import fs from 'fs'
import path from 'path'
import JSZip from 'jszip'
import { grantPermission, cwebp } from '../src/index'
const app = express()
const port = 8000

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../images'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + Math.round(Math.random() * 1e9)
    cb(null, `${uniqueSuffix}.${file.mimetype.split('/')[1]}`)
  }
})

const upload = multer({ storage })

let filenameList: string[] = []

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../www/index.html'))
})

app.post('/upload', upload.any(), (req, res) => {
  const filename = (req.files as any)[0].filename
  filenameList.push(filename)
  res.status(200).json('OK')
})

app.get('/download', async (req, res) => {
  try {
    console.log(filenameList)
    if (filenameList.length > 0) {
      const zip = new JSZip()
      let webpFileList: string[] = []
      for (const file of filenameList) {
        grantPermission()
        const webpFile = `${file!.split('.')[0]}.webp`
        await cwebp(
          path.join(__dirname, `../images/${file}`),
          path.join(__dirname, `../images/${webpFile}`),
          '-q 80'
        )
        webpFileList.push(webpFile)
        const data = fs.readFileSync(
          path.join(__dirname, `../images/${webpFile}`)
        )
        zip.file(webpFile, data)
      }
      zip
        .generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        .pipe(fs.createWriteStream(path.join(__dirname, '../images/webp.zip')))
        .on('finish', () => {
          // JSZip generates a readable stream with a "end" event,
          // but is piped here in a writable stream which emits a "finish" event.
          res.download(path.join(__dirname, '../images/webp.zip'), () => {
            for (const file of filenameList) {
              fs.unlinkSync(path.join(__dirname, `../images/${file}`))
            }
            for (const file of webpFileList) {
              fs.unlinkSync(path.join(__dirname, `../images/${file}`))
            }
            fs.unlinkSync(path.join(__dirname, '../images/webp.zip'))
            filenameList = []
            webpFileList = []
          })
        })
    } else {
      res.status(200).send('There is nothing to download 😀')
    }
  } catch (error) {
    console.log(error)
    throw error
  }
})

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})

module.exports = app
