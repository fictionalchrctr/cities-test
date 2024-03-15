import express from 'express'
import cors from 'cors'
import router from './routes'

const app = express()

const PORT: number = 8088

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use('/api', router)

async function start(): Promise<void> {
  try {
    app.listen(PORT, () =>
      console.log(`Server has been started on port ${PORT}`)
    )
  } catch (error) {
    if (error instanceof Error) {
      console.log(error.message)
      process.exit(1)
    } else {
      console.log('Unexpected error', error)
    }
  }
}

start()
