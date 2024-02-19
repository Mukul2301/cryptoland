import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Col, Row, Select, Space, Spin, Typography } from "antd";
import {
  useGetCoinHistoryQuery,
  useGetCryptoDetailsQuery,
} from "../services/cryptoApi";
import LineChart from "./LineChart";
import {
  CheckOutlined,
  DollarCircleOutlined,
  ExclamationCircleOutlined,
  FundOutlined,
  MoneyCollectOutlined,
  NumberOutlined,
  StopOutlined,
  ThunderboltOutlined,
  TrophyOutlined,
} from "@ant-design/icons";
import { Option } from "antd/es/mentions";

const { Title, Text } = Typography;

const Details = () => {
  const { coinId } = useParams();
  const { data: coinData, isFetching } = useGetCryptoDetailsQuery(coinId);
  const cryptoDetails = coinData?.data?.coin;
  const [timePeriod, setTimePeriod] = useState("7d");
  const { data: coinHistory } = useGetCoinHistoryQuery({ coinId, timePeriod });

  if (isFetching) return <Spin size="large" fullscreen />;

  const renderStats = (stats, title) => (
    <Col className="coin-value-statstics">
      <Col className="coin-value-statstics-heading">
        <Title className="coin-details-heading" level={3}>
          {title}
        </Title>
        <p>
          An overview showing the {title.toLowerCase()} of {cryptoDetails.name}
        </p>
      </Col>
      {stats.map(({ icon, title, value }) => (
        <Col className="coin-stats" key={title}>
          <Col className="coin-stats-name">
            <Text>{icon}</Text>
            <Text>{title}</Text>
          </Col>
          <Text className="stats">{value}</Text>
        </Col>
      ))}
    </Col>
  );

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${millify(cryptoDetails?.marketCap)}`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${millify(cryptoDetails?.allTimeHigh?.price)}`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${millify(cryptoDetails?.supply?.total)}`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${millify(cryptoDetails?.supply?.circulating)}`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title className="coin-name" level={2}>
          {cryptoDetails.name} {cryptoDetails.slug} Price
        </Title>
        <p style={{ fontSize: "20px" }}>
          {cryptoDetails.name} live price in dollars. <br />
          View Value, Statistics, Market cap and supply
        </p>
        <Select
          className="select-timeperiod"
          placeholder="select time period"
          defaultValue={"7d"}
          onChange={(value) => setTimePeriod(value)}
        >
          {time.map((date) => (
            <Option key={date}>{date}</Option>
          ))}
        </Select>
        <Space />
        <LineChart
          coinHistory={coinHistory}
          currentPrice={millify(cryptoDetails.price)}
          coinName={cryptoDetails.name}
        />
        <Row className="coin-stats-container" gutter={[32, 32]}>
          {renderStats(stats, "Value Statistics")}
          {renderStats(genericStats, "Other Statistics")}
        </Row>
      </Col>
      <Col className="coin-desc-link">
        <Row className="coin-dest">
          <Title className="coin-details-heading" level={3}>
            What is {cryptoDetails.name} ? <br />
            {HTMLReactParser(cryptoDetails.description)}
          </Title>
        </Row>
      </Col>
      <Col className="coin-links">
        <Title className="coin-details-heading" level={3}>
          {cryptoDetails.name} Links
        </Title>
        {cryptoDetails.links.map((link) => (
          <Row className="coin-link" key={link.name}>
            <Title level={5} className="link-name">
              {link.type}
            </Title>
            <a href={link.url} target="_blank" rel="noreferrer">
              {link.name}
            </a>
          </Row>
        ))}
      </Col>
    </Col>
  );
};

export default Details;
