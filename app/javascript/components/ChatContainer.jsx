import React, { useState } from 'react';
import UserInput from './UserInput';
import MessagesContainer from './MessagesContainer';


const ChatContainer = () => {
    const system_question = { type: 'question', content: 'What is your question?' };
    const [question, setQuestion] = useState(null);
    const [answer, setAnswer] = useState(null);
    const messages = [system_question, question, answer].filter((message) => message !== null);
    const submitQuestion = async (content) => {
        console.log(content);
        setQuestion({ type: 'question', content: content });
        const response = await fetch('/questions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ question: {content: content} }) // Assuming 1 as the book id
        });

        const data = await response.json();
        setAnswer({ type: data.type, content: data.content });
    };

    return (
        <div>
            <MessagesContainer messages={messages} />
            <UserInput onSubmit={submitQuestion} />
        </div>
    );
};

export default ChatContainer;