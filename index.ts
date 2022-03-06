let express = require('express');
let mongoose = require('mongoose');
let path = require('path');
let cors = require('cors');
let ejs =  require('ejs');
require('dotenv').config();

let app = express();
app.use(cors());
app.use("/public", express.static(path.join(__dirname, 'app/public')));
app.engine("html", ejs.renderFile);
app.set("view engine", "html");

// let dbURI = "mongodb+srv://bhaske-saravanan:bhaske2929@journallog-1.prxoj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const options = {
  useNewUrlParser: true, useUnifiedTopology: true
}
// mongoose.set("useFindAndModify", false)

mongoose.connect(process.env.DB_URL, options);
let db = mongoose.connection;
db.on('error',(error:any)=>console.log(error))
db.once('open',()=>console.log('db got connected'))
app.use(express.json());

//routes
const bloggerRoutes = require("./app/Handlers/blogger_handlers");
app.use("/blog", bloggerRoutes);

app.listen(8000, function(){
  console.log('script started')
});

