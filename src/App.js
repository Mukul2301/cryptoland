import { Layout } from "antd";
import {
  Navbar,
  Homepage,
  Cryptocurrencies,
  Details,
  News,
} from "./components/paths";
import "./App.css";
import "antd/dist/antd";
import { Route, Routes } from "react-router-dom";
import Footer from "./components/Footer";

function App() {
  return (
    <div className="App">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path="/" element={<Homepage />} />
              <Route path="/cryptocurrencies" element={<Cryptocurrencies />} />
              <Route path="/crypto/:coinId" element={<Details />} />
              <Route path="/news" element={<News />} />
            </Routes>
          </div>
        </Layout>
        <Footer />
      </div>
    </div>
  );
}

export default App;
