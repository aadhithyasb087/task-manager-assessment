import React, { useState } from "react";
import "./TaskManagerModal.css";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import CloseIcon from "@material-ui/icons/Close";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import Avatar from "@material-ui/core/Avatar";
import Avatar1 from "../images/Avatar1.jpg";
import Avatar2 from "../images/Avatar2.jpg";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import NoteIcon from "@material-ui/icons/Note";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Checkbox from "@material-ui/core/Checkbox";
import Tooltip from "@material-ui/core/Tooltip";

const TaskManagerModal = ({ openEventHandlerFunc }) => {
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDateResult, setTaskDateResult] = useState("");

  const [taskDate, setTaskDate] = useState(new Date());
  const [taskStartTime, setTaskStartTime] = useState(new Date());
  const [taskEndTime, setTaskEndTime] = useState(
    new Date(new Date().setHours(new Date().getHours() + 1))
  );
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [assignedTo, setAssignedTo] = useState("Jane Smith");
  const [note, setNote] = useState("");
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const userData = [
    {
      name: "Jane Smith",
      image: `${Avatar1}`,
    },
    {
      name: "Aadhithya SB",
      image: `${Avatar2}`,
    },
    {
      name: "Joey",
      image: `${Avatar1}`,
    },
    {
      name: "Chandler",
      image: `${Avatar2}`,
    },
  ];
  const handleAddComment = (e) => {
    if (e === "undefined" || e.key === "Enter") {
      if (newComment.trim()) {
        setComments([...comments, newComment]);
      }
    }
  };

  const deleteHandler = () => {
    setAssignedTo("Jane Smith");
    setComments([]);
    setTaskDateResult("");
    setTaskTitle("");
    setNote("");
  };

  const formatDateTime = (date, startTime, endTime) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-IN", options);
    const formattedStartTime = startTime.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "numeric",
    });
    const formattedEndTime = endTime.toLocaleTimeString("en-IN", {
      hour: "numeric",
      minute: "numeric",
    });
    return `${formattedDate} at ${formattedStartTime} - ${formattedEndTime}`;
  };

  const completeTaskHandler = () => {
    if (taskTitle && taskDateResult && !isComplete) {
      setIsComplete(true);
    } else if (isComplete) {
      setIsComplete(false);
    } else {
      alert("Enter valid details");
    }
  };

  const submitTaskHandler = () => {
    if (taskTitle && taskDateResult) {
      setIsComplete(true);
      deleteHandler();
      openEventHandlerFunc();
      alert("Created task title: " + taskTitle + " Successfullly");
    } else {
      alert("Enter valid details");
    }
  };

  return (
    <div className="modal-cont">
      <div className="modal">
        <div className="modal-header">
          <div className="check-circle">
            <Tooltip title={isComplete ? "Completed" : "Not Completed"}>
              <Checkbox
                checked={isComplete}
                onClick={completeTaskHandler}
                tooltip="dnb"
              />
            </Tooltip>
          </div>
          <DeleteIcon className="close-icon" onClick={deleteHandler} />
          <CloseIcon onClick={openEventHandlerFunc} className="close-icon" />
        </div>
        <div className="modal-body">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            className="event-title input-style"
            placeholder="Enter the event name"
          />

          <div className="event-date-container input-style">
            <div className="date-time-picker">
              <DateRangeIcon
                onClick={() => setIsDatePickerOpen(true)}
                className="calendar-button"
              />
              {isDatePickerOpen && (
                <div className="date-time-modal">
                  <div>
                    <DatePicker
                      selected={taskDate}
                      onChange={(date) => setTaskDate(date)}
                      dateFormat="MMMM d, yyyy"
                      className="event-date-picker"
                    />
                    <DatePicker
                      selected={taskStartTime}
                      onChange={(date) => setTaskStartTime(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="Start Time"
                      dateFormat="h:mm aa"
                      className="event-time-picker"
                    />
                    <DatePicker
                      selected={taskEndTime}
                      onChange={(date) => setTaskEndTime(date)}
                      showTimeSelect
                      showTimeSelectOnly
                      timeIntervals={15}
                      timeCaption="End Time"
                      dateFormat="h:mm aa"
                      className="event-time-picker"
                    />
                  </div>
                  <button
                    onClick={() => {
                      setTaskDateResult(
                        formatDateTime(taskDate, taskStartTime, taskEndTime)
                      );
                      setIsDatePickerOpen(false);
                    }}
                    className="save-button"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
            <input
              type="text"
              value={taskDateResult}
              onChange={(e) => setTaskDateResult(e.target.value)}
              className="event-date"
              placeholder="Eg. 24 May 2024 at 5:01 pm - 6:01 pm"
            />
          </div>
          <div className="assign-to">
            <PersonOutlineIcon style={{ color: "fc5451" }} />
            <label>Assign to:</label>

            <Select
              value={assignedTo}
              onChange={(e) => {
                setAssignedTo(e.target.value);
                setComments("");
              }}
              className="assign-select"
              inputProps={{
                name: "assign",
                id: "filled-age-native-simple",
              }}
              placeholder="Select User"
            >
              {userData &&
                userData.map((user, i) => (
                  <MenuItem value={user.name} key={i}>
                    <div className="assign-option">
                      <Avatar alt="John" src={user.image} /> <p>{user.name}</p>
                    </div>
                  </MenuItem>
                ))}
            </Select>
          </div>
          <div className="note-cont">
            <NoteIcon style={{ color: "fc5451" }} />
            <p>Note:</p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="event-note"
              placeholder="Enter a note..."
            ></textarea>
          </div>
          <div className="comments-section">
            <h3>Comments</h3>
            <div className="comments-cont">
              {comments.length > 0 ? (
                comments.map((comment, index) => (
                  <div key={index} className="comment">
                    <Avatar
                      alt="John"
                      src={
                        assignedTo &&
                        assignedTo &&
                        userData.find((data) => data.name === assignedTo)?.image
                      }
                    />
                    <div className="comment-inner">
                      <h3>{assignedTo}</h3>
                      <p>{comment}</p>
                    </div>
                    <button
                      className="delete-comment-button"
                      onClick={() =>
                        setComments(comments.filter((_, i) => i !== index))
                      }
                    >
                      🗑
                    </button>
                  </div>
                ))
              ) : (
                <div className="no-comments">No comments present...</div>
              )}
            </div>
            <div className="new-comment">
              <Avatar
                alt="John"
                src={
                  assignedTo &&
                  userData.find((data) => data.name === assignedTo)?.image
                }
              />
              <input
                type="text"
                value={newComment}
                onChange={(e) => {
                  setNewComment(e.target.value);
                }}
                onKeyDown={handleAddComment}
                placeholder="Write comment..."
              />
              <button onClick={handleAddComment}>➤</button>
            </div>
          </div>
        </div>
        <div className="submit-task">
          <button onClick={submitTaskHandler}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default TaskManagerModal;
