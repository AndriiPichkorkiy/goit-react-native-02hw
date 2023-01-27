import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

const InputPassword = ({ onFocus, onChangeText, value, style }) => {
    const [hidePassword, setHidePassword] = useState(true);
    const switchHidePassword = () => setHidePassword((prevState) => !prevState);
    return (
        <View>
            <TextInput
                style={style}
                onFocus={onFocus}
                onChangeText={onChangeText}
                value={value}
                placeholder="Пароль"
                secureTextEntry={hidePassword}
            />
            <TouchableOpacity onPress={switchHidePassword} style={styles.showPassBtn}>
                <Text style={styles.showPassBtnText} >{hidePassword ? 'Показати' : 'Сховати'}</Text>
            </TouchableOpacity>
        </View>
    );
}

export default InputPassword;

const styles = StyleSheet.create({
    showPassBtn: {
        position: "absolute",
        right: 16,
        top: "50%",

    },

    showPassBtnText: {
        fontFamily: "Roboto-Regular",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,

        color: "#1B4371",
    }
})