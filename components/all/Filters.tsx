import FormRow from '@/components/ui/FormRow'
import FormRowSelect from '@/components/ui/FormRowSelect'
import SubmitBtn from '@/components/ui/SubmitBtn'
import { useNavigation } from 'expo-router'
import { View, Text, StyleSheet, Button } from 'react-native'
import { useState } from 'react'
const Filters = () => {
  const navigation = useNavigation()
  const [Toggle, setToggle] = useState<Boolean>(false)
  const ACHIEVEMENT_STATUS = {
    COMPLETED: 'completed',
    IN_PROGRESS: 'in progress',
  }
  const ACHIEVEMENT_TYPE = { TYPE1: 'type1', TYPE2: 'type2' }
  const ACHIEVEMENT_SORT_BY = { NEWEST: 'newest', OLDEST: 'oldest' }

  if (Toggle) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{Toggle ? 'hide' : 'show'}</Text>

        <Button
          title='Reset Search Values'
          onPress={() => setToggle(!Toggle)}
          color='#FF0000'
        >
          {Toggle ? 'hide' : 'show'}
        </Button>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Search Form</Text>

        <Button title='Reset Search Values' onPress={() => setToggle(!Toggle)}>
          {Toggle ? 'hide' : 'show'}
        </Button>
      </View>
      <View style={styles.formCenter}>
        <FormRow type='search' name='search' defaultValue='a' label='Search' />
        <FormRowSelect
          labelText='Achievement Status'
          name='achievementStatus'
          list={['all', ...Object.values(ACHIEVEMENT_STATUS)]}
          defaultValue='all'
        />
        <FormRowSelect
          labelText='Achievements Type'
          name='achievementType'
          list={['all', ...Object.values(ACHIEVEMENT_TYPE)]}
          defaultValue='all'
        />
        <FormRowSelect
          name='sort'
          defaultValue='newest'
          list={[...Object.values(ACHIEVEMENT_SORT_BY)]}
        />
        <Button
          title='Reset Search Values'
          onPress={() => navigation.navigate('/(tabs)/(home)/index')}
          color='#FF0000'
        />
        <SubmitBtn formBtn />
      </View>
    </View>
  )
}

export default Filters

const styles = StyleSheet.create({
  container: {
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
