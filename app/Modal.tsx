//rnfs
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Modal() {
  return (
    <View style={styles.container}>
      <Text>modal</Text>
      <Text>modal</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Ensures the background is not black
  },
})
