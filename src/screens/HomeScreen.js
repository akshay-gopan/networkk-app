import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useEffect } from 'react';
import axiosInstance from '../../utils/axios';
import { logoutUser } from '../services/authServices';


const HomeScreen = () => {
    const [user, setUser] = React.useState(null);
    const [error, setError] = React.useState(null);

    const navigation = useNavigation();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get('/users/d/me');
                setUser(response.data);
            } catch (error) {
                setError(error.response?.data?.error || 'Failed to fetch user details');
                console.log(error);
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        logoutUser();
        //navigation.navigate('Login');
        console.log('User logged out');
    };

    return (
        <View style={styles.container}>
            {user ? (
                <>
                    <Text style={styles.title}>Welcome {user.fname}</Text>
                    <Text style={styles.subtitle}>This is the Home Screen</Text>
                </>
            ) : error ? (
                <Text style={styles.error}>{error}</Text>
            ) : (
                <Text style={styles.subtitle}>Loading user details...</Text>
            )}

            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f8f8f8',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        color: '#666',
    },
    error: {
        fontSize: 16,
        color: 'red',
        marginBottom: 10,
    },
});

export default HomeScreen;
