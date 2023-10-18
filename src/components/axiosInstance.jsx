'use client'
import axios from "axios"

const axiosInstance = axios.create({
    baseURL: `${process.env.NEXT_PUBLIC_BACK_END}/api/v1`
})

export default axiosInstance