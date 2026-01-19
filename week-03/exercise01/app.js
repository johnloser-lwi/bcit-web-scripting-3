const express = require("express");
const bodyParser = require("body-parser");
const remindersRouter = require("./routes/reminders");
const usersRouter = require("./routes/users");

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use("/reminders", remindersRouter);
app.use("/users", usersRouter);

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});