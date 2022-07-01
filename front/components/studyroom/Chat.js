import { useDebugValue, useEffect, useState } from 'react';

const Chat = ({ message }) => {
  const [messages, setMessages] = useState(message);

  useEffect(() => {
    setMessages(message);
  }, [message]);

  return (
    <div id="chat">
      {messages?.map((v, i) => {
        return <div key={i}>{v}</div>;
      })}
    </div>
  );
};

export default Chat;
