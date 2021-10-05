import React, { useContext } from "react";
import { Dimensions } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SessionContext from "../components/session/SessionContext";


// screens
import Home from "../screens/Home";
import Onboarding from "../screens/Onboarding";
import Profile from "../screens/Profile";
import Register from "../screens/Register";
import SignIn from "../screens/SignIn";
import CreatePost from "../screens/CreatePost";
import SendMessage from "../screens/SendMessage";
import MessageList from "../screens/MessageList";
import MyPosts from "../screens/MyPosts";
import PostDetails from "../screens/PostDetails";
import Noti from "../screens/Noti";
// drawer
import CustomDrawerContent from "./Menu";

// header for screens
import { Icon, Header } from "../components";

const { width } = Dimensions.get("screen");

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function SignInStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="SignIn" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}


function CreatePostStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="CreatePost"
        component={CreatePost}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="CreatePost" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}

function SendMessageStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="SendMessage"
        component={SendMessage}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="SendMessage" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}
function MyPostsStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="MyPosts"
        component={MyPosts}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="My Posts" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}

function MessageListStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="MessageList"
        component={MessageList}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Messagelist" navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}

function ProfileStack(props) {
  return (
    <Stack.Navigator initialRouteName="Profile" mode="card" headerMode="screen">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{
          header: ({ navigation, scene }) => (
            <Header
              transparent
              white
              title="Profile"
              navigation={navigation}
              scene={scene}
            />
          ),
          cardStyle: { backgroundColor: "#FFFFFF" },
          headerTransparent: true,
        }}
      />
    </Stack.Navigator>
  );
}

function HomeStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Home" optns navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}
function NotiStack(props) {
  return (
    <Stack.Navigator mode="card" headerMode="screen">
      <Stack.Screen
        name="Noti"
        component={Noti}
        options={{
          header: ({ navigation, scene }) => (
            <Header title="Noti" optns navigation={navigation} scene={scene} />
          ),
          cardStyle: { backgroundColor: "#F8F9FE" },
        }}
      />
    </Stack.Navigator>
  );
}

export default function OnboardingStack(props) {
  const {
    session: {
      user: { access_token },
    },
  } = useContext(SessionContext);
  return (
    <Stack.Navigator mode="card" headerMode="none">
      {access_token ? (
        <Stack.Screen name="App" component={AppStack} />
      ) : (
        <Stack.Screen name="SignIn" component={SignInStack} />
      )}
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        option={{
          headerTransparent: true,
        }}
      />
      <Drawer.Screen name="SignUpp" component={Register} />
      <Drawer.Screen name="Profile" component={ProfileStack} />

    </Stack.Navigator>
  );
}

function AppStack(props) {
  return (
    <Drawer.Navigator
      style={{ flex: 1 }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      drawerStyle={{
        backgroundColor: "white",
        width: width * 0.8,
      }}
      drawerContentOptions={{
        activeTintcolor: "white",
        inactiveTintColor: "#000",
        activeBackgroundColor: "transparent",
        itemStyle: {
          width: width * 0.75,
          backgroundColor: "transparent",
          paddingVertical: 16,
          paddingHorizonal: 12,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
          overflow: "hidden",
        },
        labelStyle: {
          fontSize: 18,
          marginLeft: 12,
          fontWeight: "normal",
        },
      }}
      initialRouteName="Home"
    >
      <Drawer.Screen name="Home" component={HomeStack} />
      {/* <Drawer.Screen name="SignIn" component={SignInStack} /> */}
      {/* <Drawer.Screen name="Articles" component={ArticlesStack} /> */}
      <Drawer.Screen name="CreatePost" component={CreatePostStack} />
      <Drawer.Screen name="MyPosts" component={MyPostsStack} />
      <Drawer.Screen name="SendMessage" component={SendMessageStack} />
      <Drawer.Screen name="MessageList" component={MessageListStack} />
      <Drawer.Screen name="PostDetails" component={PostDetails}/>
      <Drawer.Screen name="Noti" component={NotiStack}/>
    </Drawer.Navigator>
  );
}
