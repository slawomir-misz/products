import React, { useState, useContext } from "react";
import { Table, Input } from "antd";
import TableFormCell from "../tableFormCell/TableFormCell";
import { ProductsContext } from "../../contexts/ProductsContext";
import { Product } from "../../ts/types";
import { useParams } from "react-router-dom";

const ProductsTable: React.FC = () => {
  let { table_id } = useParams();
  const { products, loading } = useContext(ProductsContext);
  const [searchInput, setSearchInput] = useState<string>("")
  const [filteredProducts, setFilteredProducts] = useState<Array<Product>>([])

  const handleInputChange = (value:string) => {
    setSearchInput(value.toLowerCase())
    const filterProducts = products.filter(item => item.key.toLowerCase().includes(searchInput))
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
        <TableFormCell record={record} key={record.key} table_id={table_id!} />
      ),
    },
  ];


  return (
    <>
      <Input.Search
        allowClear
        placeholder="Search product"
        style={{ padding: "2rem" }}
        onChange={(e)=> handleInputChange(e.target.value)}
      />
      <Table
        size="small"
        columns={columns}
        dataSource={searchInput ? filteredProducts : products}
        loading={loading}
      />
    </>
  );
};

export default ProductsTable;
