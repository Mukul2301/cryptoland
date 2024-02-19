import React, { useState } from "react";
import millify from "millify";
import { Link } from "react-router-dom";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Card, Col, Input, Row, Spin, Typography } from "antd";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 12 : 100;
  const { data: cryptoList = {}, isLoading } = useGetCryptosQuery(count);
  const [input, setInput] = useState("");

  const filteredCryptos = cryptoList?.data?.coins.filter((crypto) =>
    crypto.name.toLowerCase().includes(input.toLowerCase())
  );

  if (isLoading) return <Spin size="large" fullscreen />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            className="input"
            placeholder="Search Crypto"
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      )}

      <Row className="crypto-card-container" gutter={[32, 32]}>
        {filteredCryptos.map((token) => (
          <Col className="crypto-card" xs={24} sm={12} lg={6} key={token.id}>
            <Link to={`/crypto/${token.uuid}`}>
              <Card
                title={`${token.rank}. ${token.name}`}
                hoverable
                extra={<img className="crypto-image" src={token.iconUrl} />}
              >
                <p>Price: {millify(token.price)}</p>
                <p>Market Cap: {millify(token.marketCap)}</p>
                <p>Daily Change: {millify(token.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <Typography.Title className="show-more" level={2}>
        <Link to={"/cryptocurrencies"}>show more...</Link>
      </Typography.Title>
    </>
  );
};

export default Cryptocurrencies;
