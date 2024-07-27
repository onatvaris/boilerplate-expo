import { DrawerScreenProps } from '@react-navigation/drawer';
import type {
  CompositeScreenProps,
  NavigatorScreenParams
} from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Home: NavigatorScreenParams<HomeDrawerParamList>;
  LoginPage: undefined;
};

export type RootStackScreenProps<
  T extends keyof RootStackParamList
> = NativeStackScreenProps<RootStackParamList, T>;

export type HomeDrawerParamList = {
  HomePage: undefined;
  CustomPage: undefined;
};

export type HomeDrawerScreenProps<
  T extends keyof HomeDrawerParamList
> = CompositeScreenProps<
  DrawerScreenProps<HomeDrawerParamList, T>,
  RootStackScreenProps<keyof RootStackParamList>
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
