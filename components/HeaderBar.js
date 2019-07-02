import * as React from 'react';
import { Appbar, FAB, Portal, Provider, BottomNavigation } from 'react-native-paper';
import { ListItem, Text, Button} from 'react-native-elements';
import { LinearGradient, Constants, BarCodeScanner, Permissions } from 'expo'; 
import { View, StyleSheet } from 'react-native';
import ReactDOM from 'react-dom';






class HeaderBar extends React.Component {
  render() {
    return (
      
      <View style={{ flex: 1, height: 30, alignItems: "center", justifyContent: "center" }}>
        <Text>Main Screen</Text>
        
        <Text>Settings!</Text>
        <Button
          title="Go to Home"
          onPress={() => this.props.navigation.navigate('Home')}
        />
     
      </View>
    );
  }
}

export default HeaderBar