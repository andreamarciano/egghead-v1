# Express - Serving Static Files

Sometimes, you want your Express server to deliver static files like HTML pages, images, CSS, or JavaScript. These files are not generated dynamically — Express just **delivers them "as is"**. That’s why we call them **static** files.

## Code Example

```js
const express = require("express");
const app = express();

// Middleware to serve all files in the "public" folder
app.use(express.static("public"));

// Specific routes to serve HTML pages
app.get("/", (req, res) => {
  res.sendFile("homepage.html", { root: __dirname + "/public" });
});

app.get("/about", (req, res) => {
  res.sendFile("about.html", { root: __dirname + "/public" });
});

app.get("/contacts.html", (req, res) => {
  res.sendFile("contacts.html", { root: __dirname + "/public" });
});

// Catch-all for 404 - if no route matches
app.use((req, res) => {
  res.sendFile("404.html", { root: __dirname + "/public" });
});

app.listen(3000);
```

### Notes

- `express.static("public")` tells Express:

  > “If a request matches a file inside `/public`, just send that file and skip the rest.”

- This is perfect for serving images, CSS, and client-side JavaScript.

- `res.sendFile("filename.html", { root: __dirname + "/public" })`
  explicitly serves HTML files in response to specific routes.
