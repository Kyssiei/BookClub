import React, { useState } from "react";
import { Discussion, Book } from "../services/adminServices";
import mongoose from "mongoose";

interface DiscussionProps {
    books: Book[];
    discussions: Discussion[];
    createDiscussion: (discussion: Partial<Discussion>) => Promise<void>;
    updateDiscussion: (id: string, discussion: Partial<Discussion>) => Promise<Discussion>;
}

const DiscussionComponent: React.FC<DiscussionProps> = ({ books, discussions, createDiscussion, updateDiscussion }) => {
    const [discussionForm, setDiscussionForm] = useState<Partial<Discussion>>({ topic: "", bookId: "" });
    const [selectedDiscussion, setSelectedDiscussion] = useState<Discussion | null>(null);
    const [comment, setComment] = useState<string>("");

    // ✅ Create Discussion
    const handleDiscussionSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await createDiscussion(discussionForm);
        setDiscussionForm({ topic: "", bookId: "" });
    };

    // ✅ Add Comment to Discussion
    const handleCommentSubmit = async (discussionId: string) => {
        if (!comment.trim()) return;
    
        // ✅ Get stored userId
        const storedUserId = localStorage.getItem("userId");
    
        // ✅ Check if userId exists and is a valid ObjectId
        if (!storedUserId || !mongoose.Types.ObjectId.isValid(storedUserId)) {
            console.error("Invalid or missing user ID");
            return;
        }
    
        const userId = new mongoose.Types.ObjectId(storedUserId); // ✅ Convert to ObjectId
    
        await updateDiscussion(discussionId, {
            comments: [{ user: userId as unknown as mongoose.Schema.Types.ObjectId, comment, createdAt: new Date() }]
        });

        setComment("");
    };

    return (
        <div>
            <h3>Manage Discussions</h3>

            {/* Discussion Form */}
            <form onSubmit={handleDiscussionSubmit}>
                <select required value={discussionForm.bookId} 
                    onChange={(e) => setDiscussionForm({ ...discussionForm, bookId: e.target.value })}>
                    <option value="">Select Book</option>
                    {books.map(book => <option key={book._id} value={book._id}>{book.title}</option>)}
                </select>
                <input type="text" required placeholder="Discussion Topic"
                    value={discussionForm.topic} onChange={(e) => setDiscussionForm({ ...discussionForm, topic: e.target.value })} />
                <button type="submit">Create Discussion</button>
            </form>

            {/* Discussion List */}
            <ul>
                {discussions.map(discussion => (
                    <li key={discussion._id} onClick={() => setSelectedDiscussion(discussion)}>
                        {discussion.topic} (Book: {books.find(b => b._id === discussion.bookId)?.title || "Unknown"})
                    </li>
                ))}
            </ul>

            {/* Show Selected Discussion */}
            {selectedDiscussion && (
                <div>
                    <h3>{selectedDiscussion.topic}</h3>
                    <p><strong>Book:</strong> {books.find(b => b._id === selectedDiscussion.bookId)?.title || "Unknown"}</p>
                    
                    {/* Show Comments */}
                    <ul>
                        {selectedDiscussion.comments.map((c, index) => (
                            <li key={index}>
                                <strong>{typeof c.user === "object" ? c.user.toString() : "Unknown User"}:</strong> {c.comment}
                            </li>
                        ))}
                    </ul>

                    {/* Add Comment */}
                    <input type="text" value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Add a comment" />
                    <button onClick={() => handleCommentSubmit(selectedDiscussion._id)}>Comment</button>
                </div>
            )}
        </div>
    );
};

export default DiscussionComponent;
