import React from 'react';
import {useFetchProducts} from "../hooks/useFetchProductList.ts";
import {Link} from "react-router-dom";

const ProductList: React.FC = () => {
    const {data: products, isLoading, isError, error} = useFetchProducts();

    return (
        <div>
            {products?.map((product, index) => (
                <Link key={index} to={`/product/${product.id}`}>
                    <div>
                        <h1>{product.name}</h1>
                        <p>{product.price}</p>
                        <p>{product.description}</p>
                    </div>
                </Link>
            ))}
            <Link to={'/product/new'}>

                <button>
                    생성하기
                </button>
            </Link>
        </div>
    );
};

export default ProductList;