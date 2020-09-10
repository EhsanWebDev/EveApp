import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { Title, ActivityIndicator, Avatar, Button } from "react-native-paper";

// import { Container } from './styles';

const UserProfile = ({ route }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    setUser(route.params.props);
  }, []);
  if (user) {
    return (
      <View style={{ flex: 1, marginHorizontal: 20, marginTop: 40 }}>
        <View style={{ flex: 1, alignItems: "center" }}>
          <Avatar.Text label={user.name.slice(0, 1)} />
          <Title style={{ marginTop: 10 }}>{user.name}</Title>
        </View>

        <Button
          mode="contained"
          icon="account-star"
          style={{ marginBottom: 20, marginHorizontal: 40, borderRadius: 5 }}
        >
          Follow
        </Button>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
};

export default UserProfile;
