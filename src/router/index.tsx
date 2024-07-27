import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { Screens } from '../screens';
import { HomeDrawerParamList, RootStackParamList } from '../screens/types';
import LoginScreen from '../screens/Login';

const Drawer = createDrawerNavigator<HomeDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const DrawerNavigator = () => (
  <Drawer.Navigator>
    <Drawer.Screen name='HomePage' component={Screens.HomePage} />
    <Drawer.Screen name='CustomPage' component={Screens.CustomPage} />
  </Drawer.Navigator>
);

const Router = () => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name='LoginPage' component={LoginScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Router;
