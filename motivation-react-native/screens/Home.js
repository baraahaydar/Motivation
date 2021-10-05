import React, { useEffect, useState } from "react";
import { StyleSheet, Dimensions, ScrollView, Text , TouchableOpacity} from "react-native";
import { Block, theme } from "galio-framework";
import Icoon from "react-native-vector-icons/AntDesign";
import { Card } from "../components";
import { Button } from "galio-framework";
import MessageList from "../screens/MessageList";
const iPhoneX = () => Platform.OS === 'ios' && (height === 812 || width === 812 || height === 896 || width === 896);
import argonTheme from '../constants/Theme';

const { width } = Dimensions.get("screen");


let Home = ({ route, navigation }) => {
  const store = "http://192.168.43.210:8080/storage/images/";
  const [state, setState] = useState({
    posts: [],
  });
  const [tab,setTab]=useState(0);
  let getData = async () => {
    let url = `http://192.168.43.210:8080/api/posts`;
    let res = await fetch(url);
    let result = await res.json();
    setState({ posts: result });
  };
  useEffect(() => {
    const unsubscribe = navigation && navigation.addListener("focus", () => {
      getData();
    });
    getData();
    return unsubscribe;
  }, [navigation]);


  let renderOptions = () => {

    return (
      <Block row style={styles1.options}>
        {/* ///////////////////Message///////////////////////////// */}
        <Button onPress={()=>setTab(1)} shadowless style={[styles1.tab, styles1.divider]} >
          <Block row middle>
            <Icoon size={20} name="inbox" family="FontAwesome5" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON} />
            <Text size={16} style={styles1.tabTitle}>{'Message'}</Text>
          </Block>
        </Button>
        <Button onPress={()=>setTab(0)} shadowless style={styles1.tab} >
          <Block row middle>
            <Icoon size={20} name="home" family="AntDesign" style={{ paddingRight: 8 }} color={argonTheme.COLORS.ICON}/>
            <Text size={16} style={styles1.tabTitle}>{'Post'}</Text>
          </Block>
        </Button>
      </Block>
    );
  }


  let renderArticles = () => {
    return (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.articles}
      >
        <Block flex>
          { state.posts.reverse().map((items) => (
              <TouchableOpacity    key={items.id} onPress={()=>
              {
             navigation.navigate('PostDetails',{item:items})
              }}>
            <Card
           
              item={{
                title:items.description,
                image: `${store}` + items.image,
                horizontal: true,
              }}
              full
            >
              {" "}
            </Card>
            </TouchableOpacity>
          ))}
        </Block>
      </ScrollView>
    );
  };

  return (
    <Block flex center style={styles.home}>

      {
        tab===0 ? 
      renderArticles()
      :
      <MessageList/>
      }
      {renderOptions()}
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
});


const styles1 = StyleSheet.create({
  button: {
    padding: 12,
    position: 'relative',
  },
  title: {
    width: '100%',
    fontSize: 16,
    fontWeight: 'bold',
  },
  navbar: {
    paddingVertical: 0,
    paddingBottom: theme.SIZES.BASE * 1.5,
    paddingTop: iPhoneX ? theme.SIZES.BASE * 4 : theme.SIZES.BASE,
    zIndex: 5,
  },
  shadow: {
    backgroundColor: theme.COLORS.WHITE,
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.2,
    elevation: 3,
  },
  notify: {
    backgroundColor: argonTheme.COLORS.LABEL,
    borderRadius: 4,
    height: theme.SIZES.BASE / 2,
    width: theme.SIZES.BASE / 2,
    position: 'absolute',
    top: 9,
    right: 12,
  },
  header: {
    backgroundColor: theme.COLORS.WHITE,
  },
  divider: {
    borderRightWidth: 0.3,
    borderRightColor: theme.COLORS.ICON,
  },
  search: {
    height: 48,
    width: width - 32,
    marginHorizontal: 16,
    borderWidth: 1,
    borderRadius: 3,
    borderColor: argonTheme.COLORS.BORDER
  },
  options: {
    marginBottom: 24,
    marginTop: 10,
    elevation: 4,
  },
  tab: {
    backgroundColor: theme.COLORS.TRANSPARENT,
    width: width * 0.35,
    borderRadius: 0,
    borderWidth: 0,
    height: 24,
    elevation: 0,
  },
  tabTitle: {
    lineHeight: 19,
    fontWeight: '400',
    color: argonTheme.COLORS.HEADER
  },
});


export default Home;
