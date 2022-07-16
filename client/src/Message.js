import React from "react";
import "./css/Message.css";

const Message = ({ message }) => {
  const messages = message.map(
    (
      msg,
      i /*map takes this as a number increment, we don't have to make a number increment manually*/
    ) => {
      if (msg.speaks === "me") {
        return (
          <div key={i} className="me row">
            <p className="col s3 chat-icon">
              <a className="btn-floating btn-large waves-effect waves-light blue">
                Me
              </a>
            </p>
            <p className="col s9 message-box me-box">{msg.msg}</p>
          </div>
        );
      } else {
        return (
          <div key={i} className="bot row">
            <p className="col s9 message-box bot-box">{msg.msg}</p>
            <p className="col s3 chat-icon">
              <a className="btn-floating btn-large waves-effect waves-light #90caf9 blue lighten-3">
                Chaty
              </a>
            </p>
          </div>
        );
      }
    }
  );

  return messages;
};

export default Message;
