// hooks/useProductsQuery.ts
import { useQuery } from '@tanstack/react-query'
import {
  customFetchBasically,
  convenientFetchBasically,
} from '@/utils/customFetch'
import { PRODUCT_URL } from '@/utils/constants'

interface QueryParams {
  search?: string
  category?: string
  company?: string
  sort?: string
  price?: number
  shipping?: boolean
  page?: number
}

const allProductsQuery = (queryParams: QueryParams) => {
  const { search, category, company, sort, price, shipping, page } = queryParams

  return {
    queryKey: [
      'products',
      search ?? '',
      category ?? 'all',
      company ?? 'all',
      sort ?? 'a-z',
      price ?? 100000,
      shipping ?? false,
      page ?? 1,
    ],
    queryFn: () =>
      'cpyJsonObj' === 'cpyJsonObj'
        ? convenientFetchBasically('whatever', { params: queryParams })
        : customFetchBasically(PRODUCT_URL, { params: queryParams }),
  }
}

const useProductsQuery = (queryParams: QueryParams) => {
  return useQuery(allProductsQuery(queryParams))
}

export { useProductsQuery }
