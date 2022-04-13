import React, { useContext } from 'react'
import { Form, Input, Button } from 'antd'
import { AuthContext } from '../../contexts/AuthContext'

type values = {
  email: string
  password: string
  confirm: string
}

const RegisterForm: React.FC = () => {
  const [form] = Form.useForm();
  const { signup, user } = useContext(AuthContext)

  const onFinish = (values:values):void => {
    signup(values.email, values.password)
  };

  return (
    <Form form={form} onFinish={onFinish}>
      {user && user.email}
      <Form.Item
        name="email"
        label="E-mail"
        rules={[
          {
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input />
        </Form.Item>
        <Form.Item
        name="password"
        label="Password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>

      <Form.Item
        name="confirm"
        label="Confirm Password"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The two passwords that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  )
}

export default RegisterForm