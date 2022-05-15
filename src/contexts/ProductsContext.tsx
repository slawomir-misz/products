import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { firestore } from '../firebase-config';
import { Product } from '../ts/types';

interface IAuthContext {
  products: Array<Product>;
  setProducts: any;
  loading: boolean;
}

const initialContextValues = {
  products: [],
  setProducts: null,
  loading: true,
};

export const ProductsContext = React.createContext<IAuthContext>(initialContextValues);

export const ProductsProvider = ({ children }: { children: React.ReactChild }) => {
  const [products, setProducts] = useState<Array<Product>>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { tableId } = useParams();

  const getData = () => {
    setLoading(true);
    getDocs(collection(firestore, tableId!))
      .then((response) => {
        const tmpProductsArray: Product[] = [];
        response.forEach((doc) => {
          const object: Product = {
            id: doc.id,
            name: doc.data().name,
            quantity: doc.data().quantity,
            total_order: doc.data().total_order,
            last_order: doc.data().last_order,
            type: doc.data().type,
            left: doc.data().quantity - doc.data().total_order,
          };
          tmpProductsArray.push(object);
        });
        setProducts(tmpProductsArray);
        setLoading(false);
      })
      .catch(() => { });
  };
  useEffect(() => {
    getData();
  }, [tableId]);

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <ProductsContext.Provider value={{ products, loading, setProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
