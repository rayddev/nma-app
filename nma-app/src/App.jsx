import "./App.css";
import WelcomePage from "./Components/WelcomePage";
import HomePage from "./Components/HomePage";
import CartPage from "./Components/CartPage";
import { Routes, Route } from "react-router";

function App() {
  const products = [
    { id: 1, name: "Flour", price: 25.5, image: "/src/assets/Flour.jpeg" },
    { id: 2, name: "Maize", price: 15.75, image: "/src/assets/Maize.jpeg" },
    { id: 3, name: "Rice", price: 30.0, image: "/src/assets/Rice.jpeg" },
    { id: 4, name: "Salt", price: 5.25, image: "/src/assets/Salt.jpeg" },
    { id: 5, name: "Sugar", price: 20.99, image: "/src/assets/Sugar.jpeg" },
  ];

  return (
    <>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/welcomepage" element={<WelcomePage />} />
        <Route path="/homepage" element={<HomePage products={products} />} />
        <Route path="/cartpage" element={<CartPage />} />
      </Routes>
    </>
  );
}

export default App;
