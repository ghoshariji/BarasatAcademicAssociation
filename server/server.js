const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();

const myMiddleware = (req, res, next) => {
  next();
};

app.use(myMiddleware);
const dbConfig = require("./config/dbConfig");
app.use(express.json());


// userRoute


const usersRoute = require("./routes/usersRoute");
app.use("/api/users", usersRoute);


//ExamRoute  


const examsRoute = require("./routes/examRoute");
app.use("/api/exams",examsRoute);

// Report Route :-

const reportroute = require("./routes/reportsReportRoute");
app.use("/api/reports/",reportroute);


const path = require("path");
__dirname = path.resolve();

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"client/build")));
  app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"client","build","index.html"));
  });
}




app.listen(PORT, () => {
  console.log("Running");
});
