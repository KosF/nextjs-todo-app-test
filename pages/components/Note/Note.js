import React from "react";

const Note = props => (
  <div className="note" onClick={props.deleteMethod}>
    {props.text}
  </div>
);

export default Note;
