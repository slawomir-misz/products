import React, { useState, useContext } from "react";
import { Table, Input } from "antd";
import TableFormCell from "../tableFormCell/TableFormCell";
import { ProductsContext } from "../../contexts/ProductsContext";
import { Product } from "../../ts/types";
import { useParams } from "react-router-dom";
import styled from "styled-components"
import ButtonPDF from "../butttonPDF/ButtonPDF";

const ProductsTable: React.FC = () => {
  let { table_id } = useParams();
  const { products, loading } = useContext(ProductsContext);
  const [searchInput, setSearchInput] = useState<string>("")
  const [filteredProducts, setFilteredProducts] = useState<Array<Product>>([])

  const handleInputChange = (value:string) => {
    const filterProducts = products.filter(item => item.name.toLowerCase().includes(value.toLowerCase()))
    setSearchInput(value)
    setFilteredProducts(filterProducts)
  }

  const columns = [
    {
      title: "Produkt",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Szacowana Ilość",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Typ",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Zamówiono",
      dataIndex: "total_order",
      key: "total_order",
    },
    {
      title: "Pozostało",
      dataIndex: "left",
      key: "left",
    },
    {
      title: "Ostatnie zamówienie",
      dataIndex: "last_order",
      key: "last_order",
      render: (text: string, record: Product) => (
        <TableFormCell record={record} key={record.id} table_id={table_id!} />
      ),
    },
  ];


  return (
    <>
      <StyledContainer>
        <Input.Search
          allowClear
          placeholder="Search product"
          style={{ maxWidth: 500 }}
          onChange={(e)=> handleInputChange(e.target.value)}
        />
        <ButtonPDF products={products}/>
      </StyledContainer>
      <Table
        size="small"
        columns={columns}
        dataSource={searchInput ? filteredProducts : products}
        loading={loading}
        rowKey={record => record.id}
      />
    </>
  );
};

export default ProductsTable;

const StyledContainer = styled.div`
display: flex; 
justify-content: space-between; 
align-items: center;
padding: 1rem;
`
