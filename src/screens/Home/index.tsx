import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  HomeTabScreenProps,
  RootStackParamList,
  RootStackScreenProps
} from '../types';
import { NativeStackScreenProps } from 'react-native-screens/lib/typescript/native-stack/types';

const HomeScreen: React.FC<RootStackScreenProps<'Home'>> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Login');
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
