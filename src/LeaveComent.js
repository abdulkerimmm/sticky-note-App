import React, { useContext } from "react";
import MainContext from "./MainContext";

const LeaveComent = () => {
  const { position } = useContext(MainContext);
  return (
    <div
      style={{
        position: "fixed",
        top: position.y[1],
        left: position.x[1] + 30,
      }}
      className="comment-text"
    >
      click to comment
    </div>
  );
};

export default LeaveComent;
