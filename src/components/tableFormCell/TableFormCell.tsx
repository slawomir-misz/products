import React, { useState, useContext } from "react";
import { InputNumber, Form, Input, Button } from "antd";
import { Product } from "../../ts/types";
import { updateDoc, doc } from "firebase/firestore";
import { firestore } from "../../firebase-config";
import { ProductsContext } from "../../contexts/ProductsContext";

interface TableFormCellInterface {
  record: Product;
  table_id: string;
}

const TableFormCell: React.FC<TableFormCellInterface> = ({
  record,
  table_id,
}) => {
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { products, setProducts } = useContext(ProductsContext);

  const onFinish = (values: any) => {

    setLoading(true);

    const lastOrderInputValue = parseFloat(values[record.key].replace(/,/g, '.'));
    const productsCollection = doc(firestore, table_id, record.key);

    updateDoc(productsCollection, {
      last_order: lastOrderInputValue,
      total_order: record.total_order + lastOrderInputValue,
      left: record.left - lastOrderInputValue,
    })
      .then(() => {

        const index = products.findIndex((object) => object.key === record.key);
        let tmpArray = [...products];
        tmpArray[index] = {
          ...tmpArray[index],
          total_order: record.total_order + lastOrderInputValue,
          left: record.left - lastOrderInputValue,
        };

        setProducts(tmpArray);
        setLoading(false);

      })
      .catch(() => {});

    setDisabled(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(/^[0-9]+$/.test(e.target.value))
      setDisabled(false)
    else
      setDisabled(true)
  }

  return (
    <Form onFinish={onFinish}>
      <Input.Group compact>
        <Form.Item
          name={record.key}
          initialValue={record.last_order}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              pattern: new RegExp(
                /^[0-9]+([\,\.][0-9]+)?$/
              ),
              message: "Wrong value"
            }
          ]}
        >
          <Input
            onChange={(e) => handleInputChange(e)}
            style={{ maxWidth: 83 }}
          />
        </Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          disabled={disabled}
          loading={loading}
          style={{ width: 83, marginLeft: -1 }}
        >
          Save
        </Button>
      </Input.Group>
    </Form>
  );
};

export default TableFormCell;
