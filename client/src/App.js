import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Message from "./Message";

const App = () => {
  const [message, setMessage] = useState([]);
  const [userMessageSent, setUserMessageSent] = useState(false);
  const [isClosed, setIsClosed] = useState(true);
  const chatAreaBottom = useRef(null);
  const inputText = useRef(null);
  const userSaid = useRef("");

  let says;

  useEffect(() => {
    if (!isClosed) {
      chatAreaBottom.current.scrollIntoView({ behavior: "smooth" });
      // inputText.current.focus();
    }
  }, [message]);

  const userMessage = async (userInput) => {
    inputText.current.value = "";
    says = {
      speaks: "me",
      msg: userInput,
    };

    setMessage([...message, says]);
    setUserMessageSent(true);
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
  //We are in a functional component. So below if code block is executed automatically. No need to put it into a nested function.
  if (userMessageSent) {
    botMessage(userSaid.current);
  }

  return (
    <div className="row">
      {isClosed ? (
        <a
          className="btn-floating btn-large waves-effect waves-light blue"
          style={{ position: "fixed", right: 40, bottom: 40 }}
          onClick={() => {
            setIsClosed(false);
          }}
        >
          <i className="material-icons">chat</i>
        </a>
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
            className="chatbot-header"
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
            Chatty
            <a
              className="waves-effect waves-light btn-small right blue"
              style={{ marginRight: "2%" }}
              onClick={() => {
                setIsClosed(true);
              }}
            >
              <i className="material-icons">close</i>
            </a>
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
                <Message message={message} />
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
