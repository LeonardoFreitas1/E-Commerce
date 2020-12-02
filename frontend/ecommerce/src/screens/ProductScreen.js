import React, { useEffect, useState } from 'react';
import data from '../data';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen (props) {
    const product = data.products.find
                        (x => x._id === props.match.params.id);
    const [qtde, setQtde] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { prod, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(detailsProduct(props.match.params.id));
        return () => { };
    }, []);

    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params.id + "?qtde = " + qtde)
    }

    return <div>
        <div className="back-to-result">
            <Link to="/">Voltar para página principal</Link>
        </div>
        {loading ? <div>Loading...</div> :
          error ? <div>{error} </div> : 
            (
            <div className="details">
                    <div className="details-image"> 
                        <img src={product.image} alt="product"></img>
                    </div>
                        <div className="details-info">
                            <ul>
                                <li>
                                    <h4>{product.name}</h4>
                                </li>
                                <li>
                                    Preço: <b>R$ {product.price}</b>
                                </li>
                                <li>
                                    <div>
                                        {product.description}
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="details-action">
                            <ul>
                                <li>
                                    Preço: R$ {product.price}
                                </li>
                                <li>
                                Status: {product.countInStock > 0 ? "Em estoque" : "Indisponível."}
                                </li>
                                <li>
                                    Qtde: <select value={qtde} onChange={(e) => {setQtde(e.target.value)}}>
                                        {[...Array(product.countInStock).keys()].map(x=>
                                            <option value={x + 1}>{x + 1}</option>
                                            )}
                                    </select>
                                </li>
                                <li>
                                {product.countInStock > 0 && <button onClick={handleAddToCart} className="button primary" >Adicionar ao Carrinho</button>}
                                </li>
                            </ul>
                        </div>
            </div>
            )
            }
        
    </div>
}

export default ProductScreen;