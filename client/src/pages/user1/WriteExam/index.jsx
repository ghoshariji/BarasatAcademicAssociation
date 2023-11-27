import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  getExamById } from "../../../apicalls/exams";
import {  addReport } from "../../../apicalls/report";
import Instructor from "./Instructor";
import {message} from "antd";
import { useSelector } from "react-redux";


function WriteExam() {
  const navigate = useNavigate();
  const params = useParams();
  const [view,setView] = useState("instructions");
  const [questions = [],setQuestions] = React.useState([]);
  const [selectedQuestion,setselectedQuestion] = React.useState(0);
  const [examData, setExamData] = React.useState(null);
  const [selectedOption ,setSelectedOption] = React.useState({});
  const [result={},setResult] =React.useState({});
  const [seconds = 0,setSecondleft] = useState(0);
  const [timeup,setTimeup] = useState(false);
  const [intervalId,setintervalId] = useState(null);
  const {user} = useSelector(state=> state.users);

  const getExamData = async () => {
    try {
      const response = await getExamById({
        examId: params.id,
      });
      if (response.success) {
        setQuestions(response.data.questions);
        setExamData(response.data);
        setSecondleft(response.data.duration);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
//   const calculateResult = async() => {
// try {
//   let correctAnswer = [];
//   let wrongAnswer = [];
//   questions.forEach((question, index) => {
//     if (question.correctOption === selectedOption[index]) {
//       correctAnswer.push(question);
//     } else {
//       wrongAnswer.push(question);
//     }
//   });

//   let verdict = "Pass";
//   if (correctAnswer.length < examData.passingMarks) {
//     verdict = "Fail";
//   }
//   const tempResult = {
//     correctAnswer,
//     wrongAnswer,
//     verdict
//   }
//   setResult(tempResult);
//   const response = await addReport({
//     exam:params.id,
//     result:tempResult,
// user:user._id,
  
//   })
//   if(response.success){

//     setView("result");
//   }
//   else{
//     message.error(response.message);
//   }
// } catch (error) {
//  message.error(error.message)
// }
//   };

const calculateResult = async () => {
  try {
    let correctAnswer = [];
    let wrongAnswer = [];
    let score = 0;

    questions.forEach((question, index) => {
      if (question.correctOption === selectedOption[index]) {
        correctAnswer.push(question);
        score += 1;
      } else {
        wrongAnswer.push(question);
        score -= 0.3;
      }
    });
    score = Math.max(0, score);

    let verdict = "Pass";
    if (score < examData.passingMarks) {
      verdict = "Fail";
    }

    const tempResult = {
      correctAnswer,
      wrongAnswer,
      score,
      verdict,
    };

    setResult(tempResult);

    const response = await addReport({
      exam: params.id,
      result: tempResult,
      user: user._id,
    });

    if (response.success) {
      setView("result");
    } else {
      message.error(response.message);
    }
  } catch (error) {
    message.error(error.message);
  }
};


  const startTimer = () =>{
let totalSeconds = examData.duration;
const intervalId = setInterval(()=>{
  if(totalSeconds>0){
    totalSeconds = totalSeconds - 1;
    setSecondleft(totalSeconds);
  }
  else{
    setTimeup(true);
  }
},1000);
setintervalId(intervalId);
  }
  
  useEffect(()=>{
if(timeup && view==='questions'){
  clearInterval(intervalId);
  calculateResult();
}
  },[timeup])

  useEffect(() => {
    if (params.id) {
      console.log(params.id);
      getExamData();
    }
  }, []); 

  return (
    examData && (
      <div className="mt-2">
        <h1 style={{color:"red"}}>{examData.name}</h1>

        {view === "instructions" && (
          <Instructor examData={examData} view={view} setView={setView} startTimer={startTimer}/>
        )}

      
{view === "questions" && (
  <div className="flex flex-col gap-2">
    <div className="flex justify-between">
    <h1 className="text-2xl">
      {selectedQuestion + 1}: {questions[selectedQuestion].name}
    </h1>
    <div className="timer">
      <span className="text-2xl">{seconds}</span>
    </div>

    </div>
    <div className="flex flex-col gap-2">
      {Object.keys(questions[selectedQuestion].options).map(
        (option, index) => (
          <div
            className={`flex gap-2 flex-col ${selectedOption[selectedQuestion] === option ? "selected-option" : "option"}`}
            key={index}
            onClick={() => {
              setSelectedOption({
                ...selectedOption,
                [selectedQuestion]: option
              });
            }}
          >
            <h1 className="text-2xl">
              {option}: {questions[selectedQuestion].options[option]}
            </h1>
          </div>
        )
      )}
    </div>

    <div className="flex justify-between">
      {selectedQuestion > 0 && (
        <button
          className="primary-outlined-btn"
          onClick={() => {
            setselectedQuestion(selectedQuestion - 1);
          }}
          id="previous"
        >
          Previous
        </button>
      )}

      {selectedQuestion < questions.length - 1 && (
        <button
          className="primary-outlined-btn"
          onClick={() => {
            setselectedQuestion(selectedQuestion + 1);
          }}
          id="next"
        >
          Next
        </button>
      )}

      {selectedQuestion ===questions.length - 1 && (
        <button
        className="primary-contained-btn"
        onClick={()=>{
          clearInterval(intervalId)
          setTimeup(true);
         
        }} id="submit">
Submit
        </button>
      )}
    </div>
  </div>
)}

{view ==="result" && <div className="result">
  
  <h1 className="text-2xl">
    RESULT
  </h1>
  
  <div className="marks">
    <h1 className="text-md">
      Total marks :{examData.totalMarks}
    </h1>
    <h1 className="text-md">
      Obtained Marks:{result.correctAnswer.length}
    </h1>
    <h1 className="text-md">
     Wrong answer : {result.wrongAnswer.length}
    </h1>
    <h1 className="text-md">
     Score : {result.score}
    </h1>
    <h1 className="text-md">
     Passing Marks:{examData.passingMarks}
    </h1>
    

    <h1 className="text-md">
     VERDICT:{result.verdict}
    </h1>
  </div>
  
  
  
  
  </div>}
      </div>
    )
  );
}

export default WriteExam;
