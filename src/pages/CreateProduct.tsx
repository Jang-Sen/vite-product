import React from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {ProductInput} from "../types/product.types.ts";
import {useCreateProduct} from "../hooks/useCreateProduct.ts";

const CreateProduct: React.FC = () => {
    const {register, handleSubmit, watch, formState: {errors}, setValue} = useForm<ProductInput>()

    const {mutate} = useCreateProduct()

    // 파일 선택 핸들러
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;

        const fileArray = Array.from(files);
        setValue("productImg", fileArray);
    };

    const submitHandler: SubmitHandler<ProductInput> = (data) => {
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('price', data.price.toString());
        formData.append('description', data.description);
        formData.append('category', data.category);

        data.productImg.forEach((file) => {
            formData.append('imgs', file)
        })

        // ✅ FormData 내부 값 출력 (방법 1: `entries()`)
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        mutate(formData);

    }

    return (
        <div>
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
                <input
                    type={'file'}
                    placeholder='사진'
                    accept="image/*"
                    multiple
                    onChange={handleFileChange}
                />

                <button type={"submit"}>
                    제품 생성
                </button>
            </form>

        </div>
    );
};

export default CreateProduct;