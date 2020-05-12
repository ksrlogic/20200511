const express = require("express");
const app = express();

const sanitizer = require("sanitizer");
var router = express.Router();
var bodyParser = require("body-parser");
var qs = require("querystring");
var path = require("path");
var fs = require("fs");
var compression = require("compression");
app.use(compression());
//middle
app.use(bodyParser.urlencoded({ extended: false }));
//

/* GET home page. */
router.get("/", function (req, res, next) {
  fs.readdir("./data", (err, data) => {
    var body = ``;
    var i = 0;
    while (i < data.length) {
      body =
        body + `<a href="/${data[i]}" class="list-group-item">${data[i]}</a>`;
      i++;
    }
    res.render("index", {
      title: "Gallery",
      list: body,
    });
  });
});

router.get("/:pageID", function (req, res, next) {
  var id = req.params.pageID;
  fs.readFile(`./data/${id}`, "utf8", function (err, description) {
    if (err) {
      next(err);
    } else {
      res.render("viewjs", {
        title: id,
        description: description,
      });
    }
  });
});
//생성
router.get("/createpage/create", function (req, res, next) {
  res.render("create", {
    title: "create",
  });
});

router.post("/create_process", function (req, res, next) {
  var post = req.body;
  var title = sanitizer.sanitize(post.title);
  var description = sanitizer.sanitize(post.description);
  fs.writeFile(`data/${title}`, description, "utf8", function (err) {
    res.writeHead(302, { Location: `/` });
    res.end();
  });
});

//수정
router.get("/:pageID/update", function (req, res, next) {
  var id = req.params.pageID;
  fs.readFile(`./data/${id}`, "utf8", (err, data) => {
    console.log(data);
    res.render("update", {
      title: id,
      data: data,
    });
  });
});
router.post("/update_process", function (req, res, next) {
  var post = req.body;
  var title = sanitizer.sanitize(post.title);
  var description = sanitizer.sanitize(post.description);
  fs.writeFile(`data/${title}`, description, "utf8", function (err) {
    res.writeHead(302, { Location: `/${title}` });
    res.end();
  });
});
//삭제
router.get("/:pageID/delete", function (req, res, next) {
  var id = req.params.pageID;
  fs.unlink(`./data/${id}`, (err) => {
    res.redirect("/");
  });
});
module.exports = router;
