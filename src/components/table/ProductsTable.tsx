import React, { useContext } from "react";
import { Table } from "antd";
import TableFormCell from "../tableFormCell/TableFormCell";
import { ProductsContext } from "../../contexts/ProductsContext"
import { Product } from '../../ts/types'
import { useParams } from "react-router-dom";
const ProductsTable: React.FC = () => {

  let { table_id } = useParams();

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
      render: (text:string, record: Product) => (
        <TableFormCell record={record} key={record.key} table_id={table_id!}/>
      ),
    },
  ];

  const { products, loading } = useContext(ProductsContext)

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={products}
      loading={loading}
    />
  );
};

export default ProductsTable;
