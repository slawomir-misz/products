import React, { useContext, useReducer, useState } from 'react'
import { Form, Input, Button, Checkbox } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components'
import { fadeInUp } from 'react-animations'
import IconLogo from '../iconLogo/IconLogo'
import ErrorPopUp from '../errorPopUp/ErrorPopUp';

const fadeInUpAnimation = keyframes`${fadeInUp}`;

type values = {
  username: string
  password: string
  remember: boolean
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

    login(values.username, values.password, values.remember)
    .then(()=>{
      setLoading(false)
      navigate('/products')
    })
    .catch((error:any)=>{
      setLoading(false)
      dispatchErrorState(error.code)
    })
  };



  return (
    <>
      {errorState.message ? 
        <ErrorPopUp message={errorState.message} dispatchErrorState={dispatchErrorState}/>
      : 
        <></> 
      }

      <StyledTitle>
        Products App
        [ <IconLogo /> ]
      </StyledTitle>

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
  top: -64px;
  width: 100%;
  position: absolute;
  animation: 1s ${fadeInUpAnimation}
  
`
const StyledTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center; 
  padding-bottom: 24px; 
  font-size: 35px;
`