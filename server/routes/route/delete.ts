import express, { Request, Response } from 'express'
import { NotFoundError } from '../../errors/not-found-error'
import { requireAuth } from '../../middleware/require-auth'
import { Bus } from '../../models/Bus'
import { Stop } from '../../models/Stop'
import { io } from '../../app'
import { Route } from '../../models/Route'

const router = express.Router()

router.delete('/api/route/:id', requireAuth, async (req: Request, res: Response) => {
    const { id } = req.params

    const route = await Route.findById(id)

    if (!route) throw new NotFoundError()

    await route?.stops.map(async (stopId) => {
        await Stop.findByIdAndUpdate(stopId, { $pull: { routeId: id } })
    })

    io.emit('routeDeleted', id)

    res.status(200).send("successfully deleted")
})

export { router as DeleteRoute }