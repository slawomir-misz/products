import React, { useState, useEffect } from "react";
import { Table } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../firebase-config";

type Product = {
  key: string,
  name: string,
  quantity: number,
  total_order: number,
  last_order: number,
  type: string
}


interface ProductsTableProps {
  table_id: string;
}

const ProductsTable: React.FC<ProductsTableProps> = ({ table_id }) => {

const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Ordered",
      dataIndex: "total_order",
      key: "total_order",
    },
    {
      title: "Last Order",
      dataIndex: "last_order",
      key: "last_order",
    },
  ];


  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const getData = () => {
    setLoading(true);
    getDocs(collection(firestore, table_id))
      .then((response) => {
        let array :Product[] = []
        response.forEach((doc) => {

          let object:Product = {
            key: doc.id,
            name: doc.id,
            quantity: doc.data().quantity,
            total_order: doc.data().total_order,
            last_order: doc.data().last_order,
            type: doc.data().type
          }
          array.push(object)
        });
        setProducts(array)
        setLoading(false);
      })
      .catch((error) => {});
  };

  useEffect(() => {
    getData();
  }, [table_id]);

  return <Table columns={columns} dataSource={products} loading={loading}/>;
};

export default ProductsTable;
