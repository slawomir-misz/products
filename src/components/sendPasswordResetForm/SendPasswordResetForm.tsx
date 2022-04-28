import React, { useState, useReducer } from "react";
import { Form, Input, Button, Result } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from 'react-router-dom';
import ErrorPopUp from "../errorPopUp/ErrorPopUp";
import reducer from '../../reducers/ErrorReducer'

type formValues = {
  username: string;
};

const SendPasswordResetForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorState, dispatchErrorState] = useReducer(
    reducer,
    {message: ""}
  );
  const navigate = useNavigate();

  const onFinish = (values: formValues) => {
    setLoading(true);
    sendPasswordResetEmail(auth, values.username)
      .then(() => {
        setLoading(false);
        setSuccess(true);
      })
      .catch((error: any) => {
        setLoading(false);
        dispatchErrorState(error.code);
      });
  };

  return (
    <>
      {errorState.message ? (
        <ErrorPopUp message={errorState.message} dispatchErrorState={dispatchErrorState}/>
      ) : (
        <></>
      )}
      {success ? (
        <Result
          status="success"
          title="Check your email address"
          extra={[
            <Button type="primary" key="console" onClick={()=> navigate('/login')}>
              Return to login 
            </Button>,
          ]}
        />
      ) : (
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="username"
            rules={[
              {
                type: "email",
                message: "The input is not valid E-mail!",
              },
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Email"
              size="large"
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              block
              loading={loading}
            >
              Reset password
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default SendPasswordResetForm;
