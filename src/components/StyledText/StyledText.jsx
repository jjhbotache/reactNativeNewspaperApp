import { StyleSheet,Text } from "react-native";
import { primaryColor, secondaryColor } from "../../constants/styleConstants";

const styles = StyleSheet.create({
  global: {
    // maxHeight: 100,
  },

  sm: {
    fontSize: 16,
  },
  md: {
    fontSize: 24,
  },
  lg: {
    fontSize: 46,
  },

  primary: {
    color: primaryColor,
  },
  secondary: {
    color: secondaryColor,
  },
  white: {
    color: "white",
  },
  black: {
    color: "black",
  },


  bold: {
    fontWeight: "bold",
  },
})


export default function StyledText({
  children,
  size, //  "sm" | "md" | "lg" 
  color, // "primary" | "secondary"
  bold, // boolean
}) {


  const stylesToBeApplied = [
    styles.global,
    styles[size],
    styles[color],
    bold && styles.bold,
  ]
  return (
    <Text style={stylesToBeApplied}>
      {children}
    </Text>
  );  
};


