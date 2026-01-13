const express = require("express");
const app = express();
const PORT = 3000;

const reminders = [
    { id: 1, text: "Feed the cats" },
    { id: 2, text: "Do Laundry" },
    { id: 3, text: "Finish homework" },

]

app.get("/", (req, res) => {
    res.send("<h1>Head</h1><p>body text</p>");
});

app.get("/reminders", (req, res) => {
    res.send(reminders);
});

app.get("/reminders/:id", (req, res) => {
    const urlId = Number(req.params.id);

    const reqReminder = reminders.find(reminder => reminder.id === urlId);

    console.log(reqReminder);

    res.send(reqReminder);
});

app.post("/reminders", (req, res) => {
    let body = "";
    req.on("data", chunk => {
        body += chunk.toString();
    });
    req.on("end", () => {
        const reminder = JSON.parse(body);
        reminder.id = reminders.length + 1;
        reminders.push(reminder);

        res.status(201).send(`Reminder "${reminder.text}" was added successfully!`);
    });
});

app.delete("/reminders/:id", (req, res) => {
    const urlId = Number(req.params.id);

    const reminderIndex = reminders.findIndex(
        reminder => reminder.id === urlId
    );

    if (reminderIndex !== -1) {
        reminders.splice(reminderIndex, 1);

        res.status(200).send("Reminder deleted");
    } else {
        res.status(404).send("Reminder not found");
    }
});

app.put("/reminders/:id", (req, res) => {
    const urlId = Number(req.params.id);

    const reqReminder = reminders.find(reminder => reminder.id === urlId);

    if (reqReminder !== undefined) {
        let body = "";
        req.on("data", chunk => {
            body += chunk.toString();
        });

        req.on("end", () => {
            const updateData = JSON.parse(body);

            reqReminder.text = updateData.text;

            res.send(`Reminder updated to: ${reqReminder.text}`);
        });
    } else {
        res.status(404).send("Reminder not found");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});