import { StyleSheet, Text, View, TextInput, Button } from 'react-native'
import { useState } from 'react'
import { useAuth } from '@/context/auth'
import { blue } from 'react-native-reanimated/lib/typescript/reanimated2/Colors'
export default function Login() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const { signIn } = useAuth()

  const handleLogin = () => {
    // Call login function from context
    //signIn(username, password)
    signIn()
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
        placeholder='Username'
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder='Password'
        secureTextEntry
      />
      <Button title='Login' onPress={handleLogin} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
})
