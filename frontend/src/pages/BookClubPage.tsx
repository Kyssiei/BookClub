import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "../styles/BookClubPage.css";
import { fetchEvents } from "../services/eventService";
import NavBar from "../components/NavBar";

interface Event {
  _id: string;
  title: string;
  date: string;
  isVirtual: boolean;
  location?: string;
}

interface Comment {
  id: string;
  text: string;
  author: string;
}

interface Book {
  id: string;
  title: string;
  votes: number;
}

const BookClub = () => {
  // Calendar & Events State
  const [date, setDate] = useState<Date | null>(new Date());
  const [events, setEvents] = useState<Event[]>([]);

  // Discussion Board State
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // Book Voting State
  const [books, setBooks] = useState<Book[]>([
    { id: "1", title: "Atomic Habits", votes: 5 },
    { id: "2", title: "The Alchemist", votes: 3 },
    { id: "3", title: "The Body Keeps Score", votes: 4 },
  ]);

  // ✅ Fetch events from MongoDB
  useEffect(() => {
    fetchEvents().then((data) => setEvents(data));
  }, []); // Added dependency array to prevent infinite calls

  // ✅ Handles Calendar date selection
  const handleDateChange = (value: Date | Date[] | null) => {
    if (Array.isArray(value)) {
      setDate(value[0] || null);
    } else {
      setDate(value);
    }
  };

  // ✅ Filter events for selected date
  const filteredEvents = events.filter((event) =>
    new Date(event.date).toISOString().split("T")[0] ===
    (date ? date.toISOString().split("T")[0] : "")
  );

  // ✅ Add New Comment
  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj: Comment = {
        id: crypto.randomUUID(),
        text: newComment,
        author: "User123", // Replace with logged-in user later
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  // ✅ Delete Comment
  const handleDeleteComment = (commentId: string) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  // ✅ Upvote Book
  const handleVote = (bookId: string) => {
    setBooks((prevBooks) =>
      prevBooks.map((book) =>
        book.id === bookId ? { ...book, votes: book.votes + 1 } : book
      )
    );
  };

  // ✅ Highlight Dates with Events
  const tileClassName = ({ date }: { date: Date }) => {
    const eventExists = events.some(
      (event) =>
        new Date(event.date).toISOString().split("T")[0] ===
        date.toISOString().split("T")[0]
    );
    return eventExists ? "highlight-event" : "";
  };

  return (
    <div className="book-club">
      <NavBar />

      {/* 📅 Calendar Section */}
      <div className="calendar-section">
        <h2>Upcoming Book Club Events</h2>
        <Calendar
          onChange={(value) => handleDateChange(value as Date | Date[] | null)}
          value={date}
          tileClassName={tileClassName}
        />
      </div>

      {/* ✅ Show Events for Selected Date */}
      {filteredEvents.length > 0 && (
        <div className="event-list">
          <h3>Events on {date?.toDateString()}</h3>
          <ul>
            {filteredEvents.map((event) => (
              <li key={event._id}>
                <strong>{event.title}</strong> -{" "}
                {event.isVirtual ? (
                  <a href={event.location} target="_blank">
                    Virtual Event
                  </a>
                ) : (
                  `Location: ${event.location}`
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 💬 Discussion Board */}
      <div className="discussion-board">
        <h2>Discussion Board</h2>
        <textarea
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={handleAddComment}>Post</button>

        <ul className="comments-list">
          {comments.map((comment) => (
            <li key={comment.id}>
              <span>{comment.author}:</span> {comment.text}
              <button onClick={() => handleDeleteComment(comment.id)}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      {/* 📖 Book Voting */}
      <div className="voting-section">
        <h2>Vote for the Next Book</h2>
        <ul>
          {books.map((book) => (
            <li key={book.id}>
              {book.title} - {book.votes} votes
              <button onClick={() => handleVote(book.id)}>👍 Vote</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookClub;
