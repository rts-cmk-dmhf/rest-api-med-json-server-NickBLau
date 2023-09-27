import axios from "axios";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/products?_sort=id&_order=desc")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const create = async (product) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/products",
        product
      );
      console.log(response.data);

      const updatedProducts = await axios.get(
        "http://localhost:3000/products?_sort=&_order=desc"
      );
      setProducts(updatedProducts.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCreate = () => {
    const newProduct = {
      name: "Product",
      description: "Lorem",
    };
    create(newProduct);
  };

  const handleDelete = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/products/${productId}`
      );
      console.log(response.data);

      const updatedProducts = await axios.get(
        "http://localhost:3000/products?_sort=&_order=desc"
      );
      setProducts(updatedProducts.data);
    } catch (error) {
      console.error(error);
    }
  };

  const edit = async (product) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/products/${product.id}`,
        product
      );
      console.log(response.data);

      const updatedProducts = await axios.get(
        "http://localhost:3000/products?_sort=&_order=desc"
      );
      setProducts(updatedProducts.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = (productId, updatedProduct) => {
    const editProduct = {
      id: productId,
      name: "EditProduct",
      description: "EditLorem",
    };
    edit(editProduct);
  };

  return (
    <>
      <button onClick={handleCreate}>Create New</button>
      {products.map((product) => (
        <div className="ProductCard" key={product.id}>
          <p>#{product.id}</p>
          <p>{product.name}</p>
          <p>{product.price}</p>
          <p>{product.weight}</p>
          <p>{product.description}</p>
          <div>
            <button onClick={() => handleDelete(product.id)}>
              delete item
            </button>
            <button onClick={() => handleEdit(product.id, product)}>
              edit item
            </button>
          </div>
        </div>
      ))}
    </>
  );
}

export default App;
