import React, { useState } from "react";
import "./EventDetailsModal.css";

const EventDetailsModal = () => {
  const [eventTitle, setEventTitle] = useState("Flower Arrangement");
  const [eventDate, setEventDate] = useState("Dec 5, 2024 at 8:00-10:00 AM");
  const [assignedTo, setAssignedTo] = useState("Jane Smith");
  const [note, setNote] = useState("09382049832\nwww.flowervendor.com");
  const [comments, setComments] = useState([
    "Thanks for assigning me on the task. We’ll get the details ironed out.",
  ]);
  const [newComment, setNewComment] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, newComment]);
      setNewComment("");
    }
  };

  const handleEditComment = (index, updatedComment) => {
    const updatedComments = comments.map((comment, i) =>
      i === index ? updatedComment : comment
    );
    setComments(updatedComments);
  };

  return (
    <div className="modal">
      <div className="modal-header">
        <input
          type="checkbox"
          checked={isComplete}
          onChange={() => setIsComplete(!isComplete)}
        />
        <input
          type="text"
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="event-title"
        />
        <button className="close-button">×</button>
      </div>
      <div className="modal-body">
        <input
          type="text"
          value={eventDate}
          onChange={(e) => setEventDate(e.target.value)}
          className="event-date"
        />
        <div className="assign-to">
          <label>Assign to:</label>
          <select
            value={assignedTo}
            onChange={(e) => setAssignedTo(e.target.value)}
          >
            <option value="Jane Smith">Jane Smith</option>
            <option value="John Doe">John Doe</option>
            {/* Add more options as needed */}
          </select>
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="event-note"
        ></textarea>
        <div className="comments-section">
          <h3>Comments</h3>
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <img
                src="path_to_image"
                alt="Jane Smith"
                className="comment-avatar"
              />
              <input
                type="text"
                value={comment}
                onChange={(e) => handleEditComment(index, e.target.value)}
                className="comment-text"
              />
              <button
                className="delete-comment-button"
                onClick={() =>
                  setComments(comments.filter((_, i) => i !== index))
                }
              >
                🗑
              </button>
            </div>
          ))}
          <div className="new-comment">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write comment..."
            />
            <button onClick={handleAddComment}>➤</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetailsModal;
