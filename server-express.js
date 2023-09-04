const express = require("express");
const { read } = require("fs");
const app = express();
const port = 8080;

const { readFile } = require("fs").promises;

app.get("/", async (request, response) => {
    response.send(await readFile("./pages/index.html", "utf8"));
});

app.get("/about", async (request, response) => {
    response.send(await readFile("./pages/about.html", "utf8"));
});

app.get("/contact-me", async (request, response) => {
    response.send(await readFile("./pages/contact-me.html", "utf8"));
});

app.use( async (request, response) => {
    response.status(404).send(await readFile("./pages/404.html", "utf8"));
});

app.listen(port, () => console.log(`App available on http://localhost:${port}`))