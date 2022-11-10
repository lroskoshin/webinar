import React from 'react';
import cx from 'classnames';
import './App.css';
import { fetchAllMessages } from './fetch';

export function App() {
  const [messages, setMessages] = React.useState(fetchAllMessages());
  const state = React.useState('');
  const text = state[0];
  const setText = state[1];


  const send = () => {
    messages.push({
      text,
      userId: 'Max',
      timestamp: Date.now(),
      id: messages.length + 1,
    });
    setMessages([...messages]);
    setText('');
  };

  const onInput = (event: React.FormEvent<HTMLTextAreaElement>) => {
    setText(event.currentTarget.value);
  }

  return (
    <div className="App">
      <div className="chat">
        {messages.map((message) => <Message key={message.id} message={message}></Message>)}
      </div>
      <textarea onInput={onInput} value={text}></textarea>
      <button onClick={send}>Send</button>
    </div>
  );
}

function Message(props: any) {
  const message = props.message;
  const date = new Date(message.timestamp);
  const isMine = message.userId === 'Max';
  const className = cx(['message', { 'self': isMine }]);
  return (
    <div className={className}>
      <p>{message.userId}</p>
      <p>{message.text}</p>
      <span>{date.toDateString()}</span>
    </div>
  )
}