import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useSelector } from "react-redux";
import AuthStack from "./AuthStack";
import UserStack from "./UserStack";
import AppModal from "../../shared/components/modals/AppModal";

export default function RootNavigation() {
  const isAuth = useSelector((state) => state.auth.isAuth);

  // isAuth null ise render etme, persist henüz yüklenmemiş olabilir
  if (isAuth === undefined || isAuth === null) return null;

  return (
    <NavigationContainer>
      {isAuth ? <UserStack /> : <AuthStack />}
      <AppModal />
    </NavigationContainer>
  );
}


// import React from "react";
// import { StyleSheet } from "react-native";
// import AuthStack from "./AuthStack";
// import UserStack from "./UserStack";
// import { useSelector } from "react-redux";
// import { NavigationContainer } from "@react-navigation/native";


// const rootNavigation = () => {
//   // const isAuth = false;
//   const isAuth = useSelector((state) => state.auth.isAuth);
  
//   return (
//     <NavigationContainer>
//       {
//         isAuth ? <UserStack/> : <AuthStack/>
//       }
//     </NavigationContainer>
//   )
// }

// export default rootNavigation

// const styles = StyleSheet.create({})