# Welcome to your Expo app 👋

## start up app

[connection-issue] https://docs.expo.dev/develop/development-builds/development-workflows/

## routing for user based application

### splash screen and route set up

#### share modal on screens

// if there is a database

- bookings
- checkout
- properties
- reviews
- rentals

//role based interessting

- favorites
- profile
  // want is favorited
- properties

[stack] https://docs.expo.dev/router/advanced/stack/

app/\_layout includ the routes. can push multiple screens. basic is the tabs
we get a theme provider aswell

\_layout.tsx

```tsx
<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
  <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}
  >
    <Stack.Screen name='(tabs)' options={{ headerShown: true }} />
    <Stack.Screen name='+not-found' />
  </Stack>
</ThemeProvider>
```

(tabs)/\_layout.tsx

- share model header on both tabs

```tsx
import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

import { Button } from 'react-native'
import { useLayoutEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  const navigation = useNavigation()
  const router = useRouter()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title='Modal' onPress={() => router.push('/Modal')} />
      ),
    })
  }, [navigation, router])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='(home)'
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='Profile'
        options={{
          title: 'profiles',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'code-slash' : 'code-slash-outline'}
              color={color}
            />
          ),
          headerRight: () => (
            <Button title='Modal' onPress={() => router.push('/Modal')} />
          ),
        }}
      />
    </Tabs>
  )
}
```

(tabs)/index.tsx

```tsx
export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    ></ParallaxScrollView>
  )
}
```

#### nested navigation

index.tsx

```tsx
import { Link } from 'expo-router'

return (
  <Link href='/(tabs)/(home)/1337'>
    <Text>to detail</Text>
  </Link>
)
////{pathname: '/(tabs)/(home)/1337', params:{Details:1337}}
```

[Details].tsx

```tsx
import React from 'react'
import { Button, Text, Image, StyleSheet, View } from 'react-native'

const Details = () => {
  return (
    <View>
      <Text>Details</Text>
    </View>
  )
}

export default Details
```

#### basic auth

(auth)\_layout.tsx

```tsx
import { Tabs } from 'expo-router'
import React from 'react'

import { TabBarIcon } from '@/components/navigation/TabBarIcon'
import { Colors } from '@/constants/Colors'
import { useColorScheme } from '@/hooks/useColorScheme'

import { Button } from 'react-native'
import { useLayoutEffect } from 'react'
import { useNavigation, useRouter } from 'expo-router'

export default function TabLayout() {
  const colorScheme = useColorScheme()

  const navigation = useNavigation()
  const router = useRouter()

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title='Modal' onPress={() => router.push('/Modal')} />
      ),
    })
  }, [navigation, router])

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name='Login'
        options={{
          title: 'Login',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'home' : 'home-outline'}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name='Register'
        options={{
          title: 'Register',
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? 'code-slash' : 'code-slash-outline'}
              color={color}
            />
          ),
          headerRight: () => (
            <Button title='Modal' onPress={() => router.push('/Modal')} />
          ),
        }}
      />
    </Tabs>
  )
}
```

context\auth.tsx

```tsx
import React, { useEffect, useState, createContext, useContext } from 'react'
import { useSegments, useRouter } from 'expo-router'
const AuthContext = createContext<AuthContextValue | null>(null)

//is exported!
export default function AuthProvider({ children }: React.PropsWithChildren) {
  const rootSegment = useSegments()[0] //want the app
  const router = useRouter()
  const [user, setUser] = useState<string | undefined>(undefined)

  useEffect(() => {
    // if (user === undefined) return

    if (!user && rootSegment !== '(auth)/Login') {
      router.replace('/(auth)/Login')
    } else if (user && rootSegment !== '(tabs)/(home)') {
      router.replace('/(tabs)/(home)')
    }
  }, [user, rootSegment])

  return (
    <AuthContext.Provider
      value={{
        user: user,
        signIn: () => {
          setUser('me')
        },
        signOut: () => {
          setUser(undefined)
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

interface AuthContextValue {
  user: string | undefined
  signIn: () => void
  signOut: () => void
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

app_layout.tsx

```tsx
import AuthProvider from '@/context/auth'

