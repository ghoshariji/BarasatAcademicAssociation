const router = require("express").Router();
const Exam = require("../models/examModel");
const authMiddleware = require("../middlewares/authMiddleware");
const Question = require("../models/questionModel");

// add exam

router.post("/add", authMiddleware, async (req, res) => {
  try {
    // check duplicate exam name

    const examExist = await Exam.findOne({ name: req.body.name });
    if (examExist) {
      return res
        .status(200)
        .send({ mesg: "Exam already Exists", success: false });
    }
    req.body.questions = [];
    const newExam = new Exam(req.body);
    await newExam.save();
    res.send({
      mesg: "Exam added successfully",
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      mesg: error.message,
      data: error,
      success: false,
    });
  }
});

// get all exam

router.post("/get-all-exams", authMiddleware, async (req, res) => {
  try {
    const exams = await Exam.find({});
    res.send({
      mesg: "Exams added succesfully",
      data: exams,
      success: true,
    });
  } catch (error) {
    res.tatus(500).send({
      mesg: error.message,
      data: error,
      success: false,
    });
  }
});

// get exam by id:-

router.post("/get-exam-by-id", authMiddleware, async (req, res) => {
  try {
    const exam = await Exam.findById(req.body.examId).populate("questions");
    res.send({
      mesg: "Exam fetched succesfully",
      data: exam,
      success: true,
    });
  } catch (error) {
    res.status(500).send({
      mesg: error.message,
      data: error,
      success: true,
    });
  }
});


// edit exam by id:-

router.post("/edit-exam-by-id",authMiddleware,async(req,res)=>{
try {
  await Exam.findByIdAndUpdate(req.body.examId,req.body);
  res.send({
    mesg:"Exam edited Succesfully",
    success:true
  })
} catch (error) {
  res.status(500).send({
    message: error.message,
    data: error,
    success: false,
  });
}


})
// Delete exam by id

router.post("/delete-exam-by-id",authMiddleware,async(req,res)=>{
  try {
    await Exam.findByIdAndDelete(req.body.examId);
    res.send({
      mesg:"Exam Deleted Succesfully",
      success:true
    })
  } catch (error) {
    res.status(500).send({
      message: error.message,
      data: error,
      success: false,
    });
  }
  
  
  })


// Add question to exam :-;

router.post("/add-question-to-exam", authMiddleware, async (req, res) => {
  try {
    const newQuestion = new Question(req.body);
    const question = await newQuestion.save();
    const exam = await Exam.findById(req.body.exam);

    if (!exam) {
      return res.status(404).send({
        message: "Exam not found",
        success: false,
      });
    }

    exam.questions.push(question._id);
    await exam.save();

    res.send({
      message: "Question added successfully",
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



// Edit question in a exam

router.post("/edit-question-in-exam",authMiddleware,async(req,res)=>{
  try {
    await Question.findByIdAndUpdate(req.body.questionId,req.body);
    res.send({
      mesg:"Question edited succesfully",
      success:true
    })
  } catch (error) {
    res.status(500).send({
      mesg: error.message,
      data: error,
      success: false,
    });
  }
})


// delete question :-

router.post("/delete-question-in-exam",authMiddleware,async(req,res)=>{
  try {
    await Question.findByIdAndDelete(req.body.questionId);
    const exam=await Exam.findByIdAndDelete(req.body.examId);
    exam.questions = exam.questions.filter((question)=>{
      question._id != req.body.questionId;
    });
    await exam.save();
    res.send({
      mesg:"Question Deleted succesfully",
      success:true
    })
  } catch (error) {
    res.status(500).send({
      mesg: error.message,
      data: error,
      success: false,
    });
  }
})



module.exports = router;
