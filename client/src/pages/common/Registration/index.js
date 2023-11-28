import React from "react";
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import { registerUser } from "../../../apicalls/users";

const index = () => {
  const onFinish = async (values) => {
    try {
      const response = await registerUser(values);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };
  return (
    <div className="flex justify-center item-center h-screen w-screen">
      <div className="card w-400">
        <div className="flex flex-col item-center" id="register">
          <h1 className="text-xl">
            <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name="name" label="Name">
                <input type="text" />
                </Form.Item>
              <Form.Item name="email" label="Email">
                <input type="text" />
              </Form.Item>
              <Form.Item name="password" label="Password">
                <input type="password" />
              </Form.Item>

              <Form.Item>
                <button type="submit" id="registerButton">Create new user</button>
              </Form.Item>

              <Link to="/">Go to Home Page</Link>
            </Form>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default index;
