import {
  Button,
  Text,
  Image,
  StyleSheet,
  View,
  Animated,
  SafeAreaView,
} from 'react-native'
import { Link } from 'expo-router'
import React from 'react'
//import Filters from '@/components/all/Filters'
import {
  Filters,
  PaginationContainer,
  ProductsContainer,
} from '@/components/all'
import { useProductsQuery } from '@/hooks/useProductsQuery'
export default function HomeScreen() {
  const { data, error, isLoading } = useProductsQuery({})

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }
  //console.log(data, 'index.tsx')
  const scrollY = React.useRef(new Animated.Value(0)).current
  return (
    <SafeAreaView>
      <Animated.View
        style={{
          height: 200,
          transform: [{ translateY: Animated.multiply(scrollY, -0.5) }],
          zIndex: 10,
        }}
      >
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      </Animated.View>
      {/**<ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
       </ParallaxScrollView> */}
      <View style={styles.container}>
        <Link href='/(tabs)/(home)/1337'>
          <Text>to detail no product</Text>
        </Link>
        <Filters />
        <ProductsContainer data={data} />
        <PaginationContainer />
      </View>
    </SafeAreaView>
  )
}
//{pathname: '/(tabs)/(home)/1337', params:{Details:1337}}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
})
