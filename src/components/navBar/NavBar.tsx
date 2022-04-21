import React, { useContext }  from "react";
import { Menu, MenuProps, Button } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { AuthContext } from "../../contexts/AuthContext";

const Navbar: React.FC = () => {
  const { logout } = useContext(AuthContext)
  let { table_id } = useParams();

  const navigate = useNavigate();

  const handleButtonClick = () => {
    logout()
  }

  const items: MenuProps["items"] = [
    {
      label: "Table 1",
      key: "products_1",
      icon: "🍇 ",
      onClick: () => navigate("/products/products_1"),
    },
    {
      label: "Table 2",
      key: "products_2",
      icon: "🍉 ",
      onClick: () => navigate("/products/products_2"),
    },
    {
      label: "Table 3",
      key: "products_3",
      icon: "🍅 ",
      onClick: () => navigate("/products/products_3"),
    },
  ];

  return (
    <StyledContainer>
      <Menu
        selectedKeys={[table_id!]}
        mode="horizontal"
        items={items}
        style={{ border: 0, width: "100%" }}
      />
      <Button type="text" onClick={() => handleButtonClick()}>Logout</Button>
    </StyledContainer>
  );
};

export default Navbar;

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #f0f0f0;
`;
