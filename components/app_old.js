import React from 'react';
import {  Animated, Easing, Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { Header, Icon } from 'react-native-elements'
import Ionicons from 'react-native-vector-icons/Ionicons';

import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
} from 'react-navigation';
//import createStackNavigator, createBottomTabNavigator, createAppContainer in our project
import { Page } from './screens/Page';
import  Home  from './screens/Home';
import  Scanner  from './screens/Scanner';
import { Test } from './screens/Test';

const transitionConfig = (transitionProps, prevTransitionProps) => ({
  transitionSpec: {
    duration: 400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  screenInterpolator: sceneProps => {
    const { layout, position, scene } = sceneProps;
    const thisSceneIndex = scene.index
    const width = layout.initWidth
    
    const scale = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [4, 1, 1]
    })
    const opacity = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
      outputRange: [0, 1, 1],
    })
    const translateX = position.interpolate({
      inputRange: [thisSceneIndex - 1, thisSceneIndex],
      outputRange: [width, 0],
    })

    const scaleWithOpacity = { opacity }
    const screenName = "Search"

    if (screenName === transitionProps.scene.route.routeName ||
      (prevTransitionProps && screenName === prevTransitionProps.scene.route.routeName)) {
      return scaleWithOpacity;
    }
    return { transform: [{ translateX }] }
  }
})

const HomeStack = createStackNavigator({
  Home: {
    screen: Home,
    
  },
  Scanner: {
    screen: Scanner,
    defaultNavigationOptions: ({navigation}) => ({
      headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'blue'},
      header: <Header back title="Settings" navigation={navigation} />,
      headerBackground: 'black',
    })
  },
  Status: {
    screen: Test,
    defaultNavigationOptions: ({navigation}) => ({
      headerTitleStyle : {textAlign: 'center',alignSelf:'center', color:'blue'},
      header: <Header title="Components" navigation={navigation} />,
      
    })
  },
  
  
},
{
  cardStyle: { 
    backgroundColor: '#EEEEEE', //this is the backgroundColor for the app
  },
  transitionConfig,
});

const TestStack = createStackNavigator(
  {
    //Defination of Navigaton from home screen
    Scanner: { screen: Scanner },
    Status: { screen: Test },
    
  },
  {
  cardStyle: { backgroundColor: '#EEEEEE' },
   transitionConfig 
  },
  
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: 'purple',
      },
      headerTintColor: 'red',
      title: 'Home',
      //Header title
    },
  }
);

const ScannerStack = createStackNavigator(
  {
    //Defination of Navigaton from setting screen
    Status: { screen: Test },
    Scanner: { screen: Scanner },
    
    
  },
  {
    //For React Navigation 2.+ change defaultNavigationOptions->navigationOptions
    defaultNavigationOptions: {
      //Header customization of the perticular Screen
      headerStyle: {
        backgroundColor: 'purple',
      },
      headerTintColor: '#FFFFFF',
      title: 'Scanner',
      //Header title
    },
  }
);
const App = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Status: { screen: TestStack },
    Scanner: { screen: ScannerStack },
    
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Page') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        
        }  else if (routeName === 'Scanner') {
          iconName = `md-barcode${focused ? '' : ''}`;
        }  else if (routeName === 'Status') {
          iconName = `md-time${focused ? '' : ''}`;
        } else if (routeName === 'Home') {
          iconName = `md-home${focused ? '' : ''}`;
        }

        return <IconComponent name={iconName} size={30} color={tintColor} />;
      },
    }),
    barStyle: { backgroundColor: '#694fad' },
    tabBarOptions: {
      activeTintColor: 'blue',
      inactiveTintColor: 'gray',
      backgroundColor: 'purple',
    },
  }
);

export default createAppContainer(App);