import React, { useState, useReducer } from "react";
import { useSearchParams } from "react-router-dom";
import { Form, Input, Button, Result } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { verifyPasswordResetCode, confirmPasswordReset } from "firebase/auth";
import { auth } from "../../firebase-config";
import { useNavigate } from "react-router-dom";
import ErrorPopUp from "../errorPopUp/ErrorPopUp";
import reducer from '../../reducers/ErrorReducer'

type formValues = {
  password: string;
};

const PasswordResetForm: React.FC = () => {
  let [searchParams] = useSearchParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [errorState, dispatchErrorState] = useReducer(
    reducer,
    {message: ""}
  );
  const navigate = useNavigate();

  const actionCode = searchParams.get("oobCode");

  const onFinish = (values: formValues) => {
    dispatchErrorState("");
    setLoading(true);

    verifyPasswordResetCode(auth, actionCode!)
      .then(() => {
        confirmPasswordReset(auth, actionCode!, values.password)
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
