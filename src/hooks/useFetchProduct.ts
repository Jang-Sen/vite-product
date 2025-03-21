import {AxiosResponse} from "axios";
import {client} from "../api/client.ts";
import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {ProductItem} from "../types/product.types.ts";

const fetchProduct = async (productId: string): Promise<AxiosResponse<ProductItem, any>> => {
    return await client.get<ProductItem>(`/product/${productId}`)
}

export const useFetchProduct = (productId: string): QueryObserverResult<ProductItem, any> => {
    return useQuery<ProductItem, any>({
        queryKey: ['product', productId],
        queryFn: async () => {
            const {data} = await fetchProduct(productId);

            return data.body;
        }
    })
}