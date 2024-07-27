import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { HomeDrawerScreenProps } from '../types';

const HomeScreen: React.FC<HomeDrawerScreenProps<'HomePage'>> = ({
  navigation
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('LoginPage');
        }}
      >
        <Text>Home Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default HomeScreen;
