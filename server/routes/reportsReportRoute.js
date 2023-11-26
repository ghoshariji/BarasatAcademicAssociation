const authMiddleware = require("../middlewares/authMiddleware");

const router = require("express").Router();
const Report = require("../models/reportModel");
const exam = require("../models/examModel");
const user = require("../models/userModel");

// add REPORT :-

router.post("/add-report",authMiddleware,async(req,res)=>{
    try {
        const newReport = new Report(req.body);
        await newReport.save();
        res.send({
            message:"Attempt SuccesFully",
            success:true
        })
    } catch (error) {
        res.status(500).send({
            message:error.message,
            data:error,
            success:false
        })
    }
});

router.post("/get-all-reports",authMiddleware,async(req,res)=>{
    try {
        const reports = await Report.find()
        .populate("exam")
        .populate("user")
        .sort({ createdAt: -1 });
        res.send({
            message:"Attempt fetched succesfully",
            data:reports,
            success:true
        })
    } catch (error) {
        res.status(500).send({
            message:error.message,
            data:error,
            success:false
        })
    }
})

router.post("/get-all-reports-by-user", authMiddleware, async (req, res) => {
    try {
      const reports = await Report.find({ user: req.body.userId })
        .populate("exam")
        .populate("user")
        .sort({ createdAt: -1 });
  
      res.send({
        message: "Attempts fetched successfully",
        data: reports,
        success: true,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
        data: error,
        success: false,
      });
    }
  });

module.exports = router;