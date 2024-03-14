import { join } from 'path'
import util from 'util'
import fs from 'fs'

const readFileAsync = util.promisify(fs.readFile)
const writeFileAsync = util.promisify(fs.writeFile)

const databaseService = {
  getFileData: async (fileName: string) => {
    try {
      const filePath = join(__dirname, fileName)
      const data = await readFileAsync(filePath, 'utf-8')
      console.log('data', data)

      return JSON.parse(data)
    } catch (err) {
      throw err
    }
    // return new Promise((resolve, reject) => {
    //   fs.readFile(join(__dirname, fileName), 'utf-8', (err, data) => {
    //     if (err) {
    //       reject(err)
    //     } else {
    //       resolve(JSON.parse(data))
    //     }
    //   })
    // })
  },
  writeDataToFile: async (fileName: string, data: unknown) => {
    try {
      const filePath = join(__dirname, fileName)
      await writeFileAsync(filePath, JSON.stringify(data), 'utf-8')
      return true
    } catch (err) {
      throw err
    }
  }
}

export default databaseService
