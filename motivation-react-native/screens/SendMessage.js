import React, { useState, useContext } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView,
  TextInput,
  View,
} from "react-native";
import { Block, Text, theme } from "galio-framework";

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import SessionContext from "../components/session/SessionContext";

const { width, height } = Dimensions.get("screen");

let SendMessage = ({ navigation }) => {
  const {
    session: {
      user: { id },
    },
  } = useContext(SessionContext);
  const [message, setMessage] = useState();

  const sendsms = async () => {
    const url = `http://192.168.43.210:8080/api/notifications`;
    let body = null;
    body = new FormData();
    body.append("message", message);
    body.append("admin_id", id);
    let res = await fetch(url, { body, method: "post" });
    let result = await res.json();
    if (res) {
      setMessage("");
      navigation.navigate("MessageList");
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
              <Block flex={0.17} middle style={{ marginTop: 75 }}>
                <Text color="#8898AA" size={30} style={{ fontWeight: "bold" }}>
                  Send Message here
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
                    style={{ marginBottom: 75 }}
                  ></Block>
                  <View style={styles.textAreaContainer}>
                    <TextInput
                      style={styles.textArea}
                      underlineColorAndroid="transparent"
                      placeholder="Message"
                      placeholderTextColor="grey"
                      value={message}
                      numberOfLines={5}
                      multiline={true}
                      onChangeText={(text) => setMessage(text)}
                    />
                  </View>
                  <Block width={width * 0.8}>
                    <Block row style={styles.passwordCheck}></Block>
                  </Block>
                  <Block row width={width * 0.75}></Block>
                  <Block middle>
                    <Button
                      onPress={sendsms}
                      color="primary"
                      style={styles.createButton}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Send Message
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
  },
  textArea: {
    height: 80,
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

export default SendMessage;
