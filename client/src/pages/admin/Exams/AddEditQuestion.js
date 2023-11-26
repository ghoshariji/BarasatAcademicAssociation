import React from "react";
import { Modal, Form, message } from "antd";
import { addQuestionToExam } from "../../../apicalls/exams";

function AddEditQuestion({
  showAddEditQuestionModel,
  setShowAddEditQuestionModel,
  refreshData,
  examId,
  selectedQuestion,
  setselectedQuestion,
}) {
  const onFinish = async (values) => {
    console.log("Exam-id", examId);
    console.log(values);
    try {
      const requiredPayload = {
        name: values.name,
        correctOption: values.correctOption,
        options: {
          A: values.A,
          B: values.B,
          C: values.C,
          D: values.D,
        },
        exam: examId,
      };
      const response = await addQuestionToExam(requiredPayload);

      if (response.success) {
        message.success(response.message);
        refreshData();
        setShowAddEditQuestionModel(false);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div>
      <Modal
        title={selectedQuestion ? "Edit Question" : "Add Question"}
        visible={showAddEditQuestionModel}
        footer={false}
        onCancel={() => {
          setShowAddEditQuestionModel(false);
          setselectedQuestion(null);
        }}
      >
        <Form
          onFinish={onFinish}
          layout="vertical"
          initialValues={{
            name: selectedQuestion?.name,
            A: selectedQuestion?.options?.A,
            B: selectedQuestion?.options?.B,
            C: selectedQuestion?.options?.C,
            D: selectedQuestion?.options?.D,
            correctOption: selectedQuestion?.correctOption,
          }}
          id="addQuestion"
        >
          <Form.Item name="name" label="Question" rules={[{ required: true }]}>
            <input type="text" />
          </Form.Item>
          <Form.Item
            name="correctOption"
            label="Correct Option"
            rules={[
              { required: true, message: "Please select the correct option" },
            ]}
          >
            <input type="text" />
          </Form.Item>

          <div className="flex gap-3">
            <Form.Item name="A" label="Option A" rules={[{ required: true }]}>
              <input type="text" />
            </Form.Item>
            <Form.Item name="B" label="Option B" rules={[{ required: true }]}>
              <input type="text" />
            </Form.Item>
            <Form.Item name="C" label="Option C" rules={[{ required: true }]}>
              <input type="text" />
            </Form.Item>
            <Form.Item name="D" label="Option D" rules={[{ required: true }]}>
              <input type="text" />
            </Form.Item>
          </div>

          <div className="flex justify-end mt-2 gap-3">
            <button className="primary-contained-btn" type="submit" id="addquesSave">
              Save
            </button>
          </div>
        </Form>
      </Modal>
    </div>
  );
}

export default AddEditQuestion;
