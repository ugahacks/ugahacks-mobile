import { StyleSheet } from "react-native";

const Styles = StyleSheet.create({
  login_container: {
    flex: 1,
    backgroundColor: "#161618",
  },
  container: {
    backgroundColor: "#e3e3e3",
  },
  login_header: {
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "#161618",
  },
  home_header: {
    backgroundColor: "#252526",
  },
  login_header_logo: {
    width: 220,
    resizeMode: "contain",
  },
  login_header_text: {
    marginTop: 15,
    color: "#f0f0f0",
    fontSize: 24,
  },
  login_header_text_bold: {
    fontSize: 32,
    color: "#DC4141",
    fontWeight: "bold",
  },
  login_wrapper: {
    paddingVertical: 40,
    borderTopRightRadius: 12,
    borderTopLeftRadius: 12,
    marginTop: -10,
    backgroundColor: "#161618",
    alignItems: "center",
  },
  form: {
    width: "100%",
    maxWidth: 280,
  },
  form_input: {
    height: 44,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#EDF0F7",
    borderRadius: 50,
  },
  clue_submit_button: {
    height: 44,
    paddingHorizontal: 20,
    marginBottom: 20,
    backgroundColor: "#EDF0F7",
    borderRadius: 50,
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    backgroundColor: "#DC4141",
    borderRadius: 50,
  },
  scavenger_hunt_button: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    backgroundColor: "white",
    borderRadius: 50,
  },
  scavenger_hunt_button_disabled: {
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    backgroundColor: "#00ab41",
    borderRadius: 50,
  },
  button_label: {
    color: "#fff",
    fontSize: 15,
  },
  login_social: {
    width: "100%",
    maxWidth: 280,
    marginTop: 20,
  },
  login_social_separator: {
    flexDirection: "row",
    alignItems: "center",
  },
  login_social_separator_line: {
    flex: 1,
    width: "100%",
    height: 1,
    backgroundColor: "#7f7f7f",
  },
  login_social_separator_text: {
    marginHorizontal: 10,
    color: "#7f7f7f",
    fontSize: 16,
  },
  login_social_buttons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 40,
  },
  login_social_button: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    marginHorizontal: 12,
    borderWidth: 1,
    borderColor: "#7f7f7f",
    borderRadius: 60,
  },
  login_social_icon: {
    width: 38,
    height: 38,
    resizeMode: "contain",
  },
  login_social_facebook: {
    backgroundColor: "#4267B2",
    borderColor: "#4267B2",
  },
  login_footer_text: {
    flexDirection: "row",
    alignItems: "center",
    color: "#808080",
    fontSize: 15,
    marginTop: 30,
  },
  login_footer_link: {
    color: "#208AEC",
    fontSize: 15,
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "#161618",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modal_button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  modal_buttonOpen: {
    backgroundColor: "#F194FF",
  },
  modal_buttonClose: {
    backgroundColor: "#DC4141",
  },
  modal_textStyle: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#818181",
    fontSize: 16,
  },
  modalText_location: {
    marginBottom: 15,
    textAlign: "center",
    color: "#B3B3B3",
    fontSize: 16,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default Styles;
