import React, { useState } from 'react';
import { loginUser } from '../services/authServices';
import { useNavigation } from '@react-navigation/native';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';

const LoginScreen = () => {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const navigation = useNavigation();

   const handleLogin = async () => {
      try {
         const data = await loginUser(email, password);
         Alert.alert('Login Successful', `Welcome ${data.fname}`);
         //navigation.navigate('Home', { user: data });
      } catch (error) {
         Alert.alert('Login Failed', 'Please check your credentials.');
      }
   };

   return (
      <View style={styles.container}>
         <Text style={styles.title}>Login</Text>
         <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
         />
         <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
         />
         <Button title="Login" onPress={handleLogin} />
      </View>
   );
};

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      padding: 16,
   },
   title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 16,
   },
   input: {
      borderWidth: 1,
      borderColor: '#ccc',
      padding: 8,
      marginBottom: 12,
      borderRadius: 5,
   },
});

export default LoginScreen;
