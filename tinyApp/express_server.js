var express = require("express");
var app = express();
var PORT = 8080; // default port 8080
const bodyParser = require("body-parser");
//This ist he URL data that needs to get passes to urls_index.ejs
var urlDatabase = {
  "b2xVn2": "http://www.lighthouselabs.ca",
  "9sm5xK": "http://www.google.com"
};

function generateRandomString() {
  let r = Math.random().toString(36).substring(7);
  return r;
}

var randomSixDig = generateRandomString();

app.use(bodyParser.urlencoded({extended: true}));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello!");
});

app.get("/urls", (req, res) => {
  let templateVars = {urls: urlDatabase};
  //"urls_index is actually a template of ejs"
  res.render("urls_index", templateVars);
});

app.get("/urls/new", (req, res) => {
  res.render("urls_new");
});

app.post("/urls", (req, res) => {
  urlDatabase[randomSixDig] = req.body.longURL
  res.redirect("http://localhost:8080/urls/" + randomSixDig);
});

app.get("/u/:shortURL", (req, res) => {
  //console.log(req.params.shortURL);
  let longURL = urlDatabase[req.params.shortURL];
  console.log(urlDatabase);
  res.redirect(longURL, 303);
});

app.get("/urls/:id", (req, res) => {
  //console.log(req.params)
  let templateVars = { shortURL: req.params.id, longURL: urlDatabase[req.params.id]};
  res.render("urls_show", templateVars);
});

app.get("/urls.json", (req, res) => {
  res.json(urlDatabase);
});

app.get("/hello", (req, res) => {
  res.send("<html><body>Hello <b>World</b></body></html>\n");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});