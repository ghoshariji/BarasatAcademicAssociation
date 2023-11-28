import React from "react";
import { Form,message } from "antd";
import { loginUser } from "../../../apicalls/users";

const index = () => {
      const onFinish = async(values)=>{
          try{
      
              const response = await loginUser(values);
              if(response.success)
              {
                  message.success(response.message);
                  localStorage.setItem("token",response.data);
                  window.location.href="/";
              }
              else{
                  message.error(response.message);
              }
          }
          catch(error){
      message.error(error.message)
          }
      
    }


  return (
    <div className="flex justify-center item-center h-screen w-screen">
      <div className="card w-400">
        <div className="flex flex-col item-center" id="signin">
          <h1 className="text-xl">
            <Form layout="vertical" onFinish={onFinish}>
              <Form.Item name="email" label="Email">
                <input type="text" />
              </Form.Item>
              <Form.Item name="password" label="Password">
                <input type="password" />
              </Form.Item>

              <Form.Item>
                <button type="submit" id="signinButton">Login</button>
              </Form.Item>
            </Form>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default index;
