import { StyleSheet, View } from "react-native";

const bgImage = require("../../assets/images/PhotoBG.png");

const BGMainScreen = ({ children }) => {

    return (
        <View source={bgImage} style={styles.image}>
            {children}
        </View>
    );
}

export default BGMainScreen;

const styles = StyleSheet.create({
    image: {
        backgroundColor: "#FFFFFF",
        flex: 1,
        justifyContent: "flex-start"
    },
})