import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  customFetchBasically,
  convenientFetchBasically,
  convenientIdFetchBasically,
} from '@/utils/customFetch'
import { PRODUCT_URL } from '@/utils/constants'
import { customFetch } from '@/utils/customFetch'

import { static_ID_Data } from '@/utils/constants'

export const useProduct = (id: number) => {
  const fetchAPI = false

  if (!fetchAPI) {
    return static_ID_Data
  }
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await customFetch(`${PRODUCT_URL}/${id}`)

      if (error) {
        return static_ID_Data
      }
      return data
    },
    enabled: !!id, // Ensure the query runs only if id is available
  })
}

export const useProducts = (id: number) => {
  const fetchAPI = false

  if (!fetchAPI) {
    return static_ID_Data
  }
  return useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await customFetch(`${PRODUCT_URL}/${id}`)

      if (error) {
        return static_ID_Data
      }
      return data
    },
    enabled: !!id, // Ensure the query runs only if id is available
  })
}
