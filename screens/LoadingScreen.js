import React, { Component } from 'react'
import {
  Notifications,
} from 'expo';
import { StyleSheet, View, AsyncStorage, PropTypes } from 'react-native'
import { NavigationActions } from 'react-navigation';
import Load from './Load';
import registerForPushNotificationsAsync from '../registerforPushNotifications';

export default class Loading extends React.Component {
constructor() {
    super();
    this.state = {
      isLoading: true,  
      loadingtext : 'App wird geladen...'    
    }
    Load.load(v => this.checklogin());
    
    //this._bootstrapAsync();
  }
  checklogin() {
    this.setState({loadingtext: 'Benutzer wird gesucht...'})
    var user = this.finduser();
    
  }
  
  finduser = async () => {
    var userid = await AsyncStorage.getItem('userid');
    
    userid ? this.setState({loadingtext: 'Benutzer gefunden...'})
    

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
     :
    this.setState({loadingtext: 'Kein Benutzer gefunden...' })
    this.props.navigation.navigate(userid ? 'App' : 'Auth');
    }
  
  _bootstrapAsync = async () => {
    
    
    try {
      var userid = await AsyncStorage.getItem('userid');
    if(userid) {
      this.setState({loadingtext: 'Benutzer gefunden. Login...'

      })
      Load.load(v => this.setState({isLoading: false})); 
      
    } 
    this.props.navigation.navigate(userid ? 'App' : 'Auth');
    //this.props.navigation.navigate('Home', {id : userid});
   
  } catch (error) {
    alert('error '+error);
  }
  };

  componentWillMount = async () => {
    
    let token = await AsyncStorage.getItem('usertoken');
    let name = await AsyncStorage.getItem('username');
    let firstname = await AsyncStorage.getItem('firstname');
    let userid = await AsyncStorage.getItem('userid');
    let standort = await AsyncStorage.getItem('standort');
    let lastname = await AsyncStorage.getItem('lastname');    
    
  }

render () {
     if (this.state.isLoading) {
      return  <Load loadingText={this.state.loadingtext} />
    } else { 
    return (
      <View style={styles.container} /> 
    )}
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  }
})