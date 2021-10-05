import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  TouchableNativeFeedback,
} from "react-native";
import { Block, theme } from "galio-framework";
import Icoon from "react-native-vector-icons/AntDesign";
import { Header } from "../components";
import { Card } from "react-native-elements";
import sessionContext from "../components/session/SessionContext";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/core";

const { width } = Dimensions.get("screen");
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

let PostDetails = ({ route, navigation, scene }) => {
  const store = "http://192.168.43.210:8080/storage/images/";
  const [state, setState] = useState({
    posts: [],
  });

  const [nbLikes, setNbLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const {
    session: {
      user: { id },
    },
  } = useContext(sessionContext);

  let giveLike = async () => {
    setNbLikes(nbLikes + 1);
    setLiked(true);
    const url = "http://192.168.43.210:8080/api/likes";
    let body;
    body = new FormData();
    body.append("admin_id", id);
    body.append("post_id", route.params.item.id);
    await fetch(url, { body, method: "post" });
  };

  let getnbLikes = async () => {
    let urll =
      `http://192.168.43.210:8080/api/likespost/` + route.params.item.id;
    let res = await fetch(urll);
    let result = await res.json();
    setNbLikes(result.length);
  };

  let checkLiked = async () => {
    let res = await fetch(
      `http://192.168.43.210:8080/api/likespostuser/${route.params.item.id}/${id}`
    );
    let result = await res.json();
    console.log(result);
    if (result.length > 0) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  };
  let unlike = () => {
    setNbLikes(nbLikes - 1);
    setLiked(false);
    fetch(
      `http://192.168.43.210:8080/api/likespostuser/${route.params.item.id}/${id}`,
      { method: "delete" }
    );
  };

  useFocusEffect(
    React.useCallback(() => {
      getnbLikes();
      checkLiked();
    }, [route.params.item.id])
  );

  let renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Header
          title="Post Details"
          navigation={navigation}
          scene={scene}
          style={{ width: 500 }}
        />

        <Block flex style={{ width: 400, marginLeft: -15 }}>
          <Card>
            <Card.Image
              style={{ borderRadius: 10, width: 300, height: 250 }}
              source={{ uri: store + route.params.item.image }}
            ></Card.Image>
            <Text style={styles.textArea}>{route.params.item.description}</Text>
            <TouchableNativeFeedback>
              {liked ? (
                <Icoon
                  size={20}
                  style={{ color: "red", marginLeft: 5 }}
                  onPress={() => unlike()}
                  name="heart"
                  family="AntDesign"
                />
              ) : (
                <Icoon
                  size={20}
                  style={{ color: "black", marginLeft: 5 }}
                  onPress={() => giveLike()}
                  name="hearto"
                  family="AntDesign"
                />
              )}
            </TouchableNativeFeedback>
            <Text style={{ margin: 5 }}>{nbLikes} Likes</Text>
          </Card>
        </Block>
      </ScrollView>
    );
  };
  return (
    <Block flex center style={styles.home}>
      {renderArticles()}
    </Block>
  );
};
const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  textArea: {
    color: "#233DD2",
    display: "flex",
    flexDirection: "column",
    margin: 20,
    marginBottom: 10,
    marginRight: 50,
    marginLeft: 1,
  },
});
const styles1 = StyleSheet.create({
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
});
export default PostDetails;
