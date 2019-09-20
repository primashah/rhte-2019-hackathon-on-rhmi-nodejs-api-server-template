import * as express from 'express'

const junctionsRoute = express.Router()

junctionsRoute.get('/', async (req, res) => {
  res.status(501).end('not implemented')
})

export default junctionsRoute
