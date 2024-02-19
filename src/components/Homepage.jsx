import React from "react";
import millify from "millify";
import { useGetCryptosQuery } from "../services/cryptoApi";
import { Col, Row, Spin, Statistic, Typography } from "antd";
import { Link } from "react-router-dom";
import Cryptocurrencies from "./Cryptocurrencies";
import News from "./News";

const { Title } = Typography;

const Homepage = () => {
  const { data, isFetching } = useGetCryptosQuery(12);

  const globalStats = data?.data?.stats;
  if (isFetching) return <Spin size="large" fullscreen />;

  return (
    <div section="home">
      <Title level={2} className="heading">
        Global Cryptocurrency Statistics
      </Title>
      <Row>
        <Col span={12}>
          <Statistic title="Total Crypto" value={globalStats.total} />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Exchanges"
            value={millify(globalStats.totalExchanges)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={millify(globalStats.totalMarketCap)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total 24 Vol"
            value={millify(globalStats.total24hVolume)}
          />
        </Col>
        <Col span={12}>
          <Statistic
            title="Total Markets"
            value={millify(globalStats.totalMarkets)}
          />
        </Col>
      </Row>
      <div className="home-heading-container">
        <Title className="home-title" level={2}>
          Top 12 Cryptocurrencies
        </Title>
      </div>
      <Cryptocurrencies simplified />
      <div className="home-heading-container">
        <Title className="home-title" level={2}>
          Trending Stories
        </Title>
        <Title className="show-more" level={2}>
          <Link to={"/news"}>show more...</Link>
        </Title>
      </div>
      <News simplified showTitle />
    </div>
  );
};

export default Homepage;
