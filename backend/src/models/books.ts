import mongoose, {Document, Schema, Model} from "mongoose"

// define typescript interface
export interface IBooks extends Document {
    title: string;
    author: string;
    pageCount: number;
}

//create mongoose schema for the book 
const BookSchema = new Schema<IBooks> ({
    title: {type: String, required: true},
    author: {type: String, required: true},
    pageCount: {type: Number, required: true},
});

//create and export model 
const Book: Model<IBooks> = mongoose.model<IBooks>("Book",BookSchema);
export default Book;