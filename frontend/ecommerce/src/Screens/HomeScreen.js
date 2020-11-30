import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function HomeScreen (props) {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/products");
            setProducts(data);
        }
        fetchData();
        return () => {};
    }, [])

    return  <ul class="products">
    {
        products.map(product => 
        <li key={product._id}>
        <div class="product">
            <Link to={'/product/'+ product._id}>
                 <img class="product-image" src={product.image} alt=""/>
            </Link>
            <div class="product-name">
                <Link to={'/product/' + product._id}>{product.name}</Link>
            </div>
        <div class="product-brand">{product.brand}</div>
        <div class="product-quantity">Quantidade em estoque: {product.quantity} un.</div>
        <div class="product-price">R$ {product.price}</div>
        </div>
    </li>)
    }
   
</ul>
}

export default HomeScreen;