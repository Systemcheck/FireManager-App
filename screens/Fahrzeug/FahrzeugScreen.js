import React, { Component } from 'react';
import { RefreshControl, ScrollView, AppRegistry, SectionList, View, FlatList,  StyleSheet } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import {  List, ListItem, Slider, Text } from 'react-native-elements';
import * as Haptic from 'expo-haptics';
import { NavigationEvents } from 'react-navigation';





export default class FahrzeugScreen extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      cars: [],
      list: [],
      duration: 5,
      refreshing: false,
    };
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    
  return fetch('http://www.wfmanager.de/ajax/getCars')
    .then((response) => response.json())
    .then((responseJson) => {
      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Success);
      this.setState({
      list: responseJson.cars,
      cars: JSON.stringify(this.state.list)
    });
    this.setState({refreshing: false});  
      
    })
    .catch((error) => {
      console.error(error);
    });
  }
   _onReload = () => {
  
  return fetch('http://www.wfmanager.de/ajax/getCars')
    .then((response) => response.json())
    .then((responseJson) => {
     
      this.setState({
      list: responseJson.cars,
      cars: JSON.stringify(this.state.list)
    });
     
      
    })
    .catch((error) => {
      console.error(error);
    });
  }



  componentWillMount() {
    return fetch('http://www.wfmanager.de/ajax/getCars')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
      list: responseJson.cars,
      cars: JSON.stringify(this.state.list)
    });
      
      
    })
    .catch((error) => {
      console.error(error);
    });
  }
  
  
  
  cardetails = (id, name, status) => {
      
    this.props.navigation.navigate('Cardetails', {
              id: id,
              name: name,
              status: status,
            });
            
  }

  render() {
   
    
    return (
     
      <View style={styles.container}>
      <NavigationEvents
                  onWillFocus={() => {
                    this._onReload() 
                  }}
                />
      <LinearGradient
          colors={['#d2312d73', 'transparent']}
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
          />
        }>
        <View style={{padding: 15}}>
            <Text h4 style={{color:"white"}}>Fahrzeuge</Text>
          </View>
          <ListItem
            containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#00000050', backgroundColor: '#d2312d73'}}
              rightTitle='Status'
              rightTitleStyle={{ color:'white'}}
              title='Fahrzeug'
              subtitle='Funkkenner'
             titleStyle={{ color: 'white', fontWeight: 'bold' }}
              subtitleStyle={{ color: 'white' }}
            />
          {
            this.state.list.map((item, i) => (
            
            <ListItem
            button 
            onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.cardetails(item.id, item.name, item.status);
            
          }}
          
            containerStyle={{ borderBottomWidth: 1, borderBottomColor: '#00000050', backgroundColor: '#d2312d73'}}
              rightTitle={'--'+item.status+'--'}
              rightTitleStyle={{ color:'white'}}
              key={i}
              title={item.mission != null ? item.name+' '+item.mission : item.name}
              subtitle={item.title}
              
              chevronColor="white"
              chevron
              titleStyle={{ color: 'white', fontWeight: 'bold' }}
              subtitleStyle={{ color: 'white' }}
            />
            ))
          }
          </ScrollView>
          
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22,
   backgroundColor: 'black',
  },
 
})

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => FahrzeugScreen);

