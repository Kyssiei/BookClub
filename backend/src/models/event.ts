import mongoose, { Document, Schema, Model } from "mongoose";

export interface IEvent extends Document {
    title: string,
    description: string,
    date: Date,
    isVirtual: boolean,
    virtualLink?: string,
    location?: string,
    createdBy: mongoose.Types.ObjectId,
    attendees: mongoose.Types.ObjectId[],

}

const EventSchema = new Schema<IEvent>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    isVirtual: {type: Boolean, required: true },
    virtualLink: {type: String, default: null },
    location: {type: String, default: null },
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    attendees: [{type: mongoose.Types.ObjectId, ref: "User"}],
    },
    { timestamps: true }
)

const Event: Model<IEvent> = mongoose.model<IEvent>("Event", EventSchema);
export default Event;