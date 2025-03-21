import {ProductInput} from "../types/product.types.ts";
import {AxiosResponse} from "axios";
import {client} from "../api/client.ts";
import {UseBaseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

const createProduct = async (productInput: ProductInput): Promise<AxiosResponse<ProductInput, any>> => {
    return await client.post<ProductInput>('/product/new', productInput)
}

export const useCreateProduct = (): UseBaseMutationResult<AxiosResponse<ProductInput, any>, unknown, ProductInput, unknown> => {
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    return useMutation({
        mutationFn: (productInput: ProductInput) => createProduct(productInput),
        onSuccess: () => {
            alert('생성 성공');
            queryClient.invalidateQueries(['products']);

            navigate('/product');
        },
        onError: (error: Error) => {
            console.error('Error: ', error)
        }

    })
}