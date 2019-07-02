import React, { Component } from 'react';
import { AsyncStorage, ScrollView, View, StyleSheet, RefreshControl } from 'react-native';
import  Constants  from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Text, ListItem} from 'react-native-elements';
import { DefaultTheme,TextInput} from 'react-native-paper';
import * as t from '../../constants/constants';
import * as Haptic from 'expo-haptics';
import Load from '../Load';
import { NavigationEvents } from 'react-navigation';




const colors = t;
const { State: TextInputState } = TextInput;
const hapticoptions = {
  enableVibrateFallback: true,
  ignoreAndroidSystemSettings: false
};

const primary = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: 'white',
    placeholder: 'white',
    text: 'white',
    placeholderTextColor:'white'
  },
};

export default class HomeScreen extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      usertoken: '',
      username: '',
      refreshing: false,
      standort: '',
      isLoading: false,
      notifications: [ {
        name: 'Keine neue Mitteilung',
        notification: false
      }],
      alarm : [ {
        name: 'Es liegen keine Alarmierungen vor!',
        alarm: false
      }]
    };
    Load.load(v => this.setState({isLoading: false}))
  }

getAlarme() {
  return fetch('http://www.wfmanager.de/ajax/getAlarm/'+this.state.standort)
    .then((response) => response.json())
    .then((responseJson) => {
      
      this.setState({
      alarm: responseJson.alarm,
      refreshing: false,
      });
    })
  }
  
_onRefresh = () => {
    this.setState({refreshing: true});
    this.getAlarme();
    this.getNotifications();
  }

_onReload = async () => {
  let standort = await AsyncStorage.getItem('standort');
  let userid = await AsyncStorage.getItem('userid');
  this.setState({userid: userid});
  this.setState({standort: standort});
  this.getAlarme();
  this.getNotifications();
   
}

alarmdetails = (id, name) => {
    this.props.navigation.navigate('Alarmdetails', {
              id: id,
              name: name
            });
}
messagedetails = (id, name) => {
    this.props.navigation.navigate('Message', {
              id: id,
              name: name
            });
}

getNotifications() {
     return fetch('http://www.wfmanager.de/ajax/getNotifications/'+this.state.userid)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
      notifications: responseJson.notifications
    });
    //alert(JSON.stringify(this.state.notifications))
  })
    .catch((error) => {
      console.error(error);
    });
  }

async componentWillMount() {  
  let standort = await AsyncStorage.getItem('standort');
  let userid = await AsyncStorage.getItem('userid');
  this.setState({userid: userid});
  this.setState({standort: standort});
  this.getNotifications();
  this.getAlarme();
  Haptic.notificationAsync(Haptic.NotificationFeedbackType.Success);
  this.setState({isLoading: false});
  }


  render() {
    let name = AsyncStorage.getItem('username');
    const { shift } = this.state;
    const {navigate} = this.props.navigation;
    const { navigation } = this.props;
    var value = this.state.user;
    if (this.state.isLoading) {
      return  <Load loadingText="Daten werden geladen..." />
    } else { 
    return (
      
      <View style={styles.container}>
      <NavigationEvents
                  onDidFocus={() => {
                    this._onReload() 
                  }}
                />
      <LinearGradient
          colors={['#d2312d90', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 500,
          }} />
          
          
          <ScrollView  
            refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this._onRefresh}
            title='...lädt'
            tintColor="white"
            titleColor="white"
          />
        }
        >
        
          <View style={{padding: 15}}>
           <Text h4 style={{color:"white"}}>Alarm</Text>
             
          </View>
          {
            
           
            
           this.state.alarm.map((item, i) => (
           item.alarm == true ?      
            <ListItem
              button
              onPress={item.alarm == true ?  () => {
               this.alarmdetails(item.id, item.name)
              } : console.log('pressed') }
              containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#00000050', backgroundColor: '#d2312d73'}}
            
              key={i}
              title={item.name}
              subtitle={item.ort}
              chevronColor="transparent"
              chevron='none'
              titleStyle={{ 
                color: 'white', 
                fontWeight: item.alarm == false ? 'normal' : 'bold' 
              }}
              subtitleStyle={{ color: 'white' }}
            />
           
            :
             <ListItem
              containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#00000050', backgroundColor: '#d2312d73'}}
              key='1'
              title= {item.name}
              titleStyle={{ 
                color: 'white'}}
            />  ))
          }
          
          <View style={{padding: 15}}>
            <Text h4 style={{color:"white"}}>Mitteilungen</Text>
          </View>
          {
           this.state.notifications.map((item, i) => (
            
            <ListItem
            button 
            onPress={item.notification == true ?  () => {
            
            this.messagedetails(item.id, item.name, item.status);
            
          } : console.log('pressed') }
           
          
            containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#00000050', backgroundColor: '#d2312d73'}}
              key={i}
              title={item.name}
              subtitle={item.subtitle}
              chevronColor={item.notification == true ? "transparent" : 'white'}
              
              chevron
              titleStyle={{ 
                color: item.unread == true ? "#ffffff" : '#ffffff95', 
                fontWeight: item.unread == true ? 'bold' : 'normal' 
                }}
              subtitleStyle={{ 
                color: item.unread == true ? "#ffffff" : '#ffffff95', 
                
                }}
            />
            ))
          }
     
    
        </ScrollView>
        
        </View>
      
    );
    }
  }
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'stretch',
    
    
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'black',
  },
  
});
