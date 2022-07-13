import React from "react";

const Message = ({ message }) => {
  const messages = message.map((msg, i/*map takes this as a number increment, we don't have to make a number increment manually*/) => {
    if (msg.speaks === "bot") {
      return (
        <div key={i} className="bot">
          <h4>bot</h4>
          {msg.msg}
        </div>
      );
    } else {
      return (
        <div key={i} className="me">
          <h4>me</h4>
          {msg.msg}
        </div>
      );
    }
  });

  return messages;
};

export default Message;
