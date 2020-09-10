import * as React from "react";
import { WebView } from "react-native-webview";
import { ActivityIndicator } from "react-native-paper";
import Cons from "expo-constants";
export default class Shop extends React.Component {
  render() {
    return (
      <WebView
        containerStyle={{ flex: 1 }}
        renderLoading={() => (
          <View style={{ flex: 1 }}>
            <ActivityIndicator size="large" />
          </View>
        )}
        source={{ uri: "https://bridgetmariecentre.org/shop/" }}
        style={{ flex: 1, marginTop: Cons.statusBarHeight }}
      />
    );
  }
}
