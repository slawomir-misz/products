import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Button } from 'antd'

export default function Products() {
  const { currentUser, logout } = useContext(AuthContext)

  const handleButtonClick = () => {
    logout()
  }

  return (
    <Button onClick={()=> handleButtonClick()}>Logout</Button>
  )
}
