import mongoose, {Document, Schema, Model} from "mongoose";

export interface IDiscussion extends Document {
    topic: string;
    content: string;
    author: mongoose.Types.ObjectId;
    createdAt: Date;
}


const DiscussionSchema = new Schema<IDiscussion>({
    topic: {type: String, required: true},
    content: {type: String, required: true},
    author: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    createdAt: {type: Date, default: Date.now},
});

const Disscussion: Model<IDiscussion> = mongoose.model<IDiscussion>("Discussion", DiscussionSchema );
export default Disscussion;