import { useDebugValue, useEffect, useState } from 'react';

const Chat = ({ message }) => {

    const [messages, setMessages] = useState(message);
    // const dataChannels = props.dataChannels;
    // const user = props.user;
    // const [messageAll, setMessageAll] = useState([]);

    // useEffect(() => {
    //     setMessageAll(messages);
    // }, [])

    // const sendChatHandler = (e) => {
    //     e.preventDefault();
    //     const input = document.getElementById("inputbox");
    //     props?.message.push(`${user.name} : ${input.value}`);
    //     console.log(dataChannels);
    //     Object.keys(dataChannels).forEach((userId) => {
    //         console.log(dataChannels[userId]);
    //         dataChannels[userId].send(`${user.name} : ${input.value}`);
    //     })
    //     input.value = '';
    // }

    useEffect(() => {
        setMessages(message);
    }, [message])

    return (
        <div id='chat'>
            {
                messages?.map((v, i) => {
                    console.log(v);
                    return <div key={i}>{v}</div>;
                })
            }
        </div>
    );
};

export default Chat;
