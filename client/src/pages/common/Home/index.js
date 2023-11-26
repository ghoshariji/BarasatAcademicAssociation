import React, { useEffect } from "react";
import { getAllExams } from "../../../apicalls/exams";
import { message, Row, Col } from "antd";
import PageTitle from "../../../component/pageTitle";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Index() {
  const [exams, setExams] = React.useState([]);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.users);

  const getExams = async () => {
    try {
      const response = await getAllExams();
      if (response.success) {
        setExams(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExams();
  }, []);

  // Check if user is null before rendering the component
  if (!user) {
    return <div>Loading...</div>; // You can render a loading state or redirect the user to the login page
  }

  return (
    user && <div>
      <PageTitle title={`Hii ${user.name}, Welcome to the Exam Dashboard`}  style={{color:"#9BB33B"}}/>

      <Row gutter={[16, 16]}>
        {exams.map((exam) => (
          <Col span={6} key={exam._id} style={{padding:"1rem",margin:"0.5rem",width: "100%"}}>
            <div className="card flex flex-col gap-1">
              <h1 className="text-2xl">
                <b>{exam?.name}</b>
              </h1>
              <h1 className="text-md">Category : {exam.category}</h1>
              <h1 className="text-md">Total Marks : {exam.totalMarks}</h1>
              <h1 className="text-md">Passing Marks : {exam.passingMarks}</h1>
              <h1 className="text-md">Duration : {exam.duration}</h1>

              <button
                className="primary-outlined-btn"
                onClick={() => navigate(`/user/write-exam/${exam._id}`)}
             id="fstart" >
                Start Exam
              </button>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Index;
