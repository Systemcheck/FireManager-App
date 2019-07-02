import React, { Component } from 'react';
import { AsyncStorage, ScrollView, TouchableOpacity, View, StyleSheet, Alert } from 'react-native';
import  Constants  from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { Text } from 'react-native-elements';
import { DefaultTheme,TextInput, Card } from 'react-native-paper';
import KeyboardShift from '../../components/KeyboardShift';
import * as Haptic from 'expo-haptics';


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

export default class App extends Component {
  
  state = {
    hasCameraPermission: null,
    posts:[],
    login: [],
    text: '',
    logged: '',
    user: '',
    password: '',
    
  };
_storeData = async (value, name) => {
alert('50 '+value+name);
try {
    await AsyncStorage.setItem(name, value);
    
  } catch (error) {
    alert('Speicherfehler: ' + error.message);
  }
};
  


handleSubmit() {
  
  var user = this.state.user;
  if( user == '' ) { user = 'null'}
  return fetch('http://www.wfmanager.de/ajax/login/'+user+'/'+this.state.password)
    .then((response) => response.json())
    .then(async (responseJson) => {
      
      this.setState({
      login: responseJson
    });
    
    
    if (this.state.login.error) {
      Alert.alert('Fehler',this.state.login.error)
      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Error);
    } else {
      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Success);           
      
    try {
      //alert('login:80 '+this.state.login.user.userid);
      AsyncStorage.setItem('userid', JSON.stringify(this.state.login.user.userid));
      AsyncStorage.setItem('standort', JSON.stringify(this.state.login.user.standort));
      //alert('login:82 '+AsyncStorage.getItem('userid'));
    } 
    catch (error) {
      alert('AsyncStorage error: ' + error.message);
    }
      
      this.props.navigation.navigate('App');  
      
    }
  })
    .catch((error) => {
      console.error(error);
      alert(JSON.stringify(this.state.login));
      alert(error);
    })
  
  
  
  
}
  static navigationOptions = {
    headerTransparent: true,
    tabBarVisible: true
  }

  

  render() {
    const { shift } = this.state;
    const {navigate} = this.props.navigation;
    const { navigation } = this.props;
    var value = this.state.user;
    return (
      <KeyboardShift>
        {() => (
      <View style={styles.container}>
      <LinearGradient
          colors={['#d2312d90', 'transparent']}
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            height: 500,
          }} />
        <View style={{padding: 15, paddingTop: 100}}>
          <Text h2 style={{color:"red"}}>Fire</Text>
          <Text h2 style={{color:"white"}}>Manager</Text>
        </View>
        
        <ScrollView>
        <Card title="Login" style={{backgroundColor: '#d2312d73', color:'white'}}>
        
        <TextInput
        label='Benutzer'
        style={styles.input}
        value={this.state.user}
        selectionColor='white'
        onChangeText={user => this.setState({ user })}
        returnKeyType = {"next"}
        theme= {primary}
        autoCompleteType= 'username'
        onSubmitEditing={() => { this.secondTextInput.focus(); }}
      /> 
      <TextInput
       ref={(input) => { this.secondTextInput = input; }}
        label='Passwort'
        style={styles.input}
        placeholderTextColor= 'white'
        value={this.state.password}
        selectionColor='white'
        theme= {primary}
        autoCompleteType= 'password'
        secureTextEntry = {true}
        onChangeText={password => this.setState({ password })}
      /> 
      <TouchableOpacity
    style={styles.saveButton}
    onPress={this.handleSubmit.bind(this)}
  >
    <Text style={styles.saveButtonText}>Login</Text>
  </TouchableOpacity>
        </Card></ScrollView>
          
        </View>
       )}
      </KeyboardShift>
    );
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
  input: {
    
    color: 'white',
    
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'transparent',
  },
  saveButton: {
  borderWidth: 1,
  borderColor: '#d1223a10',
  backgroundColor: '#00000040',
  padding: 15,
  margin: 5
},
saveButtonText: {
  color: '#FFFFFF',
  fontSize: 20,
  textAlign: 'center'
}
  
});
