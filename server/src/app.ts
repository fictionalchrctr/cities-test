import express from 'express'

const app = express()

const PORT: number = 8088

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
