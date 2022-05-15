import React, { useContext, useReducer, useState } from 'react';
import {
  Form, Input, Button, Checkbox,
} from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { AuthContext } from '../../contexts/AuthContext';
import IconLogo from '../iconLogo/IconLogo';
import ErrorPopUp from '../errorPopUp/ErrorPopUp';
import reducer from '../../reducers/ErrorReducer';

type formValues = {
  username: string;
  password: string;
  remember: boolean;
};

const StyledFlexAndSpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;

const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 24px;
  font-size: 35px;
`;

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorState, dispatchErrorState] = useReducer(reducer, { message: '' });

  const onFinish = (values: formValues) => {
    dispatchErrorState('');
    setLoading(true);

    login(values.username, values.password, values.remember)
      .then(() => {
        setLoading(false);
        navigate('/products');
      })
      .catch((error: any) => {
        setLoading(false);
        dispatchErrorState(error.code);
      });
  };

  return (
    <>
      {errorState.message && (
        <ErrorPopUp
          message={errorState.message}
          dispatchErrorState={dispatchErrorState}
        />
      )}

      <StyledTitle>
        Products App [
        {' '}
        <IconLogo />
        {' '}
        ]
      </StyledTitle>

      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="username"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your Username!',
            },
          ]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
            size="large"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your Password!',
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
        <Form.Item>
          <StyledFlexAndSpaceBetween>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Link to="/password_reset">Forgot password?</Link>
          </StyledFlexAndSpaceBetween>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            block
            loading={loading}
          >
            Login
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
