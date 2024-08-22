import axios from 'axios'
export const convenientFetch = axios.create({
  baseURL: '/api/v1',
})

//;('products?featured=true')
const productionUrl = 'https://strapi-store-server.onrender.com/api/'

export const customFetch = axios.create({ baseURL: productionUrl })

export const customFetchBasically = async (url: string, options: any) => {
  const response = await customFetch.get(url, options)
  return response.data
}
import { static_Data } from '@/utils/constants'
import { static_ID_Data } from '@/utils/constants'

export const convenientFetchBasically = async (url: string, options: any) => {
  //const response = await axios.get(url, options)
  return static_Data
}

export const convenientIdFetchBasically = async (id: any) => {
  return static_ID_Data
}

export type ProductsList = {
  id: number
  attributes: {
    category: string
    company: string
    createdAt: string
    description: string
    featured: boolean
    image: string
    price: string
    publishedAt: string
    shipping: boolean
    title: string
    updatedAt: string
    colors: string[]
  }
}
