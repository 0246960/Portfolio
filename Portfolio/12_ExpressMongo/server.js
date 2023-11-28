require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.engine("ejs", require("ejs").renderFile);
app.set("view engine", "ejs");

//const mongoUrl = "mongodb://127.0.0.1:27017/f1";
const user = process.env.USER_ID;
const pass = process.env.USER_PASS;
const mongoUrl = `mongodb+srv://${user}:${pass}@andres.xllo7a2.mongodb.net/`;
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true });

// Definition of a schema
const teamSchema = new mongoose.Schema({
  id: Number,
  name: String,
  value: String,
  nationality: String,
  url: String,
});
teamSchema.set("strictQuery", true);

const driverSchema = new mongoose.Schema({
  num: Number,
  code: String,
  forename: String,
  surname: String,
  dob: Date,
  nationality: String,
  url: String,
  team: teamSchema,
});
driverSchema.set("strictQuery", true);

const Team = mongoose.model("Team", teamSchema);
const Driver = mongoose.model("Driver", driverSchema);

let teamsRaw = [
    { code:"mercedes", name: "Mercedes", country: "GER"},
    { code:"aston_martin", name: "Aston Martin", country: "ENG"},
    { code:"alpine", name: "Alpine", country: "FRA"},
    { code:"hass_f1", name: "Hass F1 Team", country: "USA"},
    { code:"red_bull", name: "Red Bull Racing", country: "AUS"},
    { code:"alpha_tauri", name: "Alpha Tauri", country: "ITA"},
    { code:"alpha_romeo", name: "Alpha Romeo", country: "ITA"},
    { code:"ferrari", name: "Ferrari", country: "ITA"},
    { code:"williams", name: "Williams", country: "ENG"},
    { code:"mc_laren", name: "McLaren", country: "ENG"},
];

let countries = [
  { code: "ENG", label: "England" },
  { code: "SPA", label: "Spain" },
  { code: "GER", label: "Germany" },
  { code: "FRA", label: "France" },
  { code: "MEX", label: "Mexico" },
  { code: "AUS", label: "Australia" },
  { code: "FIN", label: "Finland" },
  { code: "NET", label: "Netherlands" },
  { code: "CAN", label: "Canada" },
  { code: "MON", label: "Monaco" },
  { code: "THA", label: "Thailand" },
  { code: "JAP", label: "Japan" },
  { code: "CHI", label: "China" },
  { code: "USA", label: "USA" },
  { code: "DEN", label: "Denmark" },
];

let teams = [];

app.use("/", async (req, res, next) => {
    if(teams.lenght == 0){
        var team = await Team.find({}).exec();
        if(!Array.isArray(team) || team.lenght == 0){
            //insert elements
            await Team.insertMany(teamsRaw)
            .then(() => {
              console.log("Data loaded");
            })
            .catch((error) => {
              console.error(error);
            });
            await Team.find({})
            .then((docs) => {
              console.log("Teams loaded");
              teams= docs;
            })
            .catch((error)=>{
                console.error(error);
            });
        } else {
            teams = team;
        }
    }
    next();
});

app.get("/", (req, res) => {
  //res.sendFile(__dirname + "/public/html/index.html");
 res.render("index",{ countries, teams });
});

app.post("/driver", (req, res) => {
  var driver = {
    num:req.body.num,
    code: req.body.code,
    forename: req.body.name,
    surname: req.body.lname,
    dob: req.body.dob,
    dob: req.body.dob,
    nationality: req.body.nation,
    url: req.body.url,
    team: team,
  }
});
  await Driver.insertOne(driver)
  .then(() => {
    console.log("Driver recorded");
  })
  .catch((err) => {
    console.error(err);
  });

  var driver = new Driver({
    num:req.body.num,
    code: req.body.code,
    forename: req.body.name,
    surname: req.body.lname,
    dob: req.body.dob,
    nationality: req.body.nation,
    url: req.body.url,
    team: team,
  });

app.listen(3000, (err) => {
  console.log("Listening on port 3000");
});