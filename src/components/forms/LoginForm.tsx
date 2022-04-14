import React, { useContext, useReducer, useState } from 'react'
import { Form, Input, Button, Checkbox, Alert } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components'

type values = {
  username: string
  password: string
}

function reducer(errorState:string, errorCode:string):any {
  switch(errorCode) {
    case '':
      return {message: ""};
    case 'auth/too-many-requests' :
      return {message: "Your account is temporary blocked"};
    case 'auth/wrong-password' :
        return {message: "Wrong password"};
    case 'auth/user-not-found':
        return {message: "User not found"};
    default:
        return { message: "Some other error occured"};
  }
}

const errorInitialState:string = ""

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext)
  const [loading, setLoading] = useState<boolean>(false)
  const [errorState, dispatchErrorState] = useReducer(reducer, errorInitialState)

  const onFinish = (values:values):void => {
    dispatchErrorState("")
    setLoading(true)

    login(values.username, values.password)
    .then(()=>{
      setLoading(false)
      navigate('/products')
    })
    .catch((error:any)=>{
      setLoading(false)
      dispatchErrorState(error.code)
    })
  };

  const handleCloseAlert = () => {
    dispatchErrorState("")
  };

  return (
    <>
      {errorState.message ? 
        <StyledAlert>
          <Alert
            message={errorState.message}
            type="error"
            closable
            onClose={handleCloseAlert}
          /> 
        </StyledAlert>
      : 
        <></> 
      }
      <Form
        name="normal_login"
        className="login-form"
        onFinish={onFinish}
      >
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
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" size="large" />
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
        <Input
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

          <a className="login-form-forgot" href="">
            Forgot password?
          </a>
        </StyledFlexAndSpaceBetween>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button" block loading={loading}>
          Login
        </Button>
      </Form.Item>
    </Form>
  </>
  )
}

export default LoginForm

const StyledFlexAndSpaceBetween = styled.div`
  display:flex;
  justify-content: space-between;
`

const StyledAlert = styled.div`
  margin-bottom: 24px
`