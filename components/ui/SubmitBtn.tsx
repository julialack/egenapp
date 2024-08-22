// SubmitBtn Component
import { Button, StyleSheet } from 'react-native'
import { useState } from 'react'

const SubmitBtn = ({ formBtn }: any) => {
  return <Button title='Submit' onPress={() => console.log('Form Submitted')} />
}

export default SubmitBtn

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  formCenter: {
    marginBottom: 20,
  },
  formRow: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
  },
  picker: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
  },
})
