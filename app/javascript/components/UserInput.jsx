import React, { useState } from "react";
import ReactDOM from "react-dom";

function UserInput({ isDisabled, onSubmit }) {
  const [inputValue, setInputValue] = useState("");

  const handleFormSubmit = (event) => {
    event.preventDefault();
    onSubmit(inputValue);
    setInputValue(""); // Reset input field
  };

  return (
    <form
      className="flex items-center justify-center w-full bg-black border border-gray-800 rounded-lg"
      onSubmit={handleFormSubmit}
    >
      <input
        className="px-2 font-light bg-black focus:outline-none focus:ring-none grow"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button
        className="px-4 py-2 rounded-r-lg hover:bg-gray-800"
        disabled={isDisabled}
        type="submit"
      >
        ⤴
      </button>
    </form>
  );
}

export default UserInput;
