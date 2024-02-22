import { useEffect, useRef, useState } from "react";
import "./App.css";
import MainContext from "./MainContext";
import LeaveComent from "./LeaveComent";
import Notes from "./Notes";
import Comment from "./Comment";

function App() {
  const screen = useRef();
  const [mode, setMode] = useState(false);

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });
  const [boxPosition, setBoxPosition] = useState({
    x: 0,
    y: 0,
  });
  const [visibleBox, setVisibleBox] = useState(false);

  const [notes, setNotes] = useState(
    JSON.parse(localStorage.getItem("notes")) || []
  );

  const handleKeys = (e) => {
    if (e.key === "c") {
      setMode(!mode);
    }
  };

  const handleMouse = (e) => {
    setPosition({
      x: [e.pageX, e.clientX],
      y: [e.pageY, e.clientY],
    });
  };

  const handleBox = () => {
    if (mode) {
      setBoxPosition({
        x: position.x[0],
        y: position.y[0],
      });

      setVisibleBox(true);
    }
  };
  useEffect(() => {
    screen.current.focus();
  }, [mode, visibleBox]);

  const data = {
    position,
    boxPosition,
    setMode,
    setNotes,
    notes,
    setVisibleBox,
  };
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);
  return (
    <MainContext.Provider value={data}>
      <div
        ref={screen}
        className={`screen ${mode && "editable"} `}
        tabIndex={0}
        onKeyDown={handleKeys}
        onMouseMove={handleMouse}
        onClick={handleBox}
      >
        {mode ? (
          <p
            style={{
              backgroundColor: "green",
              width: "130px",
              height: "25px",
            }}
          >
            commnet is open
          </p>
        ) : (
          <p
            style={{
              backgroundColor: "black",
              width: "130px",
              height: "25px",
              color: "white",
            }}
          >
            comment is close
          </p>
        )}
        {mode && <LeaveComent />}
        {notes && notes.map((item) => <Notes item={item} />)}
      </div>
      {visibleBox && <Comment />}
    </MainContext.Provider>
  );
}

export default App;
