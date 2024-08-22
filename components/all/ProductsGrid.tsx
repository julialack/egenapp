import React, { useEffect } from 'react'
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  // TouchableOpacity,
  // Image,
  // ScrollView,
} from 'react-native'

import Product from './Product'

const ProductGrid = ({ items }: any) => {
  // Debugging output
  // const renderProduct = ({ item }: any) => {
  //   const { id, attributes } = item
  //   const { title, price, image } = attributes

  //   return (
  //     <View style={styles.card}>
  //       <TouchableOpacity style={styles.cardTouchable}>
  //         <Image source={{ uri: image }} style={styles.image} />
  //         <View style={styles.cardBody}>
  //           <Text style={styles.cardTitle}>{title}</Text>
  //           <Text style={styles.price}>${price}</Text>
  //         </View>
  //       </TouchableOpacity>

  //       <TouchableOpacity style={styles.editButton}>
  //         <Link href={`/${segments[0]}/(home)/${id}`}>
  //           <Text style={styles.buttonText}>detail</Text>
  //         </Link>
  //       </TouchableOpacity>
  //     </View>
  //   )
  // }

  return (
    <View style={styles.container}>
      {items ? (
        <FlatList
          data={items}
          renderItem={({ item }) => <Product item={item} />}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // Adjust number of columns as needed
        />
      ) : (
        <Text>No products available</Text>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 12,
  },
  list: {
    justifyContent: 'space-between',
  },
  //////
  // card: {
  //   flex: 1,
  //   margin: 4,
  //   backgroundColor: '#fff',
  //   borderRadius: 10,
  //   overflow: 'hidden',
  //   shadowColor: '#000',
  //   shadowOpacity: 0.1,
  //   shadowRadius: 10,
  //   shadowOffset: { width: 0, height: 2 },
  //   elevation: 2,
  // },
  // cardTouchable: {
  //   flex: 1,
  // },
  // image: {
  //   width: '100%',
  //   height: 150,
  //   resizeMode: 'cover',
  // },
  // cardBody: {
  //   padding: 16,
  //   alignItems: 'center',
  // },
  // cardTitle: {
  //   fontSize: 18,
  //   fontWeight: 'bold',
  //   marginBottom: 8,
  // },
  // price: {
  //   fontSize: 16,
  //   color: '#666',
  // },
  // editButton: {
  //   padding: 16,
  //   backgroundColor: '#007bff',
  //   alignItems: 'center',
  // },
  // buttonText: {
  //   color: '#fff',
  //   fontSize: 16,
  // },
  // noProductsText: {
  //   fontSize: 18,
  //   marginTop: 16,
  //   textAlign: 'center',
  // },
  // debugText: {
  //   fontSize: 16,
  //   color: 'red',
  //   textAlign: 'center',
  //   marginVertical: 10,
  // },
})

export default ProductGrid
