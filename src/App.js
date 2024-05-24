import "./App.css";
import React, { useState } from "react";

import TaskManagerModal from "./components/TaskManagerModal";


function App() {
  const [openEvent, setOpenEvent] = useState(false);

  const openEventHandler = () => {
    setOpenEvent(!openEvent);
  };
  return (
    <div className="App">
      {!openEvent ? (
        <button onClick={openEventHandler}>Click to Add the Event</button>
      ) : (
        <TaskManagerModal openEventHandlerFunc={openEventHandler} />
      )}
    </div>
  );
}

export default App;
