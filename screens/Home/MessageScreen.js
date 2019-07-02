import React, { Component } from 'react';
import { ScrollView, AppRegistry, View, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Avatar, Button, Card, Paragraph, DefaultTheme } from 'react-native-paper';


const primary = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: 'white',
    accent: 'white',
    placeholder: 'white',
    text: 'white',
    placeholderTextColor:'white',
    background: '#2312fd75'
  },
};

export default class MessageScreen extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      
      message: [],
      messageid: this.props.navigation.getParam('id'),
    };
  }
setRead(id) {
   return fetch('http://www.wfmanager.de/ajax/setMessageRead/'+this.state.messageid)
   .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
      message: responseJson.message,
      
    });
  })
    .catch((error) => {
      console.error(error);
    });
}

deleteMessage = () => {
  Alert.alert(
  'Mitteilung Löschen',
  'Möchtest du die Mitteilung wirklich löschen?',
  [
    
    {
      text: 'Abbrechen',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: () => this.deleteNow()},
  ],
  {cancelable: false},
);
}

deleteNow = () => { 
  return fetch('http://www.wfmanager.de/ajax/deleteMessage/'+this.state.messageid)
  .then((response) => response.json())
    .then((responseJson) => {
    this.props.navigation.goBack(null)
  })
    .catch((error) => {
      console.error(error);
    });
}
componentWillMount() {
    this.setRead(this.state.messageid);
    return fetch('http://www.wfmanager.de/ajax/getMessage/'+this.state.messageid)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
      message: responseJson.message,
      
    });
  })
    .catch((error) => {
      console.error(error);
    });
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Mitteilung',
    };
  };


  render() {
 
  const { navigation } = this.props;
    const itemId = navigation.getParam('id');
    const itemName = navigation.getParam('name', 'some default value');  
    
    return (
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
       <ScrollView style={{paddingTop: 40}}> 
       
        <Card style={{backgroundColor: '#d2312d73', color:'white'}}
      >
    <Card.Title style={{color:'white' }} theme={primary}
    title={itemName} subtitle="Absender:" left={(props) => <Avatar.Icon {...props} icon="drafts" />} />
    <Card.Content theme={primary}>
      
      <Paragraph theme={primary}>{this.state.message.content} Card Content</Paragraph>
    </Card.Content>
    
    <Card.Actions>
      <Button onPress={() => this.props.navigation.goBack(null) } theme={primary}   
      >Zurück</Button>
      <Button onPress={() => this.deleteMessage() } theme={primary}
      >Löschen</Button>
    </Card.Actions>
  </Card>
     
         </ScrollView>
      </View>
    );
  } 
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'black',
    
    
  }
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => MessageScreen);

