import React, { useState, useReducer } from "react";
import { Form, Input, Button, Alert, Result } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase-config";
import styled, { keyframes } from "styled-components";
import { fadeInUp } from "react-animations";
import { useNavigate } from 'react-router-dom';

type values = {
  username: string;
};

function reducer(errorState: string, errorCode: string): any {
  switch (errorCode) {
    case "":
      return { message: "" };
    case "auth/too-many-requests":
      return { message: "Your account is temporary blocked" };
    case "auth/user-not-found":
      return { message: "User not found" };
    default:
      return { message: "Some other error occured" };
  }
}
const errorInitialState: string = "";

const SendPasswordResetForm: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorState, dispatchErrorState] = useReducer(
    reducer,
    errorInitialState
  );
  const navigate = useNavigate();

  const onFinish = (values: values) => {
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

  const handleCloseAlert = () => {
    dispatchErrorState("");
  };

  return (
    <>
      {errorState.message ? (
        <StyledAlert>
          <Alert
            message={errorState.message}
            type="error"
            closable
            onClose={handleCloseAlert}
          />
        </StyledAlert>
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

const fadeInUpAnimation = keyframes`${fadeInUp}`;

const StyledAlert = styled.div`
  top: -64px;
  width: 100%;
  position: absolute;
  animation: 1s ${fadeInUpAnimation};
`;