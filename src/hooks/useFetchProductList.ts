import {AxiosResponse} from "axios";
import {client} from "../api/client.ts";
import {QueryObserverResult, useQuery} from "@tanstack/react-query";
import {ProductItem} from "../types/product.types.ts";

const fetchProducts = async (): Promise<AxiosResponse<ProductItem[], any>> => {
    return await client.get<ProductItem[]>('/product/all?sort=createdAt&order=ASC&page=1&take=30')
}

export const useFetchProducts = (): QueryObserverResult<ProductItem[], any> => {
    return useQuery<ProductItem[], any>({
        queryKey: ['products'],
        queryFn: async () => {
            const {data} = await fetchProducts();

            return data.body.data;
        },
    })
}