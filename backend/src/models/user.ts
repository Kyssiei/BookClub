import mongoose, { Document, Schema, Model} from "mongoose";

//interface for typscript
export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    profilePic?: string;
    bio?: string;
    bookshelves: {
        currentlyReading: mongoose.Types.ObjectId[];
        wantToRead: mongoose.Types.ObjectId[];
        finished: mongoose.Types.ObjectId[];
    };
    createdAt: Date;
    updatedAt: Date;
    isAdmin?: boolean;
}



// mongoose schema for user
const UserSchema = new Schema<IUser>(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        profilePic: {type: String, default: ""},
        bio: {type: String, default: ""},
        bookshelves: {
            currentlyReading: [{type: mongoose.Schema.Types.ObjectId, ref: "Book"}],
            wantToRead: [{type: mongoose.Schema.Types.ObjectId, ref: "Book"}],
            finished: [{type: mongoose.Schema.Types.ObjectId, ref: "Book"}]
        },
        isAdmin: { type: Boolean, default: false}, 
    },
    {timestamps: true}, // Automatically manages "createdAt" and "updatedAt"
);

// Create and export model
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);
export default User;