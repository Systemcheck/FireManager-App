import * as React from 'react';
import { ListItem, Text, Button} from 'react-native-elements';
import { View, StyleSheet } from 'react-native';
import ReactDOM from 'react-dom';






class MainScreen extends React.Component {
  render() {
    return (
   
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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

export default MainScreen

 
