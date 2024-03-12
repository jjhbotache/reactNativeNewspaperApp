import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export const mainPageStyles = StyleSheet.create({
  page:{
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#222',
    color: 'white',
    height: '100%',
  },
  articleContainer:{
    padding: 20,
    margin: 20,
    backgroundColor: '#444',
    borderRadius: 10,
    maxHeight: 300,
  }

});
