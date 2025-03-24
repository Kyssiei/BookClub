import mongoose, { Document, Schema, Model } from "mongoose";

export interface IEvent extends Document {
    title: string,
    description: string,
    date: Date,
    attendees: mongoose.Types.ObjectId[],
}

const EventSchema = new Schema<IEvent>({
    title: {type: String, required: true},
    description: {type: String, required: true},
    date: {type: Date, required: true},
    attendees: [{type: mongoose.Types.ObjectId, ref: "User"}],
})

const Event: Model<IEvent> = mongoose.model<IEvent>("Event", EventSchema);
export default Event;