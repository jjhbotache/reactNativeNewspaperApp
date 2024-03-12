import { StyleSheet, View } from "react-native"


export default function Separator({mv=5}) {
  const styles = StyleSheet.create({
    separator: {
      borderBottomColor: 'white',
      borderBottomWidth: 2,
      marginVertical: mv,
      marginHorizontal: 12,
    }
  })
  return <View style={styles.separator} />  
};
