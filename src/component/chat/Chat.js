import React, { useEffect, useState } from 'react'
import { user } from "../join/Join";
import io from "socket.io-client";
import "./Chat.css";
import sendLogo from "../images/send.png";
import Message from "../message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";
import closeIcon from "../images/closeIcon.png";


let socket;
const ENDPOINT = "http://localhost:4500/";
const Chat = () => {
  const [msg, setMsg] = useState('')
  const [id, setId] = useState('')
  const [messages, setMessages] = useState([]);

  const imageChange = (e) => {
    
  }

  const sendMessage = (e) => {
    if (msg.trim() === "") {
      return false;
    } else {

      msg && socket.emit('userText', { msg, id })
      setMsg('')
    }
  }

  useEffect(() => {
    socket = io(ENDPOINT, { transports: ["websocket"] });
    socket.on('connect', () => {
      setId(socket.id)
    })
    socket.emit("joined", { user });
    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      // console.log(`${data.user} and ${data.message}`)
    });
    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      // console.log(`${data.user} and ${data.message}`)
    });
    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      // console.log(`${data.user} and ${data.message}`)
    })
    return () => {
      // socket.on("disconnect");
      // socket.off();
    }
  }, [])

  useEffect(() => {
    socket.on("userMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id, data.image)
    })
    return () => {
      socket.on("disconnect");
      socket.off()
    }
  }, [messages])

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <h2>MUTUAL CHAT</h2>
          <a href="/"> <img src={closeIcon} alt="Close" /></a>
        </div>
        <ReactScrollToBottom className="chatBox">
          {
            messages.map((item, i) => <Message user={item.id === id ? "" : item.user} message={item.message}
              dynamicClass={item.id === id ? "right" : "left"} key={i} />
            )
          }
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            type="text"
            placeholder='Enter message here'
            autoComplete='off'
            id="chatInput"
            onChange={(e) => setMsg(e.target.value)}
            value={msg}
            onKeyDown={(event) => event.key === 'Enter' ? sendMessage() : null}
          />

          <button onClick={sendMessage} value={msg} className="sendBtn"><img src={sendLogo} alt="Send" /></button>
          <label htmlFor="image">
            <img src={sendLogo} alt="Send" width="19px" />
            <input type="file" name="image" id="image" style={{ display: "none" }} onChange={imageChange} />
          </label>
        </div>
      </div>

    </div>
  )
}

export default Chat
