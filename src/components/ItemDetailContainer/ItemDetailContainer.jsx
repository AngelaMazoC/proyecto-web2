import React, { useState, useEffect } from 'react'
import { getSingleItem } from '../../services/databaseProducts';
import { useParams } from 'react-router-dom';

function ItemDetailContainer() {
    const [product, setProduct] = useState([]);
    let { itemId } = useParams();

    useEffect(() => {
        getSingleItem(itemId)
            .then((respuesta) => {
                setProduct(respuesta);
            })
            .catch((error) => alert(`Error: ${error}`));
    }, []);
    return (
        <div className='Detail__Content'>
            <div className='Detail__Item--img'>
                <img src={product.imgurl} alt="" />
            </div>
            <div className='Detail__Item--info'>
                <div>Marca: {product.marca}</div>
                <span>{product.detail}</span>
            </div>

        </div>
    )
}

export default ItemDetailContainer