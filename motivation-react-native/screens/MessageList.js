import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Dimensions, ScrollView, Text,
  View,} from "react-native";
import { Block, theme } from "galio-framework";
import Icoon from "react-native-vector-icons/AntDesign";
import Icoonn from "react-native-vector-icons/Entypo";

import { Card, Icon } from "../components";
import articles from "../constants/articles";
import SessionContext from "../components/session/SessionContext";

const { width } = Dimensions.get("screen");

let MessageList = ({ route, navigation }) => {
  const {
    session: {
      user: { id },
    },
    
  } = useContext(SessionContext);
  const [state, setState] = useState({
    notifications: [],
  });
  let getData = async () => {
    let url = `http://192.168.43.210:8080/api/notadmin/`+id;
    let res = await fetch(url);
    let result = await res.json();
    console.log(result);
    setState({ notifications: result });
  };
  useEffect(() => {
    const unsubscribe = navigation && navigation.addListener("focus", () => {
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
    {state.notifications.reverse().map((items) => (
        <View key={items.id} style={styles.textAreaContainer} >
      <Block style={styles.icon} >
              <Icoonn
                            size={30}
                          style={{color:"#f1c40f"}}
                            name="mail"
                          />
                          </Block>
                      <Text

                        style={styles.textArea}
                        underlineColorAndroid="transparent"
                        >
                       {items.message}
                       </Text>
                          
                    </View>
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
    textAlign:"center",
    display:"flex",
    flexDirection:"column",
    justifyContent:"center",
    marginTop:60
  },
  icon:{
    position:"absolute",
    marginLeft:150,
    marginBottom:5,
    marginTop:15
    
  },
 textAreaContainer: {
  backgroundColor: theme.COLORS.WHITE,
  marginVertical: theme.SIZES.BASE,
  borderWidth: 0,
  minHeight: 114,
  marginBottom: 15
  },
});

export default MessageList;
