let express = require('express');
// let mongoose = require('mongoose');
let path = require('path');
let cors = require('cors');
let ejs =  require('ejs');

let app = express();
app.use(cors());
app.use("/public", express.static(path.join(__dirname, 'public')));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");
let dbURI = "mongodb+srv://bhaske-saravanan:bhaske2929@journallog-1.prxoj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const options = {
  useNewUrlParser: true, useUnifiedTopology: true
}
// mongoose.set("useFindAndModify", false)

// mongoose.connect(dbURI, options).then(() => {
//   app.listen(8000, function () {
//     console.log("server started");
//   });
// }).catch(error => {
//   console.log(error);
//   throw error
// })

app.get("/", function (req: any, res: any) {
  res.render("index");
});

app.listen(8000, function(){
  console.log('script started')
});

