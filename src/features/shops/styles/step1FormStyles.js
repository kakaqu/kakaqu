// 📁 styles/step1FormStyles.js
import { StyleSheet } from "react-native";
import CustomTheme from "../../../shared/styles/CustomThems";

const styles = StyleSheet.create({
  stepDescription: {
    fontSize: 14,
    color: CustomTheme.colors.text,
    textAlign: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  avatarHint: {
    fontSize: 12,
    color: CustomTheme.colors.text,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    width: "100%",
    paddingVertical: 15,
  },
});

export default styles;
