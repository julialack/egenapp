import { View, Text, StyleSheet } from 'react-native'
import { useState } from 'react'
import { Picker } from '@react-native-picker/picker'
// FormRowSelect Component
const FormRowSelect = ({ labelText, name, list, defaultValue }: any): any => {
  const [selectedValue, setSelectedValue] = useState(defaultValue)

  return (
    <View style={styles.formRow}>
      {labelText && <Text style={styles.label}>{labelText}</Text>}
      <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue) => setSelectedValue(itemValue)}
        style={styles.picker}
      >
        {list.map((item, index) => (
          <Picker.Item label={item} value={item} key={index} />
        ))}
      </Picker>
    </View>
  )
}

export default FormRowSelect

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
