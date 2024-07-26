import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createDrawerNavigator } from '@react-navigation/drawer';

import { Screens, DrawerScreens, RootStackParamList } from '../screens';
import { HomeDrawerParamList } from '../screens/types';

const Drawer = createDrawerNavigator<HomeDrawerParamList>();
const Stack = createNativeStackNavigator<RootStackParamList>();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      {DrawerScreens.map(screen => (
        <Drawer.Screen
          key={screen.name}
          name={screen.name as keyof HomeDrawerParamList}
          component={screen.component}
          {...screen.props}
        />
      ))}
    </Drawer.Navigator>
  );
};

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={'DrawerNavigator' as keyof RootStackParamList}
          component={DrawerNavigator}
          options={{ headerShown: false }}
        />
        {Screens.map(screen => (
          <Stack.Screen
            key={screen.name}
            name={screen.name as keyof RootStackParamList}
            component={screen.component}
            {...screen.props}
          />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
