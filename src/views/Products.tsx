import React from 'react'
import Navbar from '../components/navBar/NavBar'
import ProductsTable from '../components/table/ProductsTable'
import { useParams } from 'react-router-dom'

const Products: React.FC = () => {

  let { table_id } = useParams();

  return (
    <>
      <Navbar />
      <ProductsTable table_id={table_id!}/>
    </>
  )
}

export default Products
