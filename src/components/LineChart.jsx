import React from "react";
import Chart from "react-google-charts";
import { Col, Row, Spin, Typography } from "antd";

const { Title } = Typography;

const LineChart = ({ coinHistory, currentPrice, coinName }) => {
  const coinData = coinHistory?.data?.history.map((entry) => {
    return [new Date(entry.timestamp).getTime(), parseFloat(entry.price)];
  });
  if (!coinData) return <Spin />;

  const data = [["Date", "Price In USD"], ...coinData];

  const options = {
    title: `${coinName} Price Chart`,
    legend: { position: "top" },
    hAxis: { title: "Date" },
    vAxis: { title: "Price In USD" },
    backgroundColor: "#f5f5f5",
    borderColor: "#0071bd",
  };
  const change = Number(coinHistory?.data?.change) > 0;
  return (
    <div>
      <Row className="chart-header">
        <Col className="price-container">
          <Title className="current-price" level={4}>
            <p>
              Current {coinName} Price: {currentPrice}$
            </p>
          </Title>
          <Title
            type={change ? "success" : "danger"}
            className="price-change"
            level={4}
          >
            <p> Price Change: {coinHistory?.data?.change}% </p>
          </Title>
        </Col>
      </Row>
      <Chart
        chartType="LineChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    </div>
  );
};

export default LineChart;
