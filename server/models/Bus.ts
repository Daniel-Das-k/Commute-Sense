import mongoose from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { RouteDoc } from "./Route";

interface BusAttrs {
    make: string,
    model: string,
    registerNumber: string,
    tracker?: string,
    driver?: string,
    seats: number,
    status: boolean,
    ac: boolean,
    trackerId: string
    route?: RouteDoc
}
export interface BusDoc extends mongoose.Document {
    make: string,
    model: string,
    registerNumber: string,
    tracker?: string,
    driver?: string,
    seats: number,
    status: boolean,
    ac: boolean,
    trackerId: string
    route?: RouteDoc
}

interface BusModel extends mongoose.Model<BusDoc> {
    build(attrs: BusAttrs): BusDoc
}

export const Schema = new mongoose.Schema({
    make: {
        type: String,
        required: [true, 'Vehicle Make Required'],
    },
    model: {
            type: String,
            required: [true, 'Vehicle Model Required'],
    },
    registerNumber: {
        type: String,
        required: [true, 'Vehicle Registeration Number Required'],
    },
    seats: {
        type: Number,
        default: 64
    },
    ac: {
        type: Boolean,
        default: false
    },
    status: {
        type: Boolean
    },
    trackerId: {
        type: String,
        required: true,
        unique: true
    },
    tracker: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Tracker'
    },
    driver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    },
    route: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Driver'
    }
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

Schema.statics.build = (attrs: BusAttrs) => {
    return new Bus(attrs)
}

const Bus = mongoose.model<BusDoc, BusModel>('Bus', Schema)

export { Bus }