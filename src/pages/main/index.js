import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import './styles.css';

export default function Main() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = React.useState(false);
    const [productInfo, setProductInfo] = useState({});
    const [page, setPage] = useState(1);

    useEffect(() => {
        loadProducts(page);
    }, [page]);

    const loadProducts = async (page) => {
        await setLoading(true);
        const response = await api.get(`/products?page=${page}`)
        const { docs, ...productInfo } = await response.data;
        await setProducts(docs);
        await setProductInfo(productInfo);
        await setLoading(false);
    }

    const prevPage = async () => {
        if(page === 1) return;
        const prevPageValue = page - 1;
        await setPage(prevPageValue);
        await loadProducts(prevPageValue);
    }

    const nextPage = async () => {
        if(page === productInfo.pages) return;
        const nextPageValue = page + 1;
        await setPage(nextPageValue);
        await loadProducts(nextPageValue);
    }

    return (
        <div className="product-list">
        {loading && (
            <div className="loader">
                <i className="fas fa-spinner fa-pulse"></i>
            </div>
        )}
        {!loading && products.map(product => (
                <article key={product._id}>
                    <strong>{product.title}</strong>
                    <p>{product.description}</p>
                    <Link to={`/products/${product._id}`}>Acessar</Link>
                </article>
            ))}
            <div className="actions">
                <button disabled={page===1} onClick={prevPage} >Anterior</button>
                <p>Page: {page} of {productInfo.pages}</p>
                <button disabled={page===productInfo.pages} onClick={nextPage} >Próximo</button>
            </div>
        </div>
    );
}