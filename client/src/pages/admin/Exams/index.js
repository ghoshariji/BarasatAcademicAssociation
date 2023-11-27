import React, { useEffect } from "react";
import PageTitle from "../../../component/pageTitle";
import { Table, message } from "antd";
import { useNavigate,Link } from "react-router-dom";
import { deleteExamById, getAllExams } from "../../../apicalls/exams";

function Index() {
  const navigate = useNavigate();
  const [exams, setExams] = React.useState([]);

  const getExamsData = async () => {
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

  const deleteExam = async (examId) => {
    try {
      const response = await deleteExamById({
        examId,
      });
      if (response.success) {
        message.success(response.message);
        getExamsData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "Exam Name",
      dataIndex: "name",
    },
    {
      title: "Duration",
      dataIndex: "duration",
    },
    {
      title: "Exam Name",
      dataIndex: "name",
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
    },
    {
      title: "Passing Marks",
      dataIndex: "passingMarks",
    },
    {
      title: "Actions",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <button
            className="primary-outlined-btn flex items-center"
            onClick={() => navigate(`/admin/exams/edit/${record._id}`)} id="editExam"
          >
            Edit Exam
          </button>

          <button
            className="primary-outlined-btn flex items-center"
            onClick={() => deleteExam(record._id)} id="deleteExam"
          >
            Delete Exam
          </button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getExamsData();
  }, []);
  return (
    <div>
      <div className="flex justify-between mt-2">
        <PageTitle title="Exams" />

        <Link to="/register" id="link">Add New User</Link>
        <button
          className="primary-outlined-btn flex items-center"
          onClick={() => navigate("/admin/exams/add")} id="addQuestion"
        >
          Add Exam
        </button>
        
      </div>

      <Table columns={columns} dataSource={exams} />
    </div>
  );
}

export default Index;
