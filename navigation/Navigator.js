import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, 
  AsyncStorage,
  ActivityIndicator,
  StatusBar,
  Button
  } from 'react-native';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, BottomTabBar } from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../screens/Login/LoginScreen';
import * as Haptics from 'expo-haptics';
import  HomeScreen  from '../screens/Home/HomeScreen';
import  MainScreen  from '../screens/Main';
import ScannerScreen  from '../screens/Scanner/ScannerScreen';
import CardetailsScreen from '../screens/Fahrzeug/CardetailsScreen';
import FahrzeugScreen from '../screens/Fahrzeug/FahrzeugScreen';
import StatusScreen from '../screens/Status/StatusScreen';
import AlarmdetailsScreen from '../screens/Home/AlarmdetailsScreen';
import LoadingScreen from '../screens/LoadingScreen';
import MissioncardetailsScreen from '../screens/Home/MissioncardetailsScreen';
import MessageScreen from '../screens/Home/MessageScreen';



const AuthStack = createStackNavigator({  SignIn: LoginScreen, Register: LoginScreen });
const HomeStack = createStackNavigator({
        cstack: {
            screen: HomeScreen,
            navigationOptions: {
              title: 'Dashboard',
              headerRight: (
      <Button
        onPress={() => AsyncStorage.removeItem('userid') 
         }
        title="Logout"
        color="#fff"
      />
    ),
            }
        },
        Alarmdetails: {
            screen: AlarmdetailsScreen,
            
        },
        Missioncardetails: {
            screen: MissioncardetailsScreen,
            
        },
        Login: {
            screen: LoginScreen,
            
        },
        Message: {
            screen: MessageScreen,
            
        },

    }, {
        
          defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: 'darkred',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },
     
    });

const FahrzeugStack = createStackNavigator({
        cstack: {
            screen: FahrzeugScreen,
            navigationOptions: {
              title: 'Fahrzeuge',
            }
        },
        Cardetails: {
            screen: CardetailsScreen,
            
        },

    }, {
        
          defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: 'darkred',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },
     
    });
    
    const Dstack = createStackNavigator({
        dstack: {
            screen: StatusScreen,
            navigationOptions: {
              title: 'Status',
            }
        }
    }, {
        
          defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: 'darkred',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },
        });
const ScannerStack = createStackNavigator({
        dstack: {
            screen: ScannerScreen,
            navigationOptions: {
              title: 'Scanner',
            }
        }
    }, {
        
          defaultNavigationOptions: {
          headerStyle: {
            backgroundColor: 'darkred',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        },
        });
const TabNavigator = createBottomTabNavigator({
  Home: {
     screen: HomeStack,
     navigationOptions: { 
       title: 'Alarm' }
  },
  Fahrzeuge: {
    screen: FahrzeugStack,
     navigationOptions: { 
       title: 'Fahrzeuge' }
  },
  Status: {
    screen: Dstack,
     navigationOptions: { 
       title: 'Status' }
  },  
  Scanner: {
     screen: ScannerStack,
     navigationOptions: { 
       title: 'Scanner' }
  },
  
  
}, {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let IconComponent = Ionicons;
        let iconName;
        if (routeName === 'Home') {
          iconName = `ios-home${focused ? '' : ''}`;
        } else if (routeName === 'Scanner') {
          iconName = `md-barcode`;
        } else if (routeName === 'Status') {
          iconName = `ios-time${focused ? '' : ''}`;
        }
        else if (routeName === 'Fahrzeuge') {
          iconName = `ios-car${focused ? '' : ''}`;
        }

        // You can return any component that you like here!
        return <IconComponent name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#ffffff',
      inactiveTintColor: '#ffffff70',
      style: {
    backgroundColor: 'darkred',
  },

    },
  }
);
const AppStack = createStackNavigator({
  
  Home: {
     screen: TabNavigator,
     navigationOptions: {
       header: null
     }
    
  },
     

  Scanner: {
    screen: ScannerScreen,
    
  },

  Cardetails: {
    screen: CardetailsScreen,
  }
},
 
  {
    
    initialRouteName: 'Home',
    /* The header config from HomeScreen is now here */
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: 'darkred',
      },
      headerTintColor: '#ffffff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    },
});


async function getItem() {
  try {
    const value = await AsyncStorage.getItem('@username:key');
    alert(JSON.stringify(value));
    return value;
  } catch (error) {
    alert(error);
  }
}


class AuthLoadingScreen extends React.Component {
  constructor() {
    super();
    this._bootstrapAsync();
  }
logout = async () => {
  await AsyncStorage.removeItem('usertoken'),
  this.props.navigation.navigate('Login') 
}
  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem('usertoken');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    this.props.navigation.navigate(userToken ? 'App' : 'Auth');
  };

 
  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="darkred" />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});




  export default createAppContainer( createSwitchNavigator(
{
    AuthLoading: LoadingScreen,
    App: AppStack,
    Tabs: TabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  }
));