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
          headerRight: () => (
            <Button title='Modal' onPress={() => router.push('/Modal')} />
          ),
        }}
      />
      {/* <Tabs.Screen
        name='(features)/Favorites'
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
      /> */}
    </Tabs>
  )
}
