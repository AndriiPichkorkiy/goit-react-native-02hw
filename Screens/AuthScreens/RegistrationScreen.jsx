import { useEffect, useRef, useState } from "react";
import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    Platform,
    KeyboardAvoidingView,
    Keyboard,
    TouchableWithoutFeedback,
    Dimensions,
    Button,
} from "react-native";

import InputPassword from "../../Components/FormsComponents/InputPassword";
import BGAuthScreen from "../../Components/BGAuthScreen/BGAuthScreen";
import Avatar from "../../Components/Avatar/Avatar";
import { authSingUpUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";
import SubmitBtn from "../../Components/FormsComponents/SubmitBtn";


const initialState = {
    login: "",
    email: "",
    password: "",
};

export default function RegistrationScreen({ navigation }) {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);

    const dispath = useDispatch();

    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setIsShowKeyboard(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setIsShowKeyboard(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    };

    const submiteForm = () => {
        dispath(authSingUpUser(state))

        keyboardHide();
        // setState(initialState);
    };

    const switchPage = () => navigation.navigate("Login");

    const isEnabledSubmit = !!(state.login && state.password && state.email)
    return (
        <>
            <TouchableWithoutFeedback onPress={keyboardHide}>

                <View style={styles.container}>

                    <BGAuthScreen>
                        <KeyboardAvoidingView
                            style={{ flex: 1, justifyContent: "flex-end" }}
                            behavior={Platform.OS === "ios" ? "padding" : "height"}
                        >
                            <View
                                style={{
                                    ...styles.form,
                                    paddingBottom: isShowKeyboard ? 20 : 100,
                                }}
                            >
                                <Avatar isEmplty={true} navigation={navigation} isRegestration={true} />

                                <Text style={styles.title}>Реєстрація</Text>
                                <TextInput
                                    style={styles.input}
                                    onFocus={() => setIsShowKeyboard(true)}
                                    onChangeText={(value) =>
                                        setState((prevState) => ({ ...prevState, login: value }))
                                    }
                                    value={state.login}
                                    placeholder="Логін"
                                />
                                <TextInput
                                    style={styles.input}

                                    onFocus={() => setIsShowKeyboard(true)}
                                    onChangeText={(value) =>
                                        setState((prevState) => ({ ...prevState, email: value }))
                                    }
                                    value={state.email}
                                    placeholder="Адреса електронної скриньки"
                                />
                                <InputPassword style={styles.input}
                                    onFocus={() => setIsShowKeyboard(true)}
                                    onChangeText={(value) =>
                                        setState((prevState) => ({ ...prevState, password: value }))
                                    }
                                    value={state.password}
                                />
                                <SubmitBtn title="Зареєструватися" onPress={submiteForm} isEnable={isEnabledSubmit} />
                                <TouchableOpacity activeOpacity={0.7} onPress={switchPage}>
                                    <Text style={styles.switcherPage}>Вже є аккаунт? Увійти</Text>
                                </TouchableOpacity>

                            </View>
                        </KeyboardAvoidingView>
                    </BGAuthScreen>
                </View>
            </TouchableWithoutFeedback >

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    form: {
        backgroundColor: "#fff",
        // padding: 16,
        paddingBottom: 78,

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        paddingTop: 92,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 78,
        position: "relative",
        overflow: "visible"
    },
    avatarInput: {
        width: 120,
        height: 120,
        backgroundColor: "#F6F6F6",
        borderRadius: 16,
        position: "absolute",
        left: "50%",
        transform: [{ translateX: -50 }, { translateY: -50 }],
    },
    avatarInputBtn: {
        position: "absolute",
        width: 25,
        height: 25,

        borderRadius: 90,
        borderColor: "#FF6C00",
        borderWidth: 2,
        // transform: [{ translateX: 50 }],
        right: -12.5,
        bottom: 20,
    },
    avatarInputBtnText: {
        color: "#FF6C00",
        textAlign: "center",
        fontSize: 26,
        lineHeight: 26,
    },

    title: {
        fontFamily: "Roboto-Regular",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 30,
        lineHeight: 35,
        textAlign: "center",
        // letterSpacing: "0.01em",

        color: "#212121",
    },

    input: {
        backgroundColor: "#F6F6F6",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "#E8E8E8",
        borderRadius: 8,
        width: "100%",
        padding: 15,
        marginTop: 16,
    },

    // formBtn: {
    //     marginTop: 43,
    //     alignItems: "center",
    //     padding: 32,
    //     paddingTop: 16,
    //     paddingBottom: 16,

    //     backgroundColor: "#FF6C00",
    //     borderRadius: 100,
    // },

    // formBtnText: {
    //     fontFamily: "Roboto-Regular",
    //     fontWeight: "400",
    //     fontSize: 16,
    //     lineHeight: 19,
    //     color: "#FFFFFF",
    // },

    switcherPage: {
        paddingTop: 16,
        fontFamily: "Roboto-Regular",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        textAlign: "center",
        color: "#1B4371",
        textDecorationLine: "underline",
    },
});
