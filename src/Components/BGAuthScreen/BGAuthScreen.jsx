import { ImageBackground, StyleSheet } from "react-native";

const bgImage = require("../../assets/images/PhotoBG.png");

const BGAuthScreen = ({ children }) => {

    return (
        <ImageBackground source={bgImage} style={styles.image}>
            {children}
        </ImageBackground>
    );
}

export default BGAuthScreen;

const styles = StyleSheet.create({
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
    },
})