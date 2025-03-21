import React from 'react';
import {useParams} from "react-router-dom";
import {useFetchProduct} from "../hooks/useFetchProduct.ts";

const ProductDetail: React.FC = () => {
    const {productId} = useParams();

    const {data: product, isLoading, isError, error} = useFetchProduct(productId);

    return (
        <div>
            <h1>{product?.name}</h1>
            <p>{product?.description}</p>
            <p>$ {product?.price}</p>
        </div>
    );
};

export default ProductDetail;