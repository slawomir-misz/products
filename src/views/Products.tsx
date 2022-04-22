import React from 'react'
import Navbar from '../components/navBar/NavBar'
import ProductsTable from '../components/table/ProductsTable'
import styled from 'styled-components'

const Products: React.FC = () => {

  return (
    <>
      <Navbar />
      <TableContainer>
        <ProductsTable/>
      </TableContainer>
    </>
  )
}

export default Products

const TableContainer = styled.div`
padding-top:2rem
`