return <AuthProvider></AuthProvider>
```

#### add the screens

## i dunno look db. mb ignore (ignore)

## profile for the array with user is the most important (skip)

## search load \* times

### render items

#### flat list in ParallaxScrollView is erronouse

\_layout.tsx

- wrapp loading pages in state manager

```tsx
import AuthProvider from '@/context/auth'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()
```

- React Native components like FlatList expect to manage their own rendering lifecycle and scrolling behavior. Wrapping it with another scrolling component like ParallaxScrollView can confuse React Native's virtualization logic

- anyway i use

```sh
 npm install @tanstack/react-query @tanstack/react-query-devtools
 npm install axios
```

```tsx
export const signUrl = 'signs'
export const PRODUCT_URL = 'products'

export const static_Data = {
  data: [
    id: '...'
    attributes:''
        ...
  ]
    meta: {
      ...
    }
}
```

customFetch.tsx

- path to server and folder path (\* apis)

```tsx
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

export const convenientFetchBasically = async (url: string, options: any) => {
  //const response = await axios.get(url, options)
  return static_Data
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
```

- call filter array multiple times, when param change
- hook with loading, data, error fetch state managment

```tsx
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
```

(tabs)\(home)\index.tsx

- import components to be rendered to manipulate the array
- the data is to be rendered

- not the parallax view will be problematic (scroll behavior)

```tsx
import { ..., View } from 'react-native'

//import Filters from '@/components/all/Filters'
import { Filters, ProductsContainer } from '@/components/all'
import { useProductsQuery } from '@/hooks/useProductsQuery'

export default function HomeScreen() {
  const { data, error, isLoading } = useProductsQuery({})

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (error) {
    return <Text>Error: {error.message}</Text>
  }
  console.log(data, 'index.tsx')
  ...

   return (
    <ParallaxScrollView ... >
    ...
      <View style={styles.container}>
        <Link href='/(tabs)/(home)/1337'>
          <Text>to detail</Text>
        </Link>
        <Filters />
        <ProductsContainer data={data} />
                <PaginationContainer/>

      </View>
    </ParallaxScrollView>
)
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'gray',
  },
})
```

ProductsContainer.tsx

- extra layer of picking layout --> context would be better since not all data is needed

```tsx
import React from 'react'
import {
  View,
  Text,
  Button,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'
import ProductsGrid from './ProductsGrid'
import ProductsList from './ProductsList'
export default function ProductsContainer({ data }: any) {
  const [layout, setLayout] = useState<string>('grid')
  const totalProducts = data?.meta.pagination.total || {}
  console.log('ProductsContainer.tsx', data)

  const renderItem = ({ item }: any) => (
    // layout === 'grid' ? (
    //   <ProductsGrid item={item} />
    // ) : (
    <ProductsList item={item} />
  )
  //)

  if (!totalProducts || totalProducts == 0) {
    return (
      <View>
        <Text>NO</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
          {totalProducts} product{totalProducts > 1 && 's'}
        </Text>

        <View style={styles.buttonGroup}>
          <TouchableOpacity
            onPress={() => setLayout('grid')}
            style={[styles.button, layout === 'grid' && styles.activeButton]}
          >
            <FontAwesome name='th' size={24} color='white' />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setLayout('list')}
            style={[styles.button, layout === 'list' && styles.activeButton]}
          >
            <FontAwesome name='list' size={24} color='white' />
          </TouchableOpacity>
        </View>
      </View>

      {/* PRODUCTS */}
      <View style={styles.productList}>
        {totalProducts === 0 ? (
          <Text style={styles.noProductsText}>
            Sorry, no products matched your search...
          </Text>
        ) : layout === 'grid' ? (
          <ProductsGrid items={data} />
        ) : (
          <ProductsList />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 8,
  },
  headerText: {
    fontSize: 16,
    fontWeight: '500',
  },
  buttonGroup: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 8,
    padding: 8,
    backgroundColor: '#f4511e',
    borderRadius: 4,
    color: 'white',
  },
  activeButton: {
    backgroundColor: '#ff6e40',
  },
  productList: {
    flex: 1,
    marginTop: 8,
  },
  noProductsText: {
    fontSize: 18,
    marginTop: 16,
    textAlign: 'center',
  },
})
```

ProductsGrid.tsx

- the cards are for navigating and id to be wrapped in new array
- the problem is that FlatList has diff scroll behavior compare to Parallax

```tsx
import React from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'

const ProductGrid = ({ items }: any) => {
  const navigation = useNavigation()
  console.log(items)

  const renderProduct = ({ item }: any) => {
    const { id, attributes } = item
    const { title, price, image } = attributes
    console.log(item)
    return (
      <View key={id} style={styles.card}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignDetails', { id })}
          style={styles.cardTouchable}
        >
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.cardBody}>
            <Text style={styles.cardTitle}>{title}</Text>
            <Text style={styles.price}>{price}</Text>
          </View>
        </TouchableOpacity>
        {/** 
        <TouchableOpacity
          onPress={() => navigation.navigate('EditSign', { id })}
          style={styles.editButton}
        >
          <Text style={styles.buttonText}>Edit</Text>
        </TouchableOpacity> */}
      </View>
    )
  }

  return (
    <View style={styles.container}>
      {items ? (
        <FlatList
          data={items}
          renderItem={renderProduct}
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
    flex: 1,
    padding: 12,
  },
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
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
})

export default ProductGrid
```

####

(tabs)\(home)\index.tsx

```tsx
import {
 ...
  Animated,
  SafeAreaView,
} from 'react-native'

import {
  ...
  ProductsContainer,
} from '@/components/all'

export default function HomeScreen() {

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
      ...
        </SafeAreaView>

  )
}
```

ProductsContainer.tsx

- context would make this so much easier. or just not name the data with meta and data as data

```tsx
return <ProductsGrid items={data.data} />
const styles = StyleSheet.create({
  activeButton: { backgroundColor: '#add8e6' },
})
```

ProductsGrid.tsx

- i did a lot of stupi shit like removing on press flex 1 and debugg and stuff

```tsx
import React, { useEffect } from 'react'
import {
  ...
  StyleSheet,
  ...
  Image,
  ScrollView,
} from 'react-native'

