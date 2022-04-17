import React, { useContext } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import { Button } from 'antd'

const Products: React.FC = () => {
  const { currentUser, logout } = useContext(AuthContext)
  const handleButtonClick = () => {
    logout()
  }

  return (
    <>
      <Button onClick={()=> handleButtonClick()}>Logout</Button>
    </>
  )
}

export default Products
