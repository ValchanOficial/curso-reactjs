import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import api from '../../services/api';
import './styles.css';

export default function Product(props) {
    const [loading, setLoading] = React.useState(false);
    const [product, setProduct] = useState({});

    const history = useHistory();

    useEffect(()  => {
        const findProduct = async (props) => {
            setLoading(true);
            const {id} = props.match.params;
            const response = await api.get(`/products/${id}`);
            const product = await response.data;
            setProduct(product);
            setLoading(false);
        }
        findProduct(props);
    }, [props]);

    const handleBack = () => {
        history.push("/");
    }

    return (
        <div className="product-info">
            {loading && (
                <div className="loader">
                    <i className="fas fa-spinner fa-pulse"></i>
                </div>
            )}
            {!loading && ( 
                <>
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <p>URL: <a href={product.url} target="_blank" rel="noopener noreferrer">{product.url}</a></p>
                </>
            )}
            <button onClick={handleBack}>Back</button>
        </div>
    );
}