const ProductGrid = ({ items }: any) => {
...

    return(
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flex: 1,
    padding: 12,
  },
})
```

####

app\(tabs)\(home)\_layout.tsx

- remove --> uniqe history for products and id

```tsx
 <Stack.Screen name='Favorites' />
      <Stack.Screen name='Profiles' />
```

app\(tabs)\(home)\Favorites.tsx
app\(tabs)\(home)\index.tsx
app\(tabs)\(home)\Profiles.tsx
app\(tabs)\Profile.tsx

- i get errors removing pages.. dont change

app\(tabs)\_layout.tsx

components\aoo\Product.tsx

component\ProductGrid.tsx

####

api\products\index.ts

```tsx
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
```

- COPY constants.tsx (practice data)

customFetch.tsx

```tsx
import { static_ID_Data } from '@/utils/constants'
export const convenientIdFetchBasically = async (id: any) => {
  return static_ID_Data
}
```

[id].tsx

```tsx
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

  if (!product) {
    return <Text>No product found</Text>
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
```

Product.tsx

```tsx
 onPress={() => {
            console.log('Navigating to:', `/${segments[0]}/(home)/${id}`)
          }}
```

## articles in page where load \* times

```sh
npx expo install @react-native-picker/picker
```

## functionality favorite no load

## when and where
