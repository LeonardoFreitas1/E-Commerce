import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {removeFromCart, addToCart} from '../actions/cartActions';

function CartScreen(props){

    const cart = useSelector(state => state.cart); 

    const { cartItems } = cart;

    const productId = props.match.params.id;
    const qtde = props.location.search? Number(props.location.search.split("=")[1]):1;
    const dispatch = useDispatch();


    const removeFromCartHandler = (productId) => {
        dispatch(removeFromCart(productId));
    }

    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId, qtde));
        }
    }, []);


const checkoutHandler = () => {
    props.history.push("/signing?redirect=shipping")
}

    return <div className="cart">
        <div className="cart-list">
            <ul className="cart-list-container">
            <li>
                <h3>
                    Carrinho de Compras
                </h3>
                <div>
                    Preço
                </div>
            </li>
            {
                cartItems.length === 0?
                <div>
                    Carrinho está vazio
                </div>
                :
                cartItems.map(item => 
                    <li>
                        <div className="cart-image">
                            <img src={item.image} alt="product" />
                        </div>
                      <div className="cart-name">
                          <div>
                              <Link to={"/product/" + item.product }>{item.name}</Link>
                          </div>
                          <div>
                              Qtde:
                              <select value={item.qtde} onChange={(e) => dispatch(addToCart(item.product, e.target.value))}>
                                 {[...Array(item.countInStock).keys()].map(x => 
                                        <option key={x+1} value={ x + 1 }>{ x + 1 }</option>
                                )}
                              </select>
                              <button type="button" className="button" onClick={() => removeFromCartHandler (item.product)}>
                                  Excluir
                              </button>
                          </div>
                        </div>  
                        <div className="cart-price">
                            {item.price}
                        </div>  
                
                    </li>
                    )
            }
            </ul>
        </div>
        <div className="cart-action">
            <h3>
                Subtotal ( { cartItems.reduce((a,c) => a + c.qtde,0)} itens)
                :
                R$ {cartItems.reduce((a,c) => a + c.price * c.qtde, 0)}
            </h3>
            <button onClick={checkoutHandler} className="button primary full-width" disabled={cartItems.length === 0}>
                Confirmar Pagamento
            </button>
        </div>
    </div>
}

export default CartScreen;