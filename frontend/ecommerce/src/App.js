import './index.css';
import React from 'react';
import {BrowserRouter, Link, Route} from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

function App() {

    const openMenu = () => {
        document.querySelector(".sidebar").classList.add("open");
    }

    const closeMenu = () => {
        document.querySelector(".sidebar").classList.remove("open");
    }

  return ( 
    <BrowserRouter>
    <div class="grid-container">
        <header class="header">
            <div class="brand">
                <button onClick={openMenu}>
                    &#9776;
                </button>
                <Link to="/">Shopping do Povo</Link>
            </div>
            <div class="header-links">
                <a href="pagamento.html">Pagamento</a>
            </div>          
        </header>
        <aside class="sidebar">
            <h3>Categorias de Produtos</h3>
            <button  class="sidebar-close-button" onClick={closeMenu}>x</button>
            <ul>
                <li>
                    <a href="index.html">PCs e Notebooks</a>
                </li>
                <li>
                    <a href="index.html">Periféricos</a>
                </li>
            </ul>
        </aside>
        <main class="main">
            <div class="content">
                <Route path="/product/:id" component={ProductScreen}/>
                <Route path="/cart/:id?" component={CartScreen}/>
                <Route path="/" exact={true} component={HomeScreen}/>             
            </div>
        </main>
        <footer class="footer">Todos os direitos reservados</footer>
    </div>
    </BrowserRouter>
  );
}

export default App;
