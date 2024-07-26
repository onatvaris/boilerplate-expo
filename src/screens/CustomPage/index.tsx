import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { HomeTabScreenProps } from '../types';

const CustomPage: React.FC<HomeTabScreenProps<'CustomPage'>> = ({
  navigation
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Home', {
            screen: 'HomePage'
          });
        }}
      >
        <Text style={styles.text}>Custom Page</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default CustomPage;
