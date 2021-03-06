import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Message from "./Message";
import "./css/Message.css";

const App = () => {
  let says = {
    speaks: "bot",
    msg: "Hello there..! How can I help you?",
  };
  const [message, setMessage] = useState([says]);
  const [userMessageSent, setUserMessageSent] = useState(false);
  const [isClosed, setIsClosed] = useState(true);
  const chatAreaBottom = useRef(null);
  const inputText = useRef(null);
  const userSaid = useRef("");

  useEffect(() => {
    if (!isClosed) {
      chatAreaBottom.current.scrollIntoView({ behavior: "smooth" });
      // inputText.current.focus();
    }
  }, [message]);

  const userMessage = async (userInput) => {
    if (userInput) {
      inputText.current.value = "";
      says = {
        speaks: "me",
        msg: userInput,
      };

      setMessage([...message, says]);
      setUserMessageSent(true);
    }
  };

  const botMessage = async (userInput) => {
    const response = await axios.post(
      "http://localhost:4000/api/df_text_query",
      { text: userInput }
    );
    says = {
      speaks: "bot",
      msg: response.data,
    };
    setMessage([...message, says]);
    setUserMessageSent(false);
  };

  //We are in button functional component. So below if code block is executed automatically. No need to put it into button nested function.
  if (userMessageSent) {
    setTimeout(() => {
      botMessage(userSaid.current);
    }, 700);
  }

  return (
    <div className="row">
      {isClosed ? (
        <button
          href="#"
          className="btn-floating btn-large waves-effect waves-light blue"
          style={{ position: "fixed", right: 40, bottom: 40 }}
          onClick={() => {
            setIsClosed(false);
          }}
        >
          <i className="material-icons">chat</i>
        </button>
      ) : (
        <div
          className="chatbot-boundary col s3 right"
          style={{
            boxShadow:
              "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
            position: "fixed",
            height: "70%",
            width: "25%",
            right: "2%",
            bottom: "3%",
            overflowY: "auto",
            borderRadius: "10px",
          }}
        >
          <div
            className="chatbot-header ro"
            style={{
              position: "fixed",
              height: "7%",
              width: "25%",
              right: "2%",
              backgroundColor: "#0d47a1",
              zIndex: "99",
              paddingLeft: "1%",
              paddingTop: "0.7%",
              color: "white",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <i className="material-icons col s1">chat_bubble_outline</i>
            <>
              <span
                style={{
                  fontWeight: "bolder",
                  fontSize: "1.5em",
                  marginLeft: "10px",
                }}
              >
                Chaty
              </span>{" "}
              {userMessageSent ? <> is typing...</> : null}
            </>

            <button
              href="#"
              className="waves-effect waves-light btn-small right blue"
              style={{ marginRight: "2%" }}
              onClick={() => {
                setIsClosed(true);
              }}
            >
              <i className="material-icons">close</i>
            </button>
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
            {<Message message={message} />}
            <div className="chatAreaBottom" ref={chatAreaBottom}></div>
            {/**this empty div is very important for scrollIntoView in the useEffect hook. To scroll this div into view the chatbot */}
          </div>
          <div
            className="text-input"
            style={{
              position: "fixed",
              width: "25%",
              right: "2%",
              bottom: "3%",
              zIndex: "99",
              height: "7%",
              backgroundColor: "#0d47a1",
              paddingLeft: "1%",
              paddingRight: "1%",
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
            }}
          >
            <input
              style={{
                color: "white",
              }}
              autoFocus
              ref={inputText}
              type="text"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  userSaid.current = e.target.value;
                  return userMessage(userSaid.current);
                }
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
