import React, { Component } from 'react';
import { ScrollView, AppRegistry, View, StyleSheet, RefreshControl } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { Text, ListItem } from 'react-native-elements';
import { NavigationEvents } from 'react-navigation';


export default class Cardetails extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      refreshing: false,
      missionid: this.props.navigation.getParam('id'),
      missionname: 'Was: '+this.props.navigation.getParam('name'),
      missionaddress: 'Wo: ',
      mission: [],
      missioncars:[],
    };
    
  }
  onBack() {
    alert('back');
  }
  componentDidMount() {
    return fetch('http://www.wfmanager.de/ajax/getMissionDetails/'+this.state.missionid)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
      mission: responseJson.mission,
      missioncars: responseJson.missioncars,
      missionname: 'Was: '+responseJson.mission.name,
      missionaddress: 'Wo: '+responseJson.mission.address,
      missiondescription: 'Infos: '+responseJson.mission.description,
      });
    })
    .catch((error) => {
      console.error(error);
    });
  }
getMissionDetails() {
  return fetch('http://www.wfmanager.de/ajax/getMissionDetails/'+this.state.missionid)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
      mission: responseJson.mission,
      missioncars: responseJson.missioncars,
      missionname: 'Was: '+responseJson.mission.name,
      missionaddress: 'Wo: '+responseJson.mission.address,
      missiondescription: 'Infos: '+responseJson.mission.description,
      });
      this.setState({refreshing: false});
    })
    .catch((error) => {
      console.error(error);
    });
  }

_onRefresh = () => {
    this.setState({refreshing: true});
    this.getMissionDetails();
    
  }
 
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'Einsatz'),
    };
  };

  missioncardetails(id) {
    this.props.navigation.navigate('Missioncardetails', { 
      id : id });
  }



  render() {
  
  const { navigation } = this.props;
    const missionId = navigation.getParam('id');
    const itemName = navigation.getParam('name', 'some default value');  
    
    return (
      <View style={styles.container}>
      <NavigationEvents
                  onWillFocus={() => {
                    this.getMissionDetails() 
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
            <Text h5 style={{color:"white"}}>Einsatzinfos:</Text>
          </View> 
          <ListItem
              containerStyle={{ color: 'white', borderBottomWidth: 1, borderBottomColor: '#00000050', backgroundColor: '#d2312d73'}}
              title={this.state.missionname}
              titleStyle={{ 
                color: 'white'}}
            />
          
          <ListItem
              containerStyle={{ color: 'white', borderBottomWidth: 1, borderBottomColor: '#00000050', backgroundColor: '#d2312d73'}}
              title= {this.state.missionaddress}
              titleStyle={{ 
                color: 'white'}}
            />
          
          <ListItem
              containerStyle={{ color: 'white', borderBottomWidth: 1, borderBottomColor: '#00000050', backgroundColor: '#d2312d73'}}
              title= {this.state.missiondescription}
              titleStyle={{ 
                color: 'white'}}
            />
          <View style={{padding: 15}}>
            <Text h5 style={{color:"white"}}>Fahrzeuge:</Text>
          </View>
          {
          
          this.state.missioncars.map((item, i) => (
            item.cars == true ?
            <ListItem
              button 
              onPress={() => {
              this.missioncardetails(item.id);
              }}
              containerStyle={{ color: 'white', borderBottomWidth: 1, borderBottomColor: '#00000050', backgroundColor: '#d2312d73'}}
              key={i}
              title={item.name}
              subtitle={item.subtitle}
              leftIcon={{ name: item.icon }}
              chevronColor={item.notification == true ? "transparent" : 'white'}
              chevron
              rightTitle={'--'+item.status+'--'}
              rightTitleStyle={{ color:'white'}}
              titleStyle={{ 
                color: 'white', 
                 
                }}
              subtitleStyle={{ 
                color:"#ffffff", 
              }}
            />
            : 
            <ListItem
              containerStyle={{ color: 'white', borderBottomWidth: 1, borderBottomColor: '#00000050', backgroundColor: '#d2312d73'}}
              title='Keine Fahrzeuge gebucht'
              titleStyle={{ color: 'white'}}
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
    flex:1,
    backgroundColor: 'black',
    
    
  }
  
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => Cardetails);

