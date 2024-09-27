import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Component/Header";
import Home from "./Component/Home";
import Coins from "./Component/Coins";
import Exchange from "./Component/Exchange";
import CoinDetails from "./Component/CoinDetails";
import Footer from "./Component/Footer";
function App() {
  return (
    <Router>
      <Header />
      <Routes>


        <Route path="/" element={<Home/>} />
        <Route path="/coins" element={<Coins/>} />
        <Route path="/exchanges" element={<Exchange/>} />
        <Route path="/coin/:id" element={<CoinDetails/>} />
      </Routes>
      <Footer />

    </Router>
  );
}

export default App;
