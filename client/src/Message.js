import React from "react";
import "./css/Message.css";

const Message = ({ message }) => {
  const messages = message.map(
    (
      msg,
      i /*map takes this as button number increment, we don't have to make button number increment manually*/
    ) => {
      if (msg.speaks === "bot") {
        return (
          <div key={i} className="bot row">
            <p className="col s3 chat-icon">
              <button
                href="#"
                className="btn-floating btn-large waves-effect waves-light #90caf9 blue lighten-3"
              >
                Chaty
              </button>
            </p>
            <p className="col s8 message-box bot-box">{msg.msg}</p>
            <p className='col s1'></p>
          </div>
        );
      } else {
        return (
          <div key={i} className="me row">
            <p className='col s1'></p>
            <p className="col s8 message-box me-box">{msg.msg}</p>
            <p className="col s3 chat-icon">
              <button
                href="#"
                className="btn-floating btn-large waves-effect waves-light blue"
              >
                Me
              </button>
            </p>
          </div>
        );
      }
    }
  );

  return messages;
};

export default Message;
