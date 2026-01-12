const http = require("http");

const server = http.createServer((req, res) => {

    const errorResponse = (contentType = "text/plain", message = "Not Found!", code = 404) => {
        res.statusCode = code;
        res.setHeader("Content-Type", contentType);
        res.end(message);
    }

    const okResponse = (contentType, message, code = 200) => {
        res.statusCode = 200;
        res.setHeader("Content-Type", contentType);
        res.end(message);
    }

    if (req.method === "GET") {
        switch (req.url) {
            case "/":
                okResponse("text/html", "GET request received!");
                break;
            case "/about":
                okResponse("text/html", "GET request received on About Page!");
                break;
            default:
                errorResponse();
                break;
        }
    } else if (req.method === "POST") {
        switch (req.url) {
            case "/":
                okResponse("text/plain", "POST request received!");
                break;
            default:
                errorResponse();
                break;
        }
    }
    else {
        errorResponse();
    }
});

const PORT = 3000;

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});