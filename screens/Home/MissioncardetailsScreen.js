import React, { Component } from 'react';
import { AppRegistry, View,Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ListItem } from 'react-native-elements';
import * as Haptic from 'expo-haptics';




export default class MissioncardetailsScreen extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      car: [{status: 0}],
      carid: this.props.navigation.getParam('id'),

      
     itemSelected: this.props.navigation.getParam('status')
    };
  }
onPressHandler(id) {
        this.setState({selectedItem: id});
    }
  componentDidMount() {
    
   
    return fetch('http://www.wfmanager.de/ajax/getCar/'+this.state.carid)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
      car: responseJson.cars
    });
  })
    .catch((error) => {
      console.error(error);
    });
  }

  setstatus(id, status) {
    console.log(id,status);
    Haptic.notificationAsync(Haptic.NotificationFeedbackType.Info);  
     return fetch('http://www.wfmanager.de/ajax/setCar/'+id+'/'+status)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
      list: responseJson.cars,
    });
     this.props.navigation.goBack(null); 
      
    })
    
  }
  
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Status setzen',
    };
  };

render() {
  
  const { navigation } = this.props;
    const itemId = navigation.getParam('id');
    const itemName = navigation.getParam('status', 'some default value');  
    const data = [
  { key: '1', color: '#47a447', text: 'einsatzbereit über Funk' }, 
  { key: '2', color: '#47a447', text: 'einsatzbereit auf Wache' }, 
  { key: '3', color: '#47a447', text: 'Einsatzauftrag übernommen' }, 
  { key: '4', color: '#47a447', text: 'Einsatzort erreicht' }, 
  { key: '5', color: '#47a447', text: 'Sprechwunsch' }, 
  { key: '6', color: '#47a447', text: 'nicht einsatzbereit' }
];
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
          <View style={{padding: 15}}>
            <Text h5 style={{color:"white"}}>Rückmeldung: (Aktuell Status {this.state.car.status})</Text>
          </View>
         {
          data.map((item, i) => (
            <ListItem
              button
              onPress={() => {
               this.setstatus(itemId, item.key)
            }}
              containerStyle={{ color: 'white', borderBottomWidth: '1', borderBottomColor: '#00000050', backgroundColor: '#d2312d73'}}
            
             key={i}
              title={'Status: '+item.key}
              
              subtitle={item.text}
              chevronColor="transparent"
              chevron
              titleStyle={{ 
                color: 'white', 
                fontWeight: item.alarm == false ? '' : 'bold' 
              }}
              subtitleStyle={{ color: 'white' }}
            />
          ))
         }
        
      </View>
    );
  } 
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'black',
    
    
  },
  
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => MissioncardetailsScreen);

