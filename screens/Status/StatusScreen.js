import React, { Component } from 'react';
import { TouchableOpacity, AppRegistry, View,Text, FlatList,  StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Haptic from 'expo-haptics';


const data = [
  { key: 'Verfügbar', color: '#4caf50' }, { key: 'nicht verfügbar', color: '#d2312d' }, 

];

const formatData = (data, numColumns) => {
  const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};
const numColumns = 2;
export default class StatusScreen extends Component {


  constructor(props) {
    super(props)
    this.state = {
      cars: [],
      list: [],
      color: '#ffffff30',
      duration: 5
    };
  }
  
  componentDidMount() {
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

  _onPressButton() {
    Haptic.notificationAsync(Haptic.NotificationFeedbackType.Info);
  }
  renderItem = ({ item, index }) => {
      if (item.empty === true) {
        return <View style={[styles.item, styles.itemInvisible]} />;
      }
    
      return (
        <TouchableOpacity onPress={this._onPressButton} style={{ alignItems: 'center',
          backgroundColor: this.state.color,
          justifyContent: 'center',
          flex: 1,
          margin: 10,
          borderRadius: 110,
          marginTop: 50,
          height: Dimensions.get('window').width / numColumns -20, borderWidth: 4,
          borderColor: item.color}}>
     
          <Text style={styles.itemText}>{item.key}</Text>
        </TouchableOpacity>
      );
  };
  
  render() {
    

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
      <FlatList
        data={formatData(data, numColumns)}
        
        renderItem={this.renderItem}
        numColumns={numColumns}
      />
      </View>
    );
  } 
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'black',
    
    
  },
  itemInvisible: {
    backgroundColor: 'transparent',
  },
  itemText: {
    color: '#fff',
    fontWeight: 'bold',
    
  },
});

// skip this line if using Create React Native App
AppRegistry.registerComponent('AwesomeProject', () => StatusScreen);

