import React, { useEffect, useState } from "react";
import PageTitle from "../../../component/pageTitle";
import { Form, Row, Col, Select, message, Tabs, Table } from "antd";
import {
  addExam,
  editExamById,
  getExamById,
  deleteQuestionById,
} from "../../../apicalls/exams";
import { useNavigate, useParams } from "react-router-dom";
import AddEditQuestion from "./AddEditQuestion";
const { TabPane } = Tabs;

function AddEditExam() {
  const navigate = useNavigate();
  const params = useParams();
  const [examData, setExamData] = useState(null);
  const [showAddEditQuestionModal, setShowAddEditQuestionModal] =
    React.useState(false);
  const [selectedQuestion, setselectedQuestion] = React.useState(null);

  const onFinish = async (values) => {
    try {
      let response;
      if (params.id) {
        response = await editExamById({
          ...values,
          examId: params.id,
        });
      } else {
        response = await addExam(values);
      }
      if (response.success) {
        message.success(response.message);
        navigate("/admin/exams");
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  const getExamData = async () => {
    try {
      const response = await getExamById({
        examId: params.id,
      });
      if (response.success) {
        setExamData(response.data);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (params.id) {
      console.log(params.id);
      getExamData();
    }
  }, []);

  const deleteQuestion = async (questionId) => {
    try {
      const response = await deleteQuestionById({
        questionId,
        examId: params.id,
      });
      if (response.success) {
        message.success(response.message);
        getExamData();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  const questionColumns = [
    {
      title: "Question",
      dataIndex: "name",
    },

    {
      title: "Options",
      dataIndex: "options",
      render: (text, record) => {
        return Object.keys(record.options).map((key) => {
          return (
            <div>
              {key} :{record.options[key]}
            </div>
          );
        });
      },
    },
    {
      title: "Correct Option",
      dataIndex: "correctOption",
      render: (text, record) => {
        return ` ${record.correctOption}: ${
          record.options[record.correctOption]
        }`;
      },
    },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2">
          <i
            class="ri-pencil-line"
            onClick={() => {
              setselectedQuestion(record);
              setShowAddEditQuestionModal(true);
            }}
          ></i>

          <i
            class="ri-chat-delete-line"
            onClick={() => {
              deleteQuestion(record._id);
            }}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <div>
      <PageTitle title={params.id ? "Edit Exam" : "Add Exam"} />

      {(examData || !params.id) && (
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={examData}
          id="addExam"
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="Exam-Details" key="1">
              <Row gutter={[10, 10]}>
                <Col span={8}>
                  <Form.Item label="Exam name" name="name">
                    <input type="text" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Exam Duration" name="duration">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Category" name="category">
                    <Select>
                      <Select.Option value="wbcs">WBCS</Select.Option>
                      <Select.Option value="food si">Food SI</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Total Marks" name="totalMarks">
                    <input type="number" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Passing Marks" name="passingMarks">
                    <input type="number" />
                  </Form.Item>
                </Col>
              </Row>
              <div className="flex justify-end">
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </div>
            </TabPane>
            {params.id && (
              <TabPane tab="Questions" key="2">
                <div className="flex justify-end">
                  <h1>Questions</h1>
                  <button
                    className="primary-outlines-btn"
                    type="button"
                    onClick={() => setShowAddEditQuestionModal(true)}
                    id="tbutton"
                  >
                    Add Question
                  </button>
                </div>
                <Table
                  columns={questionColumns}
                  dataSource={examData?.questions || []}
                />
              </TabPane>
            )}
          </Tabs>
        </Form>
      )}

      {showAddEditQuestionModal && (
        <AddEditQuestion
          setShowAddEditQuestionModel={setShowAddEditQuestionModal}
          showAddEditQuestionModel={showAddEditQuestionModal}
          examId={params.id}
          refreshData={getExamData}
          selectedQuestion={selectedQuestion}
          setselectedQuestion={setselectedQuestion}
        />
      )}
    </div>
  );
}

export default AddEditExam;
