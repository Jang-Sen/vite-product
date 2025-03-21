import {ProductInput} from "../types/product.types.ts";
import {AxiosResponse} from "axios";
import {client} from "../api/client.ts";
import {UseBaseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

const updateProduct = async (productId: string, productInput: ProductInput): Promise<AxiosResponse<ProductInput, any>> => {
    return client.put<ProductInput>(`/product/${productId}`, productInput)
}

export const useUpdateProduct = (productId: string): UseBaseMutationResult<AxiosResponse<ProductInput, any>, unknown, ProductInput, unknown> => {
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    return useMutation({
        mutationFn: (productInput: ProductInput) => updateProduct(productId, productInput),
        onSuccess: () => {
            alert('수정 완료');
            queryClient.invalidateQueries(['products']);

            navigate(-1);
        },
        onError: (error) => {
            console.error('Error: ', error)
        }
    })
}