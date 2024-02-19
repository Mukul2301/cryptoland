import React from "react";
import { useGetNewsQuery } from "../services/newsApi";
import { Card, Col, Row, Spin, Typography } from "antd";

const { Title } = Typography;

const News = ({ simplified, showTitle }) => {
  const demoImage =
    "https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News";
  const { data: cryptoNews, isFetching, isError } = useGetNewsQuery();

  if (isFetching) return <Spin size="large" fullscreen />;
  if (isError) return <p>Failed to fetch news</p>;

  const filteredNews = simplified
    ? cryptoNews?.data?.slice(0, 12)
    : cryptoNews?.data;

  return (
    <div>
      {!showTitle && (
        <Title className="news-title" level={1}>
          All Cryptocurrency News
        </Title>
      )}
      <Row className="crypto-card-container" gutter={[24, 24]}>
        {filteredNews?.map((news, i) => (
          <Col xs={24} sm={12} lg={8} key={i}>
            <Card className="news-card" hoverable>
              <a href={news.url} target="_blank" rel="noopener noreferrer">
                <div className="news-image-container">
                  <Title className="news-title" level={4}>
                    {news.title}
                  </Title>
                  <img
                    style={{ maxWidth: "200px", maxHeight: "150px" }}
                    src={news?.thumbnail || demoImage}
                    alt={news.title}
                    height={150}
                    width={200}
                  />
                </div>
                <p className="newsPara">{news.description.substring(0, 100)}</p>
                <p>Created at: {news.createdAt.slice(0, 25)}</p>
              </a>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default News;
