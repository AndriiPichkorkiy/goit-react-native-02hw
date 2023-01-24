import { useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { generalStyles } from "../../helpers/generalStyles"

const InputComment = ({ onChangeText, value, onSubmit }) => {
    const btnBGColor = value ? generalStyles.activeBG : generalStyles.disableBG
    const btnIconColor = value ? generalStyles.activeColor : generalStyles.disableColor
    return (
        <View style={styles.inputWrapper}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder="Коментувати..."
                placeholderTextColor="#BDBDBD"
                style={styles.input}
                multiline
            />
            <View style={styles.subbmitBtnWrapper}>
                <TouchableOpacity style={{ ...styles.subbmitBtn, backgroundColor: btnBGColor }} onPress={onSubmit}>
                    <AntDesign name="arrowup" size={24} color={btnIconColor} />
                </TouchableOpacity>
            </View>



        </View>
    );
}

export default InputComment;

const styles = StyleSheet.create({
    inputWrapper: {
        marginHorizontal: 16,
        marginBottom: 16,
        marginTop: 16,

        backgroundColor: "#F6F6F6",
        minHeight: 50,

        borderColor: "#E8E8E8",
        borderWidth: 1,
        BorderStyle: "solid",
        borderRadius: 32,
        position: "relative",
    },
    input: {
        padding: 16,
        paddingRight: 54,
        // font-family: 'Inter',
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 19,

        color: "#BDBDBD",
    },

    subbmitBtnWrapper: {
        position: "absolute",
        right: 8,
        top: 0,
        height: "100%",
        justifyContent: "flex-end",
        paddingBottom: 12,
    },
    subbmitBtn: {
        borderRadius: 90,
        width: 34,
        height: 34,
        justifyContent: "center",
        alignItems: "center",

    },
})