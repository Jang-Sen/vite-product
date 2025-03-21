import {AxiosResponse} from "axios";
import {client} from "../api/client.ts";
import {UseBaseMutationResult, useMutation, useQueryClient} from "@tanstack/react-query";
import {useNavigate} from "react-router-dom";

const deleteProduct = async (productId: string): Promise<AxiosResponse<any, any>> => {
    return client.delete<any>(`/product/${productId}`)
}

export const useDeleteProduct = (): UseBaseMutationResult<AxiosResponse<any, any>, unknown, any, unknown> => {
    const queryClient = useQueryClient();

    const navigate = useNavigate();

    return useMutation({
        mutationFn: (productId: string) => deleteProduct(productId),
        onSuccess: () => {
            alert('삭제 성공');
            queryClient.invalidateQueries(['products']);

            navigate(-1);
        },
        onError: (error: Error) => {
            console.error("Error: ", error);
        }
    })
}