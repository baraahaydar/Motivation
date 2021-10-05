import React, { useState, useContext } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import * as ImagePicker from "expo-image-picker";
import { Button, Icon, Input } from "../components";
import { Image } from "react-native-elements/dist/image/Image";
import { Images, argonTheme } from "../constants";
import SessionContext from "../components/session/SessionContext";

const { width, height } = Dimensions.get("screen");

let CreatePost = ({ navigation }) => {
  const {
    session: {
      user: { id },
    },
  } = useContext(SessionContext);
  
  const [description, setDescription] = useState("");
  const [image, setImage] = useState({
    uri: null,
  });

  const addPost = async () => {
    const url = `http://192.168.43.210:8080/api/posts`;
    let localUri = image.uri;
    let filename = localUri.split("/").pop();
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
    let body = null;
    body = new FormData();
    body.append("description", description);
    body.append("img", { uri: localUri, name: filename, type });
    body.append("admin_id", id);
    let res = await fetch(url, { body, method: "post" });
    if (res) {
      setDescription("");
      setImage({ uri: null });
      navigation.navigate("Home");
    }
  };

  let pickFromGallery = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  return (
    <Block flex middle>
      <StatusBar hidden />
      <ImageBackground
        source={Images.RegisterBackground}
        style={{ width, height, zIndex: 1 }}
      >
        <Block safe flex middle>
          <Block style={styles.registerContainer}>
            <Block flex>
              <Block flex={0.17} middle style={{ marginTop: 45 }}>
                <Text color="#8898AA" size={30} style={{ fontWeight: "bold" }}>
                  Create your Post here
                </Text>
              </Block>
              <Block flex center>
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior="padding"
                  enabled
                >
                  <Block
                    width={width * 0.8}
                    style={{ marginBottom: 45 }}
                  ></Block>
                  <View style={styles.textAreaContainer}>
                    <TextInput
                      style={styles.textArea}
                      underlineColorAndroid="transparent"
                      placeholder="Description"
                      placeholderTextColor="grey"
                      value={description}
                      numberOfLines={5}
                      multiline={true}
                      onChangeText={(text) => setDescription(text)}
                    />
                  </View>
                  <Text
                    color="#8898AA"
                    size={16}
                    center
                    style={{ marginBottom: 5 }}
                  >
                    Press here to take an image
                  </Text>
                  <TouchableOpacity onPress={pickFromGallery}>
                    <Image
                      source={{
                        uri: image.uri
                          ? image.uri
                          : "https://static.thenounproject.com/png/104062-200.png",
                      }}
                      style={{
                        width: 180,
                        height: 180,
                        marginLeft: 55,
                        borderRadius: 100,
                      }}
                    />
                  </TouchableOpacity>
                  <Block width={width * 0.8}></Block>
                  <Block row width={width * 0.75}></Block>
                  <Block middle>
                    <Button
                      onPress={addPost}
                      color="primary"
                      style={styles.createButton}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Create Post
                      </Text>
                    </Button>
                  </Block>
                </KeyboardAvoidingView>
              </Block>
            </Block>
          </Block>
        </Block>
      </ImageBackground>
    </Block>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden",
  },
  textAreaContainer: {
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    marginBottom: 30,
  },
  textArea: {
    height: 100,
    justifyContent: "flex-start",
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA",
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14,
  },
  inputIcons: {
    marginRight: 12,
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
});

export default CreatePost;
