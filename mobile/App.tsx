import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View className='bg-gray-900 flex-1 items-center justify-center'>
      <Text className='text-gray-100 text-3xl font-bold'>Lucas</Text>
      <StatusBar  style='auto' translucent/>
    </View>
  );
}
