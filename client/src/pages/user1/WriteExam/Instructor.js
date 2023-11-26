import React from "react";

function Instructor({ examData,setView ,startTimer}) {
  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl">Instruction</h1>
      <ul className="flex flex-col gap-1">
        <li>Exam completed in (Total time) : {examData.duration}</li>
        <li>Do not refresh Page (it will restart the exam)</li>
        <li>Total Marks :{examData.totalMarks}</li>
        <li>Passing Marks :{examData.passingMarks}</li>
        <li>Read all the instruction carefully</li>
      </ul>

      <button className="primary-otlined-btn"
      onClick={()=>{startTimer()
        setView("questions")}
      }
      id="instructor"
      
      
      >Start Exam</button>
    </div>
  );
}

export default Instructor;
