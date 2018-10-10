import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  FlatList,
  ActivityIndicator
 } from 'react-native';

import { SearchBar, List, ListItem } from 'react-native-elements'


const DisplayName = ({name, symbol}) => (
  <Text>{name}, {symbol}</Text>
)

export default class App extends React.Component {
  componentDidMount() {
   fetch('https://api.coinmarketcap.com/v2/listings/')
     .then(res => res.json())
     .then(json => {
       this.setState({apiOutput:json.data});
     })

  }
  state = {
    inputText: "",
    showText: "",
    apiOutput:null
  };

  _renderList = () => {
    return this.state.apiOutput.map(item => {
      return (
        // <Text>{item.name}</Text>
        <DisplayName
          name={item.name}
          symbol={item.symbol}
          key={item.id}
        />
      )
    })
  }

  _renderHeader = () => {
    return <SearchBar placeholder="Type Here..." lightTheme round />
  }

  _renderRow ({ item }) {
    const url = `https://s2.coinmarketcap.com/static/img/coins/64x64/${item.id}.png`
    return (
      <ListItem
        roundAvatar
        title={item.name}
        subtitle={item.symbol}
        avatar={{uri:url}}
      />
    )
  }

  _renderFooter = () => {
     if (!this.state.apiOutput) return null;

    return (
      <View style={{ paddingVertical: 20 }}>
        <ActivityIndicator animating size="large" />
      </View> )
  }

  _renderFlatList = () => {
    return (<FlatList
      data={this.state.apiOutput}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={this._renderHeader}
      ListFooterComponent={this._renderFooter}
      renderItem={this._renderRow}
      >
    </FlatList>)
  }

  render() {
    return (
      <List>
        { this.state.apiOutput ? this._renderFlatList() : <Text style={styles.loadingText}>Loading...</Text> }
      </List>
    )
  }
}

// const styles = StyleSheet.create({
const styles = {
  random: {
    flex:1,
    // justifyContent: 'center',
    // alignItems: 'center',

  },
  list: {
    marginTop:20,
    // backgroundColor: 'skyblue',
    // alignSelf:'center',
    // alignItems: 'stretch'

  },
  loadingText: {
    marginTop:10,
    fontSize: 40,


  }
  // button: {
  //   backgroundColor: "skyblue",
  //   height: 40,
  //   width: 80
  // },

}
// });
