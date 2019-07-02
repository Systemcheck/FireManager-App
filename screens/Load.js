import React, { Component } from 'react';
import {
  ActivityIndicator,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default class Load extends Component {
  static load(cb) {
    setTimeout(cb,1000);
  }
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
        <ActivityIndicator
          animating={true}
          color="red"
          size="large"
          style={{margin: 15}}
        />
        <Text style={{color: 'white'}}>
          {this.props.loadingText} 
        </Text>
        </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
