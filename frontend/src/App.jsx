import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';

const App = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App;