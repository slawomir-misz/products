import React from 'react';
import Navbar from '../components/navBar/NavBar';
import ProductsTable from '../components/table/ProductsTable';

const Products: React.FC = () => (
  <>
    <Navbar />
    <ProductsTable />
  </>
);

export default Products;
