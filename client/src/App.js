import React, { useState } from "react";
import axios from "axios";
import Message from "./Message";

const App = () => {
  const [message, setMessage] = useState([]);

  const df_text_query = async (text) => {
    var says = {
      speaks: "me",
      msg: text,
    };

    var chatArray = [says];

    const response = await axios.post(
      "http://localhost:4000/api/df_text_query",
      { text: says.msg }
    );

    says = {
      speaks: "bot",
      msg: response.data,
    };
    chatArray.push(says);
    setMessage([...message, ...chatArray]);
  };
  return (
    <div className="row">
      <div className="chatbot-boundary col s3 right" style={{boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px", position:'fixed', height: '70%', width:'25%', overflow:'auto'}}>
        <div className="chatbot-messages">{<Message message={message} />}</div>
        <div className="text-input">
          <input
            style={{ position: "fixed", top: "100px", backgroundColor: "pink" }}
            type="text"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                return df_text_query(e.target.value);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
