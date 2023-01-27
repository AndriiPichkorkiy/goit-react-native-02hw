import { View, Text, StyleSheet } from "react-native";
import { generalStyles } from "../../helpers/generalStyles";

const Popup = ({ title, body }) => {
    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.body}>{body}</Text>
            </View>
        </View>
    );
}

export default Popup;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        paddingBottom: 16,

        backgroundColor: generalStyles.activeBG,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        borderWidth: 1,
    },
    innerContainer: {
        // paddingLeft: 16,
        // paddingRight: 16,
        width: "100%",
        backgroundColor: generalStyles.disableBG
    },
    title: {
        fontFamily: "Roboto-Regular",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 30,
        lineHeight: 35,
        textAlign: "center",

        color: "#212121",
    },
    body: {
        fontFamily: "Roboto-Regular",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 18,
        textAlign: "center",

        color: "#212121",
    },
})
