import "./App.css";
import axios from "axios";
import { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  const getData = async () => {
    const result = await axios.get("http://localhost:4001/products");
    setData(result.data.data);
  };
  const deleteData = async (dataID) => {
    await axios.delete(`http://localhost:4001/products/${dataID}`);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="App">
      <div className="app-wrapper">
        <h1 className="app-title">Products</h1>
      </div>
      <div className="product-list">
        {data.map((item, index) => (
          <div className="product" key={index}>
            <div className="product-preview">
              <img
                src={item?.image}
                alt={`${item?.name} product`}
                width="350"
                height="350"
              />
            </div>
            <div className="product-detail">
              <h1>Product name: {item?.name}</h1>
              <h2>Product price: {item?.price} Baht</h2>
              <p>Product description: {item?.description}</p>
            </div>

            <button
              className="delete-button"
              onClick={() => {
                setData(data.toSpliced(index, 1));
                deleteData(item?.id);
              }}
            >
              x
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
