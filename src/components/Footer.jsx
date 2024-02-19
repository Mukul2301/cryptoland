import React from "react";
import { Link } from "react-router-dom";
import { Space, Typography } from "antd";

const { Title } = Typography;

const Footer = () => {
  return (
    <div className="footer">
      <Title level={5} style={{ color: "white", textAlign: "center" }}>
        <p>&copy; 2024 CryptoLand. All rights reserved.</p>
        <p>Made with ❤️ by Mukul</p>
      </Title>
      <Space>
        <Link to="/">Home</Link> |
        <Link to="/cryptocurrencies">Cryptocurrencies</Link> |
        <Link to="/news">News</Link>
      </Space>
    </div>
  );
};

export default Footer;
