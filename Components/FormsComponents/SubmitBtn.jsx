import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import { generalStyles } from "../../helpers/generalStyles"


const SubmitBtn = ({ onPress, title, isEnable }) => {
    const styleBtn = isEnable ? styles.formBtn : { ...styles.formBtn, ...styles.formBtnDisable }
    const styleBtnText = isEnable ? styles.formBtnText : { ...styles.formBtnText, ...styles.formBtnTextDisable }
    // const styleBtn = styles.formBtn
    // const styleBtnText = styles.formBtnText

    return (
        <TouchableOpacity
            activeOpacity={0.7}
            style={styleBtn}
            onPress={onPress}
        >
            <Text style={styleBtnText}>{title}</Text>
        </TouchableOpacity>
    );
}

export default SubmitBtn;

const styles = StyleSheet.create({
    formBtn: {
        marginTop: 43,
        alignItems: "center",
        padding: 32,
        paddingTop: 16,
        paddingBottom: 16,

        backgroundColor: generalStyles.activeBG,
        borderRadius: 100,
    },

    formBtnDisable: {
        backgroundColor: generalStyles.disableBG
    },


    formBtnText: {
        fontFamily: "Roboto-Regular",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        color: generalStyles.activeColor,
    },

    formBtnTextDisable: {
        color: generalStyles.disableColor
    },
});