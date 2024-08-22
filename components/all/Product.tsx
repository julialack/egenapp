import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native'
import React from 'react'
import { Link, useSegments } from 'expo-router'
import { useNavigation } from '@react-navigation/native'
export default function Product({ item }: any) {
  const segments = useSegments()
  console.log(segments[0])
  const { id, attributes } = item
  const { title, price, image } = attributes

  return (
    <>
      <View style={styles.card}>
        <TouchableOpacity style={styles.cardTouchable}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.price}>${price}</Text>
          </View>
        </TouchableOpacity>
        <Link
          href={`/${segments[0]}/(home)/${id}`}
          style={styles.editButton}
          asChild
          onPress={() => {
            console.log('Navigating to:', `/${segments[0]}/(home)/${id}`)
          }}
        >
          <Text style={styles.buttonText}>detail</Text>
        </Link>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardTouchable: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 16,
    alignItems: 'center',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 16,
    color: '#666',
  },
  editButton: {
    padding: 16,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  noProductsText: {
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
  },
  debugText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginVertical: 10,
  },
})
