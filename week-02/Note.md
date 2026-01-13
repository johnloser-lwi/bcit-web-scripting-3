# Express.js
- Built on Node.js
- Designed to build APIS
  - simplifies creating routes and handling HTTP requests + responses
- Lets developers chain together individual functionalities and execute them in a defined order
- Builds flexible database interactions for different types of clients
``` JavaScript
const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
    res.send("Hello, World!");
});

// Handle 404 errors for anything not handled
app.use((req, res) => {
    res.status(404).send("404 Not Found");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`);
});
```