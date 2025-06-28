import React from "react";
import { StyleSheet } from "react-native";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";
import { useSelector } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";


const rootNavigation = () => {
  // const isAuth = false;
  const isAuth = useSelector((state) => state.auth.isAuth);
  
  return (
    <NavigationContainer>
      {
        isAuth ? <UserStack/> : <AuthStack/>
      }
    </NavigationContainer>
  )
}

export default rootNavigation

const styles = StyleSheet.create({})