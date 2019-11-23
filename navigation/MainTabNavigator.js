import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createSwitchNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import JourneyScreen from '../screens/JourneyScreen'
import WelcomeScreen from '../screens/WelcomeScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import SkinTypeForm from '../screens/SkinTypeForm'
import AllergiesForm from '../screens/AllergiesForm'
import ProfileScreen from '../screens/ProfileScreen'
import ScanScreen from '../screens/ScanScreen'
import RecommendationScreen from '../screens/RecommendationScreen'
import SingleProduct from '../screens/SingleProduct'
import { Ionicons } from '@expo/vector-icons'

import CleanserQuestion from '../screens/skin-type-quiz/CleanserQuestion'
import MoisturizerQuestion from '../screens/skin-type-quiz/MoisturizerQuestion'
import PoreQuestion from '../screens/skin-type-quiz/PoreQuestion'
import Result from '../screens/skin-type-quiz/Result'
import SkinQuestion from '../screens/skin-type-quiz/SkinQuestion'
import SkinTypeQuiz from '../screens/skin-type-quiz/SkinTypeQuiz'
import SkinTypes from '../screens/skin-type-quiz/SkinTypes'

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: RecommendationScreen,
    SingleProduct: SingleProduct,
  },
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-home'
          : 'md-home'
      }
    />
  ),
};

HomeStack.path = '/home';

const LinksStack = createStackNavigator(
  {
    Links: LinksScreen,
  },
  config
);

LinksStack.navigationOptions = {
  tabBarLabel: 'Links',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-link' : 'md-link'} />
  ),
};

LinksStack.path = '';

const ScanStack = createStackNavigator(
  {
    Scan: ScanScreen,
  },
  config
);

ScanStack.navigationOptions = {
  tabBarLabel: 'Scan',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-barcode'
          : 'md-barcode'
      }
    />
  ),
};

ScanStack.path = ''

const JourneyStack = createStackNavigator(
  {
    Journey: JourneyScreen,
  },
  config
);

JourneyStack.navigationOptions = {
  tabBarLabel: 'Journey',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? 'ios-list'
          : 'md-list'
      }
    />
  ),
};

JourneyStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-person' : 'md-options'} />
  ),
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  ScanStack,
  JourneyStack,
  ProfileStack,
});

tabNavigator.path = '';

const onBoardingNav = createStackNavigator({
  SkinTypeQuiz: {
    screen: SkinTypeQuiz,
    navigationOptions: ({ navigation }) => ({
      header: null,
      navigation: navigation
    })},
  SkinTypes: {
    screen: SkinTypes,
    navigationOptions: ({ navigation }) => ({
      header: null,
      navigation: navigation
  })},
  SkinQuestion: {
    screen: SkinQuestion,
    navigationOptions: ({ navigation }) => ({
      header: null,
      navigation: navigation
  })},
  PoreQuestion: {
    screen: PoreQuestion,
    navigationOptions: ({ navigation }) => ({
      header: null,
      navigation: navigation
  })},
  CleanserQuestion: {
    screen: CleanserQuestion,
    navigationOptions: ({ navigation }) => ({
      header: null,
      navigation: navigation
  })},
  MoisturizerQuestion: {
    screen: MoisturizerQuestion,
    navigationOptions: ({ navigation }) => ({
      header: null,
      navigation: navigation
  })},
  Result: {
    screen: Result,
    navigationOptions: ({ navigation }) => ({
      header: null,
      navigation: navigation
  })},
})

const AuthSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreen },
  Login: { screen: LoginScreen },
  Signup: { screen: SignupScreen },
  SkinTypeQuiz: onBoardingNav,
  AllergiesForm: { screen: AllergiesForm },
  Dashboard: tabNavigator
})

export default AuthSwitchNavigator;
