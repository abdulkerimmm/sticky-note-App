import React, { useContext, useState } from "react";
import MainContext from "./MainContext";

const Comment = () => {
  const { boxPosition, setMode, setNotes, notes, setVisibleBox } =
    useContext(MainContext);

  const types = [
    {
      name: "comment",
      color: "red",
      text: "comment",
    },
    {
      name: "private-comment",
      color: "#999",
      text: "private-comment",
    },
    {
      name: "note",
      color: "orange",
      text: "note",
    },
  ];

  const [color, setColor] = useState(types[0].color);
  const [textNote, setTextNote] = useState("");

  const saveNotes = () => {
    setNotes([
      ...notes,
      {
        number: notes.length + 1,
        note: textNote,
        color: color,
        position: {
          x: boxPosition.x,
          y: boxPosition.y,
        },
      },
    ]);
    setVisibleBox(false);
    setMode(true);
    console.log("tmm");
  };

  const cancelHandler = () => {
    setVisibleBox(false);
    setMode(true);
  };

  return (
    <div
      style={{
        position: "absolute",
        top: boxPosition.y,
        left: boxPosition.x,
      }}
      className="comment"
      onMouseEnter={() => setMode(false)}
      onMouseLeave={() => setMode(true)}
    >
      <span style={{ backgroundColor: color }} className="comment-num">
        {notes.length + 1}
      </span>
      <select
        style={{ backgroundColor: color }}
        onChange={(e) => setColor(e.target.value)}
      >
        {types.map((item) => (
          <option value={item.color}>{item.text}</option>
        ))}
      </select>
      <textarea onChange={(e) => setTextNote(e.target.value)}></textarea>
      {console.log(textNote)}
      <div className="btns">
        <button className="btn1" disabled={!textNote} onClick={saveNotes}>
          save
        </button>
        <button className="btn2" onClick={cancelHandler}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default Comment;
