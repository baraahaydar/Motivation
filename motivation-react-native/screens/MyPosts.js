import React, { useEffect, useState, useContext } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Text,
  Alert,
} from "react-native";
import { Block, theme } from "galio-framework";
import { Card, Button } from "react-native-elements";
import SessionContext from "../components/session/SessionContext";

const { width } = Dimensions.get("screen");

let MyPosts = ({ route, navigation }) => {
  const store = "http://192.168.43.210:8080/storage/images/";

  let handleDelete = async (id) => {
    Alert.alert("Warning", "Are you sure to delete this post", [
      {
        text: "Cancel",

        style: "cancel",
      },
      {
        text: "OK",
        onPress: async () => {
          const url = "http://192.168.43.210:8080/api/posts/" + id;

          await fetch(url, { method: "delete" });

          getData();
        },
      },
    ]);
  };
  const {
    session: {
      user: { id },
    },
  } = useContext(SessionContext);
  const [state, setState] = useState({
    posts: [],
  });
  let getData = async () => {
    let url = `http://192.168.43.210:8080/api/postadmin/` + id;
    let res = await fetch(url);
    let result = await res.json();
    console.log(result);
    setState({ posts: result });
  };
  useEffect(() => {
    const unsubscribe =
      navigation &&
      navigation.addListener("focus", () => {
        getData();
      });
    getData();
    return unsubscribe;
  }, [navigation]);

  let renderArticles = () => {
    return (
      
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          {state.posts.reverse().map((items) => (
            <Card key={items.id}>
              <Card.Image
                style={{ borderRadius: 10 }}
                source={{ uri: store + items.image }}
              ></Card.Image>
              <Text style={styles.textArea}>{items.description}</Text>
              <Button
                buttonStyle={{
                  borderRadius: 10,
                  marginLeft: 0,
                  marginRight: 0,
                  marginBottom: 0,
                  backgroundColor: "#233DD2",
                }}
                onPress={() => {
                  handleDelete(items.id);
                }}
                title="Delete"
              />
            </Card>
          ))}
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
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    margin: 10,
  },
  icon: {
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
  },
  textAreaContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    backgroundColor: "#95a5a6",
    height: 180,
    marginTop: 10,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
    borderColor: "transparent",
    borderWidth: 1,
    padding: 5,
  },
});

export default MyPosts;
