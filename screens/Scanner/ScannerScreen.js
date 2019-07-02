import * as React from 'react';
import { Text, View, Button, FlatList } from 'react-native';

import { BarCodeScanner } from 'expo-barcode-scanner';
import * as Permissions from 'expo-permissions';
import { Card } from 'react-native-elements';
import * as Haptic from 'expo-haptics';

class Test extends React.Component {
  state = {
    hasCameraPermission: null,
    scanned: false,
    fetchdata: [],
  };

  
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  render() {
    const { hasCameraPermission, scanned } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : this.handleBarCodeScanned}
          style={{flex: 1}}
        />

         {scanned && (
        <FlatList
          style={{flex: 2}}
          data={this.state.fetchdata.items}
          renderItem={({item}) => 
          <Card
            title={item.name}
            >
            <Text style={{marginBottom: 10}}>
              Lager/Fach: {item.lager}
            </Text>
            <Text style={{marginBottom: 10}}>
              Nächste Prüfung: {item.nextaudit}
            </Text>
            <Button
            title={'Scannen Wiederholen'}
            onPress={() => this.setState({ scanned: false })}
          /></Card> } 

          keyExtractor={({id}, index) => id}
        />

       
        
         
        )}
      </View>
    );
  }

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    Haptic.notificationAsync(Haptic.NotificationFeedbackType.Info);
    
  return fetch('http://www.wfmanager.de/ajax/items/'+data)
    .then((response) => response.json())
    .then((responseJson) => {
      Haptic.notificationAsync(Haptic.NotificationFeedbackType.Success);
      this.setState({
      fetchdata: responseJson
    });
       
    })
    .catch((error) => {
      console.error(error);
      alert(error);
    });

    
  };
}
export default Test;
