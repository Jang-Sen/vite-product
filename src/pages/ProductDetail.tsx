import React, {useEffect} from 'react';
import {useParams} from "react-router-dom";
import {useFetchProduct} from "../hooks/useFetchProduct.ts";
import {useDeleteProduct} from "../hooks/useDeleteProduct.ts";
import {SubmitHandler, useForm} from "react-hook-form";
import {ProductInput} from "../types/product.types.ts";
import {useUpdateProduct} from "../hooks/useUpdateProduct.ts";

const ProductDetail: React.FC = () => {
    const {productId} = useParams();

    const {register, handleSubmit, watch, formState: {errors}, reset} = useForm<ProductInput>();

    const {data: product, isLoading, isError, error} = useFetchProduct(productId);

    const {mutate: deleteMutate} = useDeleteProduct();

    const {mutate: updateMutate} = useUpdateProduct(productId);

    useEffect(() => {
        if (product) {
            reset({
                name: product.name,
                price: product.price,
                description: product.description,
                category: product.category,
            })
        }
    }, [product, reset])

    const submitHandler: SubmitHandler<ProductInput> = (data) => {
        updateMutate(data);
    }

    return (
        <div>
            <h1>{product?.name}</h1>
            <p>{product?.description}</p>
            <p>$ {product?.price}</p>
            <button onClick={() => deleteMutate(productId)}>삭제</button>

            <form onSubmit={handleSubmit(submitHandler)}>

                <input
                    placeholder='이름'
                    {...register('name')}
                />
                <input
                    placeholder='가격'
                    {...register('price')}
                />
                <input placeholder='정보' {...register('description')} />
                <input placeholder='카테고리' {...register('category')} />

                <button type={"submit"}>
                    제품 수정
                </button>
            </form>

        </div>
    );
};

export default ProductDetail;