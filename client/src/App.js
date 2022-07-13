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
    <div>
      <button
        onClick={() => {
          return df_text_query("hi");
        }}
      >
        click me
      </button>
      <input
        type="text"
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            return df_text_query(e.target.value);
          }
        }}
      />
      {<Message message={message} />}
    </div>
  );
};

export default App;
