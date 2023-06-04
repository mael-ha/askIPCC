import React, { useState } from 'react';
import ReactDOM from 'react-dom';

function UserInput({onSubmit}) {
    const [inputValue, setInputValue] = useState('');

    const handleFormSubmit = (event) => {
        event.preventDefault();
        onSubmit(inputValue);
        setInputValue(""); // Reset input field
      };

    return (
        <form onSubmit={handleFormSubmit}>
            <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} />
            <button type="submit">Ask</button>
        </form>
    );
}
  
export default UserInput;