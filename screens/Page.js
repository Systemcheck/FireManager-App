import * as React from 'react';

import { ImageBackground, Button, StyleSheet, Switch, SectionList, FlatList, Platform, TouchableOpacity, ScrollView, Block, Icon, View } from "react-native";
import { Header, Divider, Text, ListItem } from "react-native-elements";


export class Page extends React.Component {

  state = {
    isFetching: false,
    cars:[],
    
  
  };
  
  static navigationOptions = {
    title: 'Home',
    headerStyle: {
      backgroundColor: 'purple',
      headerTitleStyle : {fontWeight: 'bold',textAlign: 'center',alignSelf:'center', color:'white'},
      headerTintColor: '#fff',
    
    }
  }


onRefresh() {
     this.setState({ isFetching: true }, function() { 
       this.getApiData() 
        });
  }

getApiData() {
    return fetch('http://www.wfmanager.de/ajax/getCars')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
      cars: responseJson.cars,
      isFetching: false 
      });
    })
    .catch((error) => {
      console.error(error);
    });
   
   }
  
  
  componentDidMount() {
    return fetch('http://www.wfmanager.de/ajax/getCars')
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
      cars: responseJson.cars
    });
      
      
    })
    .catch((error) => {
      console.error(error);
    });
  }

  render() {
    const list = JSON.stringify(this.state.cars);
  
  return (
      <View style={styles.wrapper} onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}> 
        {
        this.state.cars.map((item, id) => (
          <ListItem
            key={id}
            title={item.name}
            subtitle=<Text>Status: { item.status  }</Text>
            badge={{ value: item.status, textStyle: { color: 'white' }, containerStyle: { padding: '3px', marginTop: -20 } }}
            rightIcon= {{ value: 'chevron'}}
        
          /> 
        ))
        }
        <ImageBackground source={'https://image.shutterstock.com/image-illustration/dark-blue-gradient-background-radial-260nw-587499803.jpg'} style={{width: '100%', height: '100%'}}>
    <Text>Inside</Text>
  </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
  wrapper: {
    
    backgroundImage: 'https://image.shutterstock.com/image-illustration/dark-blue-gradient-background-radial-260nw-587499803.jpg',
    minHeight: '100%',
    minWidth: '100%',
    boxShadow: '14px 14px white',
    
    
  },
 
});