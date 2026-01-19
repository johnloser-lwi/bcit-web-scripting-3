const express = require("express");
const router = express.Router();

const reminders = [
    { id: 1, text: "Feed the cats" },
    { id: 2, text: "Do Laundry" },
    { id: 3, text: "Finish homework" },

]

const findReminderById = (req, res, next) => {
    const urlId = Number(req.params.id);

    const reqReminder = reminders.find(reminder => reminder.id === urlId);

    console.log(reqReminder);

    if (reqReminder !== undefined) {
        req.reminder = reqReminder;
        next();
    } else {
        res.status(404).send(`Reminder with id "${req.params.id}" not found`);
    }
}

router.get("/", (req, res) => {
    res.send(reminders);
});

router.get("/:id", findReminderById, (req, res) => {
    res.send(req.reminder);
});

router.post("/", (req, res) => {
    const reminder = req.body;
    reminder.id = reminders.length + 1;
    reminders.push(reminder);

    res.status(201).send(`Reminder "${reminder.text}" was added successfully!`);
});

router.delete("/:id", (req, res) => {
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

router.put("/:id", findReminderById, (req, res) => {
    req.reminder.text = req.body.text;

    res.send(`Reminder updated to: ${req.reminder.text}`);
});



module.exports = router;