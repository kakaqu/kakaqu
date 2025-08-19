import { StyleSheet } from "react-native";
import CustomTheme from "../../../shared/styles/CustomThems";

export default StyleSheet.create({
  container: {
    marginTop: 10,
    backgroundColor: CustomTheme.colors.white, // modern açık gri
    padding: 10,
    flex: 1,
  },
  mapLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151", // koyu gri
    marginTop: 5,
    marginBottom: 10,
  },
  map: {
    width: "100%",
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB", // gri çerçeve
    marginBottom:10
  },
  errorText: {
    color: "#DC2626", // kırmızı
    fontSize: 13,
    marginTop: 5,
  },
  submitButton: {
    width: "100%",
    paddingVertical: 15,
  },
  backButton: {
    marginTop: 15,
    alignSelf: "center",

  },
  backText: {
    fontSize: 14,
    color: CustomTheme.colors.primary, // gri
    textDecorationLine: "underline",
  },
});
