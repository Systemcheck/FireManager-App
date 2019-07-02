import React, { Component } from 'react';
import { TouchableOpacity, Button, View } from 'react-native';
import { BottomNavigation, Text } from 'react-native-paper';
import Page  from '../screens/Page';
import Scanner  from '../screens/Scanner';


const MusicRoute = () =>   <View>
          <Text>Sign Screen</Text><Button
          title="Go to Account... again"
          onPress={() => this.state.routes('music')}
        />
        <Button
          title="Page"
          onPress={() => this.state.routes('music')}
        />
        <Button
          title="Go back"
          onPress={() => this.state.routes('music')}
        />
         <Text>Music</Text>
        </View>;

const AlbumsRoute = () => <Text>Albums</Text>;

const RecentsRoute = () => <Text>Recents</Text>;
export default class Bottomtabs extends React.Component {
  state = {
    index: 0,
    routes: [
      { key: 'music', title: 'Music', icon: 'person' },
      { key: 'scanner', title: 'Scanner', icon: 'barcode' },
      { key: 'recents', title: 'Recents', icon: 'recents' },
      { key: 'page', title: 'Page', icon: 'folder'  },
    ],
  };

  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    music: MusicRoute,
    albums: AlbumsRoute,
    recents: RecentsRoute,
    page: Page,
    scanner: Scanner,
  });

  render() {
    return (
      <BottomNavigation
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
      />
    );
  }
}