import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';

// screens
import HomeScreen from './Home';
import LoginScreen from './Login';

type ScreenType = {
  name: string;
  component: React.ComponentType<any>;
  props?: {
    initialParams?: any;
    options?: NativeStackNavigationOptions;
  };
};

const Screens: ScreenType[] = [
  {
    name: 'Login',
    component: LoginScreen,
    props: {
      options: {
        headerShown: false
      }
    }
  },
  {
    name: 'Home',
    component: HomeScreen,
    props: {
      options: {
        headerShown: false
      }
    }
  }
];

export default Screens;
