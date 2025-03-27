import mongoose, {Document, Schema, Model} from "mongoose";
// import User from "./user";

interface IComment {
    user: mongoose.Types.ObjectId,
    comment: string,
    createdAt: Date,
}

export interface IDiscussion extends Document {
    topic: string,
    content: string,
    createdBy: mongoose.Types.ObjectId,
    bookId: mongoose.Types.ObjectId,
    comments: IComment[],
    createdAt: Date,
}

const CommentSchema = new Schema<IComment>({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }, 
});


const DiscussionSchema = new Schema<IDiscussion>({
    topic: {type: String, required: true},
    content: {type: String, required: true},
    createdBy: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bookId: {type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
    comments: [CommentSchema],
    createdAt: {type: Date, default: Date.now},
});

const Discussion: Model<IDiscussion> = mongoose.model<IDiscussion>("Discussion", DiscussionSchema );
export default Discussion;