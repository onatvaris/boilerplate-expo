import type { NativeStackNavigationOptions } from '@react-navigation/native-stack';
import type { DrawerNavigationOptions } from '@react-navigation/drawer';

import { RootStackParamList } from './types';

// screens
import HomeScreen from './Home';
import LoginScreen from './Login';
import CustomPage from './CustomPage';

type ScreenType = {
  name: string;
  component: React.ComponentType<any>;
  props?: {
    initialParams?: any;
    options?: NativeStackNavigationOptions | DrawerNavigationOptions;
  };
};

const DrawerScreens: ScreenType[] = [
  {
    name: 'CustomPage',
    component: CustomPage,
    props: {
      options: {
        title: 'Custom Page'
      }
    }
  }
];

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

export { Screens, DrawerScreens, RootStackParamList };
