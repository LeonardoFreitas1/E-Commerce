import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { detailsProduct } from '../actions/productActions';

function ProductScreen (props) {
    
    const [qtde, setQtde] = useState(1);
    const productDetails = useSelector(state => state.productDetails);
    const { products: product, loading, error } = productDetails;
    const dispatch = useDispatch();

    useEffect(() => {	    
        dispatch(detailsProduct(props.match.params._id));	
        return () => { };	
    }, []);
    
    const handleAddToCart = () => {
        props.history.push("/cart/" + props.match.params._id + "?qtde = " + qtde)
    }

    return <div>
        <div className="back-to-result">
            <Link to="/">Voltar para página principal</Link>
        </div>
        {loading ? <div>Carregando...</div> :
          error ? <div>{error} </div> : 
            (
            <div className="details">
                    <div className="details-image"> 
                        <img src={product.file_url} alt="product"></img>
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