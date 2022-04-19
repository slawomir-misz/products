import React, { useState, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { Form, Input, Button, Result } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import ErrorPopUp from "../errorPopUp/ErrorPopUp";

type values = {
  password: string;
};

function reducer(errorState: string, errorCode: string): any {
  switch (errorCode) {
    case "":
      return { message: "" };
    case "auth/too-many-requests":
      return { message: "Your account is temporary blocked" };
    case "auth/wrong-password":
      return { message: "Wrong password" };
    case "auth/user-not-found":
      return { message: "User not found" };
    case "auth/weak-password":
      return { message: "Password is to week"}
    default:
      return { message: "Some other error occured" };
  }
}

const errorInitialState: string = "";

const PasswordResetForm: React.FC = () => {
  let [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorState, dispatchErrorState] = useReducer(
    reducer,
    errorInitialState
  );
  const navigate = useNavigate();

  const actionCode: any = searchParams.get("oobCode");

  const onFinish = (values: values) => {
    dispatchErrorState("");
    setLoading(true);

    verifyPasswordResetCode(auth, actionCode)
      .then(() => {
        confirmPasswordReset(auth, actionCode, values.password)
          .then(() => {
            setLoading(false);
            setSuccess(true);
          })
          .catch((error) => {
            setLoading(false);
            dispatchErrorState(error.code);
          });
      })
      .catch((error) => {
        setLoading(false);
        dispatchErrorState(error.code);
      });
  };

  return (
    <>
      {errorState.message ? (
        <ErrorPopUp
          message={errorState.message}
          dispatchErrorState={dispatchErrorState}
        />
      ) : (
        <></>
      )}
      {success ? (
        <Result
          status="success"
          title="Password reseted successfully"
          extra={[
            <Button
              type="primary"
              key="console"
              onClick={() => navigate("/login")}
            >
              Return to login
            </Button>,
          ]}
        />
      ) : (
        <Form name="normal_login" className="login-form" onFinish={onFinish}>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
              size="large"
            />
          </Form.Item>
          <Form.Item
            name="confirm"
            dependencies={["password"]}
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Confirm Password"
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
              Set new password
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default PasswordResetForm;
