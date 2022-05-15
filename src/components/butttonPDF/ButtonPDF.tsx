import React from 'react';
import { Button } from 'antd';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { Product } from '../../ts/types';
import { font } from '../../assets/font';

interface IButtonPDF {
  products: Array<Product>
}

const ButtonPDF: React.FC<IButtonPDF> = ({ products }) => {
  const handleButtonClick = () => {
    // eslint-disable-next-line new-cap
    const doc = new jsPDF();
    doc.addFileToVFS('arial-unicode-ms-normal.ttf', font);
    doc.addFont('arial-unicode-ms-normal.ttf', 'arial-unicode-ms', 'normal');
    doc.setFont('arial-unicode-ms');

    autoTable(doc, {
      styles: {
        font: 'arial-unicode-ms',
        lineWidth: 0.1,
        lineColor: [0, 0, 0],
        cellPadding: 1,
      },
      body: products,
      columns: [
        { header: 'Produkt', dataKey: 'name' },
        { header: 'Kg/Szt', dataKey: 'type' },
        { header: 'Szacowana ilość', dataKey: 'quantity' },
        { header: 'Zamówiono', dataKey: 'total_order' },
        { header: 'Pozostało', dataKey: 'left' },
        { header: 'Ost. zamówienie', dataKey: 'last_order' },
      ],
    });
    doc.save('a4.pdf');
  };

  return (
    <Button type="primary" onClick={handleButtonClick}>
      Download
    </Button>
  );
};

export default ButtonPDF;
