import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Message from "./Message";

const App = () => {
  const [message, setMessage] = useState([]);
  const [userMessageSent, setUserMessageSent] = useState(false);
  const chatAreaBottom = useRef(null);
  const inputText = useRef(null);

  let says;

  useEffect(() => {
    chatAreaBottom.current.scrollIntoView({ behavior: "smooth" });
    inputText.current.focus();
  }, [message]);

  const userMessage = async (userInput) => {
    inputText.current.value = ''
    says = {
      speaks: "me",
      msg: userInput,
    };

    setMessage([...message, says]);
    setUserMessageSent(true);

    // var chatArray = [says];

    // // const response = await axios.post(
    // //   "http://localhost:4000/api/df_text_query",
    // //   { text: says.msg }
    // // );

    // says = {
    //   speaks: "bot",
    //   // msg: response.data,
    //   msg: "hello buddy",
    // };
    // chatArray.push(says);
    // setMessage([...message, ...chatArray]);
  };

  const botMessage = async (userInput) => {
    // const response = await axios.post("http://localhost:4000/api/df_text_query", {text:says.msg})
    // setUserMessageSent(false);
    says = {
      speaks: "bot",
      msg: "hi buddy",
    };
    setMessage([...message, says]);
    setUserMessageSent(false);
  };

  return (
    <div className="row">
      {userMessageSent
        ? setTimeout(() => {
            botMessage("inputText.current.value");
          }, 2000)
        : null}
      <div
        className="chatbot-boundary col s3 right"
        style={{
          boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          position: "fixed",
          height: "70%",
          width: "25%",
          right: "0",
          bottom: "0",
          overflowY: "auto",
        }}
      >
        <div
          className="chatbot-header"
          style={{
            position: "fixed",
            height: "7%",
            width: "25%",
            right: "0",
            backgroundColor: "pink",
            zIndex: "99",
            paddingLeft: "1%",
            paddingTop: "0.7%",
          }}
        >
          Chatty
        </div>
        <div
          className="chatbot-messages"
          style={{
            // backgroundColor: "red",
            position: "relative",
            marginTop: "14%",
            marginBottom: "14%",
            paddingBottom: "3%",
            zIndex: "9",
          }}
        >
          {/* {<Message message={message} />} */}
          {userMessageSent ? (
            <>
            <Message message={message}/>
            <div>chatty is typing...</div>
            </>
          ) : (
            <Message message={message} />
          )}
          <div className="chatAreaBottom" ref={chatAreaBottom}></div>
          {/**this empty div is very important for scrollIntoView in the useEffect hook. To scroll this div into view the chatbot */}
        </div>
        <div
          className="text-input"
          style={{
            position: "fixed",
            width: "25%",
            right: "0",
            bottom: "0",
            zIndex: "99",
            height: "7%",
            backgroundColor: "pink",
            paddingLeft: "1%",
            paddingRight: "1%",
          }}
        >
          <input
            ref={inputText}
            type="text"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                return userMessage(e.target.value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
