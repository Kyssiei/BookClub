import mongoose, {Document, Schema, Model} from "mongoose"

// define typescript interface
export interface IBooks extends Document {
    title: string;
    author: string;
    description?: string;
    coverImage?: string;
    genre?: string;
    pageCount: number;
    publishedYear?: number
    ratings?: number[];
    addedBy?: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}

//create mongoose schema for the book 
const BookSchema = new Schema<IBooks> ({
    title: { type: String, required: true },
    author: { type: String, required: true },
    description: { type: String, default: "" },
    coverImage: { type: String, default: "" }, // URL for the book cover
    genre: { type: String, default: "Unknown" },
    pageCount: { type: Number, required: true },
    publishedYear: { type: Number, default: new Date().getFullYear() },
    ratings: { type: [Number], default: [] }, // Array of user ratings
    addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // Reference to User
    },
    { timestamps: true } // Auto-manage createdAt & updatedAt

);

//create and export model 
const Book: Model<IBooks> = mongoose.model<IBooks>("Book",BookSchema);
export default Book;