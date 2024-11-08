import express, { Request, Response } from 'express'
import { Route } from '../../models/Route'

const router = express.Router()

router.get('/api/route', async (req: Request, res: Response) => {

    const routes = await Route.find({}).populate('stops')

    res.status(200).json(routes)
})

export { router as GetAllRoute }   