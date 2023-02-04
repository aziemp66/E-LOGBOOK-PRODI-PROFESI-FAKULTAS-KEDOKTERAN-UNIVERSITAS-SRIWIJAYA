require("dotenv").config();
const mailer = require("./utility/node-mailer");

mailer({
  to: "aziemp66@gmail.com",
  subject: "Test",
  text: "Test",
  html: "<h1>Test</h1>",
});
