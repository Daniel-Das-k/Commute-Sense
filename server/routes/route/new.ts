import express, { Request, Response } from 'express'

import { Route } from '../../models/Route'
import { io } from '../../app'
import { Driver } from '../../models/Driver'
import { requireAuth } from '../../middleware/require-auth'
import { ValidateRequest } from '../../middleware/validate-request'
import { body } from 'express-validator'
import { Stop } from '../../models/Stop'

const router = express.Router()

router.post('/api/route', requireAuth,
    [
        body('stops').isLength({ min: 1 }).withMessage('requires more than one stop').notEmpty().withMessage('Stops are required')
    ],
    ValidateRequest,
    async (req: Request, res: Response) => {
        let route = Route.build({
            ...req.body
        })
        
        await route.stops.map(async (stop) => {
            let doc = await Stop.findById(stop)
            doc?.routeId?.push(route._id)
            await doc?.save()
        })

        await route.save()

        io.emit('newRouteAdded', route)

        res.status(201).json(route)
    })

export { router as NewRoute } 
