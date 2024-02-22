import React, { useContext, useState } from "react";
import MainContext from "./MainContext";
import Draggable from "react-draggable";

const Notes = ({ item }) => {
  const [not, setNot] = useState(false);
  const { setMode, notes, setNotes } = useContext(MainContext);
  const [draggable, setDraggable] = useState(false);

  const dragHndler = () => {
    if (!draggable) {
      setNot(!not);
    }
  };

  const setNotePosition = (e, data) => {
    const newNotes = notes.map((n) => {
      if (n.number === item.number) {
        n.position = {
          x: data.x,
          y: data.y - 40,
        };
      }
      return n;
    });
    setNotes(newNotes);
  };

  return (
    <Draggable
      onDrag={() => setDraggable(true)}
      onStart={() => setDraggable(false)}
      onStop={setNotePosition}
      defaultPosition={{ x: item.position.x, y: item.position.y + 40 }}
      position={{ x: item.position.x, y: item.position.y + 40 }}
    >
      <div
        style={{
          position: "absolute",
          backgroundColor: item.color,
          left: 0,
          top: 0,
        }}
        className="note-container"
        onMouseEnter={() => setMode(false)}
        onMouseLeave={() => setMode(true)}
      >
        <span
          onClick={dragHndler}
          style={{ backgroundColor: item.color }}
          className="comment-num"
        >
          {item.number}
        </span>
        {not && (
          <p
            style={{ backgroundColor: item.color, maxWidth: "300px" }}
            className="notes"
          >
            {item.note}
          </p>
        )}
      </div>
    </Draggable>
  );
};

export default Notes;
