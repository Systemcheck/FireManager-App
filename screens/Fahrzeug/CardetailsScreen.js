import React, { Component } from 'react';
import { TouchableOpacity, Dimensions, ScrollView, AppRegistry, View,Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { ListItem} from 'react-native-elements';
import * as Haptic from 'expo-haptics';





var  colors = ['#ddd', '#efefef', 'red', '#666', 'rgba(0,0,0,.1)', '#ededed'];
var backgroundcolors = ['green', 'black', 'orange', 'blue', 'purple', 'pink'];

const formatData = (data, numColumns) => {
const numberOfFullRows = Math.floor(data.length / numColumns);

  let numberOfElementsLastRow = data.length - (numberOfFullRows * numColumns);
  while (numberOfElementsLastRow !== numColumns && numberOfElementsLastRow !== 0) {
    data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
    numberOfElementsLastRow++;
  }

  return data;
};

const numColumns = 3;

export default class Cardetails extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      cars: [],
      list: [],
      status: { key: 1, active: true},
      duration: 5,
      carid: this.props.navigation.getParam('id'),
      
     itemSelected: this.props.navigation.getParam('status')
    };
  }
onPressHandler(id) {
        this.setState({selectedItem: id});
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

  setCarStatus(id, status) {
    
    Haptic.notificationAsync(Haptic.NotificationFeedbackType.Info);  
     return fetch('http://www.wfmanager.de/ajax/setCar/'+id+'/'+status)
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
      list: responseJson.cars,
      cars: JSON.stringify(this.state.list)
    });
     this.props.navigation.goBack(null); 
      
    })
    
  }
  
  
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.getParam('name', 'A Nested Details Screen'),
    };
  };

  renderItem = ({ item, index }) => {
    if (item.empty === true) {
      return <View style={[styles.item, styles.itemInvisible]} />;
    }
    if (item.key == this.props.navigation.getParam('status')) {
      console.log(this.state.itemSelected);
      
    }
    return (
    
      <TouchableOpacity 
      
      onPress={() => {
        
        this.setState({ itemSelected: item.key });
        this.setCarStatus(this.state.carid, item.key)}} 
        disabled={this.state.itemSelected == item.key ? true : false}
        style={{ 
        backgroundColor: this.state.itemSelected == item.key ? '#47a44740' :'#47a447',
        
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        margin: 2,
        //marginTop: 50,
        height: Dimensions.get('window').width / numColumns -20, 
        borderWidth: 2,
        borderColor: 'darkgreen'}}
        >
        <Text style={styles.itemText}>{item.key}{item.id}</Text>
        <Text style={styles.itemText}>{item.text}</Text>
      </TouchableOpacity>
    );
  };


  render() {
  const data = [
  { key: '1', color: '#47a447', text: 'einsatzbereit über Funk' }, 
  { key: '2', color: '#47a447', text: 'einsatzbereit auf Wache' }, 
  { key: '3', color: '#47a447', text: 'Auftrag übernommen' }, 
  { key: '4', color: '#47a447', text: 'an Einsatzort' }, 
  { key: '5', color: '#47a447', text: 'Sprechwunsch' }, 
  { key: '6', color: '#47a447', text: 'nicht einsatzbereit' }
];

  const tasks = [
  { key: '1', color: '#47a447', text: 'Kontrollfahrt' }, 
  { key: '1', color: '#47a447', text: 'Tanken' }, 
  { key: '1', color: '#47a447', text: 'Ausbildung' }, 
  { key: '1', color: '#47a447', text: 'Fahrzeug waschen' }, 

];
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
       <ScrollView> 
     <View style={{padding: 15}}>
            <Text h5 style={{color:"white"}}>Status setzen</Text>
          </View>
         {
          data.map((item, i) => (
            <ListItem
              button
              onPress={() => {
               this.setState({ itemSelected: item.key });
        this.setCarStatus(this.state.carid, item.key)
            }}
              containerStyle={{borderBottomWidth: 1, borderBottomColor: '#00000050', backgroundColor: '#d2312d73'}}
            
             key={i}
              title={this.state.itemSelected == item.key ? 'Status: '+item.key+' (Aktiv)' : 'Status: '+item.key}
              
              chevronColor="transparent"
              chevron
              titleStyle={{ 
                color: 'white', 
                 
              }}
              subtitleStyle={{ color: 'white' }}
            />
          ))
         }
      <View style={{padding: 15}}>
            <Text h5 style={{color:"white"}}>Tätigkeiten</Text>
          </View>
         {
          tasks.map((item, i) => (
            <ListItem
              button
              onPress={() => {
               this.setState({ itemSelected: item.key });
        this.setCarStatus(this.state.carid, item.key)
            }}
              containerStyle={{borderBottomWidth: 1, borderBottomColor: '#00000050', backgroundColor: '#d2312d73'}}
            
             key={i}
              title={item.text}
              
              chevronColor="transparent"
              chevron
              titleStyle={{ 
                color: 'white', 
                 
              }}
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
AppRegistry.registerComponent('AwesomeProject', () => Cardetails);

