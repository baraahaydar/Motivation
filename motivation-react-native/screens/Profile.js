import React, { useContext,useEffect } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
  View,
  AsyncStorage,
} from "react-native";
import { Block, Text, theme } from "galio-framework";
import { Header } from "../components";
import { Button } from "../components";
import { Images, argonTheme } from "../constants";
import { HeaderHeight } from "../constants/utils";
import { TextInput } from "react-native";
import { useState } from "react";
import SessionContext from "../components/session/SessionContext";
import SessionProvider from '../components/session/SessionProvider';
const { width, height } = Dimensions.get("screen");

const thumbMeasure = (width - 48 - 32) / 3;
function Profile({ navigation, scene }) {
  const {
    session: {
      user: { id, firstName, lastName, email, password },
    },
      actions: { updateSession },
  } = useContext(SessionContext);

  const [firstName1, setfirstName] = useState(firstName);
  const [lastName1, setlastName] = useState(lastName);
  const [email1, setEmail] = useState(email);
  const [password1, setpassword] = useState(password);

  let handleEdit = async ({navigation}) => {
    const url = "http://192.168.43.210:8080/api/admin/" + id;
    let firstName = firstName1;
    let lastName = lastName1;
    let email = email1;
    let password = password1;
    let body = null;

    body = new FormData();
    body.append(`firstName`, firstName);
    body.append(`lastName`, lastName);
    body.append(`email`, email);
    body.append(`password`, password);
    const response = await fetch(url, { method: "post", body });
    let result = await response.json();
    if (result.success) {
      console.log(result);
      updateSession({user:{firstName,lastName}});
      alert("Save Success");
    } else {
      window.alert("Unable To Save");
    }
  };
  return (
    <Block flex style={styles.profile}>
      <Block flex>
        <ImageBackground
          source={Images.ProfileBackground}
          style={styles.profileContainer}
          imageStyle={styles.profileBackground}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width, marginTop: "25%" }}
          >
            <Block flex style={styles.profileCard}>
              <Block middle style={styles.avatarContainer}></Block>
              <Block style={styles.info}>
                <Block
                  middle
                  row
                  space="evenly"
                  style={{ marginTop: 20, paddingBottom: 24 }}
                ></Block>
              </Block>
              <Block flex>
                <Block middle style={styles.nameInfo}>
                  <Text bold size={28} color="#32325D">
                    {"Welcome"} {firstName} {lastName}
                  </Text>
                </Block>
                <Block middle style={{ marginTop: 30, marginBottom: 16 }}>
                  <Block style={styles.divider} />
                </Block>
                <Block middle>
                  <Text
                    size={16}
                    color="#525F7F"
                    style={{ textAlign: "center" }}
                  >
                    Stay Motivated
                  </Text>
                  <Button
                    color="transparent"
                    textStyle={{
                      color: "#233DD2",
                      fontWeight: "500",
                      fontSize: 16,
                    }}
                    onPress={() => {
                      navigation.navigate("CreatePost");
                    }}
                  >
                    Create New Post
                  </Button>
                  <Button
                    color="transparent"
                    textStyle={{
                      color: "#233DD2",
                      fontWeight: "500",
                      fontSize: 16,
                    }}
                    onPress={() => {
                      navigation.navigate("SendMessage");
                    }}
                  >
                    Send Message
                  </Button>
                  {/* <Button
                    color="transparent"
                    textStyle={{
                      color: "#233DD2",
                      fontWeight: "500",
                      fontSize: 16,
                    }}
                    onPress={() => {
                      navigation.navigate("Noti");
                    }}
                  >
                    Noti
                  </Button> */}
                </Block>
                <Block row space="between">
                  <Block style={{ margin: 50 }}>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={{ marginBottom: 10, marginTop: 10 }}
                    >
                      First Name:
                    </Text>
                    <View style={styles.textAreaContainer}>
                      <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="First Name"
                        placeholderTextColor="grey"
                        value={firstName1}
                        onChangeText={(firstName1) => setfirstName(firstName1)}
                      />
                    </View>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={{ marginBottom: 10, marginTop: 10 }}
                    >
                      Last Name:
                    </Text>

                    <View style={styles.textAreaContainer}>
                      <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Last Name"
                        placeholderTextColor="grey"
                        value={lastName1}
                        onChangeText={(lastName1) => setlastName(lastName1)}
                      />
                    </View>
                    <Text
                      size={16}
                      color="#525F7F"
                      style={{ marginBottom: 10, marginTop: 10 }}
                    >
                      Email:
                    </Text>

                    <View style={styles.textAreaContainer}>
                      <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Email"
                        placeholderTextColor="grey"
                        value={email1}
                        onChangeText={(email1) => setEmail(email1)}
                      />
                    </View>
                    {/* <Text
                      size={16}
                      color="#525F7F"
                      style={{ marginBottom: 10, marginTop: 10 }}
                    >
                      Password:
                    </Text>

                    <View style={styles.textAreaContainer}>
                      <TextInput
                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        placeholder="Password"
                        placeholderTextColor="grey"
                        value={password1}
                        onChangeText={(password1) => setpassword(password1)}
                   
                      />
                    </View> */}
                    <Button
                      onPress={handleEdit}
                      color="primary"
                      style={styles.createButton}
                    >
                      <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                        Save
                      </Text>
                    </Button>
                  </Block>
                </Block>
              </Block>
            </Block>
          </ScrollView>
        </ImageBackground>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  profile: {
    marginTop: Platform.OS === "android" ? -HeaderHeight : 0,
    flex: 1,
  },
  profileContainer: {
    width: width,
    height: height,
    padding: 0,
    zIndex: 1,
  },
  textArea: {
    width: 200,
    justifyContent: "flex-start",
  },
  profileBackground: {
    width: width,
    height: height / 2,
  },
  profileCard: {
    padding: theme.SIZES.BASE,
    marginHorizontal: theme.SIZES.BASE,
    marginTop: 65,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 8,
    shadowOpacity: 0.2,
    zIndex: 2,
  },
  textAreaContainer: {
    shadowColor: "black",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 4,
    shadowOpacity: 0.1,
    elevation: 2,
    borderColor: "transparent",
    borderWidth: 1,
    padding: 5,
  },
  info: {
    paddingHorizontal: 40,
  },
  avatarContainer: {
    position: "relative",
    marginTop: -80,
  },
  avatar: {
    width: 124,
    height: 124,
    borderRadius: 62,
    borderWidth: 0,
  },
  nameInfo: {
    marginTop: 35,
  },
  divider: {
    width: "90%",
    borderWidth: 1,
    borderColor: "#E9ECEF",
  },
  thumb: {
    borderRadius: 4,
    marginVertical: 4,
    alignSelf: "center",
    width: thumbMeasure,
    height: thumbMeasure,
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25,
  },
});

export default Profile;
