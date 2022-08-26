import React,{ useEffect } from "react"
import './App.css';
// import io from "socket.io-client";
import { Routes, Route } from "react-router-dom";
import Join from "./component/join/Join";
import Chat from "./component/chat/Chat";
import { gapi } from 'gapi-script';
let clientId="389177768631-1o887m293ih94no0e7aavo7nc6jdqool.apps.googleusercontent.com"

function App() {

  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
            clientId: clientId,
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
  });

  return (
    <>
      <Routes>
        <Route exact path="/" element={<Join />}></Route>
        <Route exact path="/chat" element={<Chat />}></Route>
      </Routes>
    </>
  );
}
export default App;