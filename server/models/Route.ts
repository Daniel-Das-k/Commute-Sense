import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { StopDoc } from "./Stop";
import { BusDoc } from "./Bus";

interface RouteAttrs {
    routeName:string,
    routeNumber:string,
    routeSet: string,
    stops: StopDoc[],
    stops_polyline: [],
    stops_distance_time: [],
    bus?: BusDoc[]
}
export interface RouteDoc extends mongoose.Document {
    routeName:string,
    routeNumber:string,
    routeSet: string,
    stops: StopDoc[],
    stops_polyline: [],
    stops_distance_time: [],
    bus?: BusDoc[]
}

interface RouteModel extends mongoose.Model<RouteDoc> {
    build(attrs: RouteAttrs): RouteDoc
}

export const Schema = new mongoose.Schema({
    routeName: {
        type: String,
        required: true,
    },
    routeNumber: {
        type: Number,
        required: true
    },
    routeSet: {
        type: String,
        required: true
    },
    stops: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Stop'
    }],
    stops_polyline: [{
        type: [Number],
        required: true,
    }],
    stops_distance_time: [{
        distance: Number,
        duration: Number
    }],
    bus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Bus'
    }]
}, {
    toJSON: {
        transform(doc, ret) {
            ret.id = ret._id
            delete ret._id
        },
        virtuals: true
    }
})

Schema.set("versionKey", "version");
Schema.plugin(updateIfCurrentPlugin);

Schema.statics.build = (attrs: RouteAttrs) => {
    return new Route(attrs)
}

const Route = mongoose.model<RouteDoc, RouteModel>('Route', Schema)

export { Route }