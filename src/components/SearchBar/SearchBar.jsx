import { Text, TextInput, View } from "react-native";
import { searchBarStyles } from "./SearchBarStyles";

export default function SearchBar({onChangeText}) {
  return(
    <View style={searchBarStyles.searchBar}>
      <TextInput style={searchBarStyles.textInput} placeholder="Search" onChangeText={onChangeText} />      
    </View>
  )
};
