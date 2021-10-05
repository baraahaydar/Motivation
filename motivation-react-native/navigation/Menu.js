import React, { useContext } from "react";
import { ScrollView, StyleSheet, Image } from "react-native";
import { Block, Text, theme } from "galio-framework";
import SessionContext from "../components/session/SessionContext";
import Icoon from "react-native-vector-icons/AntDesign";

import { Button, DrawerItem as DrawerCustomItem } from "../components";

function CustomDrawerContent({
  drawerPosition,
  navigation,
  profile,
  focused,
  state,
  ...rest
}) {
  const screens = [
    "Home",
    "Profile",
    "MyPosts",

  ];
  const {
    actions: { logout },
  } = useContext(SessionContext);
  return (
    <Block
      style={styles.container}
      forceInset={{ top: "always", horizontal: "never" }}
    >
      <Block flex={0.06} style={styles.header}>
        <Text color="#512D6D" style={{ marginLeft: 8, fontWeight: "bold" }}>
          /\/\OTIVATION ^_^
        </Text>
      </Block>
      <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
        <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {screens.map((item, index) => {
            return (
              <DrawerCustomItem
                title={item}
                key={index}
                navigation={navigation}
                focused={state.index === index ? true : false}
              />
            );
          })}
          

          <Button title="Logout" onPress={logout} style={{ marginTop: 340,width:258 }}>
            <Text style={{ color: "white" , marginRight:100, fontSize:16}}> 
              <Icoon name="login"  size={16} style={{ color: "white", }} />
              {"                  "}
          Logout
            </Text>
          </Button>
        </ScrollView>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 28,
    paddingBottom: theme.SIZES.BASE,
    paddingTop: theme.SIZES.BASE * 3,
    justifyContent: "center",
  },
});

export default CustomDrawerContent;
