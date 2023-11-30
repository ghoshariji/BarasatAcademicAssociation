import React, { useEffect } from "react";
import PageTitle from "../../../component/pageTitle";
import { Table, message } from "antd";
import { getAllReportsByUser } from "../../../apicalls/report";
import moment from "moment";

function UserReports() {
  const [reportData, setreportData] = React.useState([]);
  const columns = [
    {
      title: "Exam Name",
      dataIndex: "examName",
      render: (text, record) => <>{record.exam ? record.exam.name : "N/A"}</>,
    },
    {
      title: "Date",
      dataIndex: "date",
      render: (text, record) => (
        <> {record.createdAt ? moment(record.createdAt).format("DD-MM-YYYY hh:mm:ss") : "N/A"}</>
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
      title: "Score",
      dataIndex: "score",
      render: (text, record) => <>{record.result ? (record.result.score !== undefined ? record.result.score : "N/A") : "N/A"}</>,
    },
    {
      title: "Verdict",
      dataIndex: "verdict",
      render: (text, record) => <>{record.result ? record.result.verdict : "N/A"}</>,
    },
  ];

  const getData = async () => {
    try {
      const response = await getAllReportsByUser();
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
      <PageTitle title="Reports" />
      <Table columns={columns} dataSource={reportData} />
    </div>
  );
}

export default UserReports;
