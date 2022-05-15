import React, { useState, useContext } from 'react';
import { Form, Input, Button } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { updateDoc, doc } from 'firebase/firestore';
import { Product } from '../../ts/types';
import { firestore } from '../../firebase-config';
import { ProductsContext } from '../../contexts/ProductsContext';

interface TableFormCellInterface {
  record: Product;
  tableId: string;
}

type formValues = {
  [key: string]: string
}

const TableFormCell: React.FC<TableFormCellInterface> = ({ record, tableId }) => {
  const [form] = Form.useForm();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const { products, setProducts } = useContext(ProductsContext);

  const onFinish = (values: formValues) => {
    setLoading(true);

    const lastOrderInputValue = parseFloat(values[record.id].replace(/,/g, '.'));

    const productsCollection = doc(firestore, tableId, record.id);

    updateDoc(productsCollection, {
      last_order: lastOrderInputValue,
      total_order: record.total_order + lastOrderInputValue,
      left: record.left - lastOrderInputValue,
    })
      .then(() => {
        const index = products.findIndex((object) => object.id === record.id);
        const tmpArray = [...products];
        tmpArray[index] = {
          ...tmpArray[index],
          last_order: lastOrderInputValue,
          total_order: parseFloat((record.total_order + lastOrderInputValue).toFixed(2)),
          left: parseFloat((record.left - lastOrderInputValue).toFixed(2)),
        };

        setProducts(tmpArray);
        setLoading(false);
      })
      .catch(() => { });

    setDisabled(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (/^[0-9]+([,.][0-9]{1,2})?$/.test(e.target.value)) setDisabled(false);
    else setDisabled(true);
  };

  const handleReturnButtonClick = () => {
    form.setFieldsValue({ [record.id]: record.last_order });
    setDisabled(true);
  };

  return (
    <Form onFinish={onFinish} form={form}>
      <Input.Group compact>
        <Form.Item
          name={record.id}
          initialValue={record.last_order}
          style={{ margin: 0 }}
          rules={[
            {
              required: true,
              pattern: /^[0-9]+([,.][0-9]{1,2})?$/,
              message: 'Wrong value',
            },
          ]}
        >
          <Input
            onChange={(e) => handleInputChange(e)}
            style={{ maxWidth: 83 }}
            autoComplete="off"
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
        <Button block icon={<RollbackOutlined />} onClick={handleReturnButtonClick} style={!disabled ? { width: 35 } : { visibility: 'hidden', width: 35 }} />
      </Input.Group>
    </Form>
  );
};

export default TableFormCell;
