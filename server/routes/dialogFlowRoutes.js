const chatbot = require("../chatbot/chatbot");

module.exports = (app) => {
  app.get("/", (req, res) => {
    res.send("What to do?");
  });

  app.post("/api/df_text_query", async (req, res) => {
    res.send(await chatbot(req.body.text))
  });

  app.post("/api/df_event_query", (req, res) => {
    res.send({ do: "event query" });
  });
};
