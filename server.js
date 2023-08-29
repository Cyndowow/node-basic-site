const http = require("http");
const fs = require("fs");

const htmlFiles = fs.readdirSync("./pages", {withFileTypes: true}).map(file => file.name);

let homepage = "/";
let page404;
fs.readFile("./pages/404.html", (err, data) => {
    page404 = data;
});

const server = http.createServer((req, res) => {
    console.log(`requested url: ${req.url}`)
    let filename = req.url;
    let requested_dir;
    filename = filename === homepage ? "index" : filename.substring(1); // to remove "/" before requrl

    if(htmlFiles.includes(filename + ".html")) {
        console.log("loading page")
        filename += ".html";
        requested_dir = "./pages/"
    }

    console.log(`requesting ==> ${requested_dir}${filename}`)
    fs.readFile(requested_dir + filename, (err, data) => {
        if (err) {
            console.log(`${filename} not found`)
            res.writeHead(404, {"Content-Type": "text/html"});
            res.write(page404);
            res.end();
        } else {
            if (requested_dir == "./pages/") {
                res.writeHead(200, {"Content-Type": "text/html"});
                res.write(data);
                res.end();
            }
        }
    })
})

server.listen(8080, () => {
    console.log("Server started! --- listening on port 8080")
})
