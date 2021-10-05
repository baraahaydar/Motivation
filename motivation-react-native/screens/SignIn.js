import React, { useLayoutEffect } from "react";
import {
  StyleSheet,
  ImageBackground,
  Dimensions,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { Block,  Text } from "galio-framework";
import { useContext, useState } from "react";
import SessionContext from '../components/session/SessionContext';

import { Button, Icon, Input } from "../components";
import { Images, argonTheme } from "../constants";
import { TouchableOpacity } from "react-native";


const { width, height } = Dimensions.get("screen");

function SignIn({navigation}){
  
  const {
    actions: { login },
  } = useContext(SessionContext);

  const [email, Setemail] = useState('');
  const [password, SetPassword] = useState('');


  
  let handleSubmit=()=> {
    login({email,password});
   
  }

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
                   Sign-IN here
                  </Text>
                </Block>
                <Block flex center>
                  <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior="padding"
                    enabled
                  >
                    <Block width={width * 0.8} style={{ marginBottom: 75 }}>
                    </Block>
                    <Block width={width * 0.8} style={{ marginBottom: 15 }}>
                      <Input
                        borderless
                        placeholder="Email"
                        onChangeText={(t)=>Setemail(t)}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="ic_mail_24px"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                         
                           />
                        }
                      />
                    </Block>
                    <Block width={width * 0.8}>
                      <Input
                        password
                        borderless
                        placeholder="Password"
                        onChangeText={(t)=>SetPassword(t)}
                        iconContent={
                          <Icon
                            size={16}
                            color={argonTheme.COLORS.ICON}
                            name="padlock-unlocked"
                            family="ArgonExtra"
                            style={styles.inputIcons}
                         
                          />
                        }
                      />
                     
                    </Block>
                    <Block row width={width * 0.75}>
                    </Block>
                    <Block middle>
                      <Button onPress={handleSubmit} color="primary" style={styles.createButton}>
                        <Text bold size={14} color={argonTheme.COLORS.WHITE}>
                          Sign IN
                        </Text>
                      </Button>
                    </Block>
                     <Block row style={styles.passwordCheck}>
                        <Text size={12} color={argonTheme.COLORS.MUTED}>
                        Or you can create an account if you don't have:
                        </Text>
                        <TouchableOpacity onPress={()=>
                        navigation.navigate('SignUpp')} hitSlop={{top: 20, bottom: 20, left: 50, right: 50}}>
        <Text style={{color:"blue"}} >
          {" "}
           SignUp 
         </Text>
    </TouchableOpacity>
                      </Block>
                  </KeyboardAvoidingView>
                </Block>
              </Block>
            </Block>
          </Block>
        </ImageBackground>
      </Block>
    );
  }


const styles = StyleSheet.create({
  registerContainer: {
    width: width * 0.9,
    height: height * 0.875,
    backgroundColor: "#F4F5F7",
    borderRadius: 4,
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1,
    overflow: "hidden"
  },
  socialConnect: {
    backgroundColor: argonTheme.COLORS.WHITE,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: "#8898AA"
  },
  socialButtons: {
    width: 120,
    height: 40,
    backgroundColor: "#fff",
    shadowColor: argonTheme.COLORS.BLACK,
    shadowOffset: {
      width: 0,
      height: 4
    },
    shadowRadius: 8,
    shadowOpacity: 0.1,
    elevation: 1
  },
  socialTextButtons: {
    color: argonTheme.COLORS.PRIMARY,
    fontWeight: "800",
    fontSize: 14
  },
  inputIcons: {
    marginRight: 12
  },
  passwordCheck: {
    paddingLeft: 15,
    paddingTop: 13,
    paddingBottom: 30
  },
  createButton: {
    width: width * 0.5,
    marginTop: 25
  }
});

export default SignIn;
