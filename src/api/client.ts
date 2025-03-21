import axios from "axios";

export const client = axios.create({
    baseURL: 'http://localhost/api/v1',
    headers: {
        'Contents-Type': 'application/json',
    }
})