import React from "react";

export const Button = (props) => {
  const { color, hoverColor, clickEvent, text } = props;
  return (
    <button
      className={`text-white font-bold py-2 px-4 mr-2 rounded-full ${color} hover:${hoverColor}`}
      onClick={() => clickEvent()}
    >
      {text}
    </button>
  );
};
