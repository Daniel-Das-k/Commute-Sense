import express, { Request, Response } from 'express'

import { NotFoundError } from '../../errors/not-found-error'
import { Bus } from '../../models/Bus'

const router = express.Router()

router.get('/api/bus/:id', async (req: Request, res: Response) => {
    const { id } = req.params
    let bus;    

    bus = await Bus.findById(id).populate('driver').populate('tracker')
    if (!bus) {
        throw new NotFoundError()
    }

    res.status(200).send(bus)
})

export { router as GetBusRoute }