import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { user } from '../../data'

const Avatar = ({ isEmplty, navigation }) => {
    const chooseAvatar = () => {
        console.log("CLICK chooseAvatar");
        navigation.navigate("TakeAvatarScreen")
    };

    const avatar = isEmplty ? null : <Image source={user.avatar} style={styles.avatarImg} />
    const addBtn = isEmplty ? <Text style={styles.avatarInputBtnTextEmpty}>+</Text> : <Text style={{ ...styles.avatarInputBtnTextEmpty, ...styles.avatarInputBtnText }}>+</Text>

    return (
        <View style={styles.avatarInput}>
            {avatar}
            <TouchableOpacity
                activeOpacity={0.7}
                onPress={chooseAvatar}
                style={{ ...styles.avatarInputBtn, borderColor: isEmplty ? "#FF6C00" : "#E8E8E8" }}
            >

                {addBtn}
            </TouchableOpacity>
        </View>
    );
}

export default Avatar;

const styles = StyleSheet.create({
    avatarInput: {
        width: 120,
        height: 120,
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
        position: "absolute",
        left: "50%",
        transform: [{ translateX: -50 }, { translateY: -50 }],
        // overflow: "hidden"
    },
    avatarImg: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        borderRadius: 16,
    },
    avatarInputBtn: {
        position: "absolute",
        width: 25,
        height: 25,
        backgroundColor: "#FFFFFF",
        borderRadius: 90,
        borderColor: "#FF6C00",
        borderWidth: 2,

        // transform: [{ translateX: 50 }],
        right: -12.5,
        bottom: 20,
    },
    avatarInputBtnTextEmpty: {
        color: "#FF6C00",

        textAlign: "center",
        fontSize: 26,
        lineHeight: 26,
    },
    avatarInputBtnText: {
        color: "#E8E8E8",
        transform: [{ rotate: "45deg" }],
    },
})