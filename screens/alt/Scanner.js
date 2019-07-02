import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, FlatList } from 'react-native';
import { Constants, BarCodeScanner, Permissions } from 'expo';
import ReactDOM from 'react-dom';
import axios from 'axios';



export default class App extends Component {
  state = {
    hasCameraPermission: null,
    posts:[],
    fetchdata: []
  
  };

  componentDidMount() {
    this._requestCameraPermission();
    axios.get(`http://www.reddit.com/r/${this.props.subreddit}.json`)
      .then(res => {
        const posts = res.data.data.children.map(obj => obj.data);
        this.setState({ posts });
      });
      
      
  }


  _requestCameraPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({
      hasCameraPermission: status === 'granted',
    });
  };

  _handleBarCodeRead = data => {
  //alert(JSON.stringify(data));
  //alert(data.data);
  alert(data.data); 
  return fetch('http://www.wfmanager.de/ajax/items/'+data.data)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
      fetchdata: responseJson
    });
     alert(JSON.stringify(this.state.fetchdata.items)); 
      
    })
    .catch((error) => {
      console.error(error);
      alert(error);
    });
  //const response = fetch("https://www.wfmanager.de/result.php?str="+data.data);
  //const response2 = fetch("https://httpbin.org/get?str=123456"); name lager id nextaudit
  
  //alert(JSON.stringify(response2));
  
  };
  


  render() {
    
    return (
      <View style={styles.container}>
        {this.state.hasCameraPermission === null ?
          <Text>Requesting for camera permission</Text> :
          this.state.hasCameraPermission === false ?
            <Text>Camera permission is not granted</Text> :
            <BarCodeScanner
              torchMode="on"
              onBarCodeRead={this._handleBarCodeRead}
              style={{ height: 200, width: 300 }}
            />
        }
        
        <FlatList
          data={this.state.fetchdata.items}
          renderItem={({item}) => <Text>Name: {item.name}, Lager: {item.lager}</Text>}
          keyExtractor={({id}, index) => id}
        />
        
      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  
});
