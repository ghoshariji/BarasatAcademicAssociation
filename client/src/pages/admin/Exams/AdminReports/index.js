import React, { useEffect } from "react";
import Pagetitle from "../../../../component/Pagetitle1";
import { useSelector } from "react-redux";
import { Table, message } from "antd";
import { getAllReports } from "../../../../apicalls/report";
import moment from "moment";

function AdminReports() {
  const { user } = useSelector(state => state.users);
  console.log(user); 
  
  const [reportData, setreportData] = React.useState([]);
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => <>{record.exam ? record.exam.name : "N/A"}</>,
    },
    {
      title: "User Name",
      dataIndex: "userName",
      render: (text, record) => <>{record.user ? record.user.name : "N/A"}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <>{record.createdAt ? moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss") : "N/A"}</>
      ),
    },
    {
      title: "Total Marks",
      dataIndex: "totalMarks",
      render: (text, record) => <>{record.exam ? record.exam.totalMarks : "N/A"}</>,
    },
    {
      title: "Passing Marks",
      dataIndex: "passingMarks",
      render: (text, record) => <>{record.exam ? record.exam.passingMarks : "N/A"}</>,
    },
    {
      title: "Obtained Marks",
      dataIndex: "correctAnswers",
      render: (text, record) => <>{record.result ? record.result.correctAnswer.length : "N/A"}</>,
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text, record) => <>{record.result ? record.result.verdict : "N/A"}</>,
    },
  ];
  const getData = async () => {
    try {
      const response = await getAllReports();
      console.log(response);
      if (response.success) {
        setreportData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Pagetitle title="Reports" />
      <Table columns={columns} dataSource={reportData} />
    </div>
  );
}

export default AdminReports;
