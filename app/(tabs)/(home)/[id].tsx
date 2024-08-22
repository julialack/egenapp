import React from 'react'
import { Button, Text, Image, StyleSheet, View } from 'react-native'
import { useProduct } from '@/api/products'
import { useLocalSearchParams } from 'expo-router'

import Product from '@/components/all/Product'
const Details = () => {
  const { id: idString } = useLocalSearchParams()
  const id = idString
    ? parseFloat(typeof idString === 'string' ? idString : idString[0])
    : NaN
  console.log('details', id)
  const { data: product, error, isLoading } = useProduct(id)
  console.log('details', product)

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }

  if (!product?.data) {
    return (
      <View style={styles.container}>
        <Text>No product found</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.cardTitle}>Details</Text>
      <Product item={product.data} />
    </View>
  )
}

export default Details

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
    flex: 1,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
})
