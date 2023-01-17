import { useEffect, useState } from "react";
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
} from "react-native";

import InputPassword from "../../Components/FormsComponents/InputPassword";
import BGAuthScreen from "../../Components/BGAuthScreen/BGAuthScreen";
import Avatar from "../../Components/Avatar/Avatar";

const initialState = {
    login: "",
    email: "",
    password: "",
};

// const window = Dimensions.get("window");
// const screen = Dimensions.get("screen");

export default function RegistrationScreen({ navigation }) {
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);
    const [state, setState] = useState(initialState);

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
        setState(initialState);
        keyboardHide();
        console.log("Данні з форми Registration: ", state)
        navigation.navigate("Login")
    };

    const switchPage = () => {
        navigation.navigate("Login");
    };
    const chooseAvatar = () => {
        console.log("CLICK chooseAvatar");
    };

    return (
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
                            <Avatar isEmplty={true} />
                            {/* <View style={styles.avatarInput}>
                                <TouchableOpacity
                                    activeOpacity={0.7}
                                    onPress={chooseAvatar}
                                    style={styles.avatarInputBtn}
                                >
                                    <Text style={styles.avatarInputBtnText}>+</Text>
                                </TouchableOpacity>
                            </View> */}
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
                            <TouchableOpacity
                                activeOpacity={0.7}
                                style={styles.formBtn}
                                onPress={submiteForm}
                            >
                                <Text style={styles.formBtnText}>Зареєструватися</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={switchPage}>
                                <Text style={styles.switcherPage}>Вже є аккаунт? Увійти</Text>
                            </TouchableOpacity>

                        </View>
                    </KeyboardAvoidingView>
                </BGAuthScreen>
            </View>
        </TouchableWithoutFeedback >
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

    formBtn: {
        marginTop: 43,
        alignItems: "center",
        padding: 32,
        paddingTop: 16,
        paddingBottom: 16,

        backgroundColor: "#FF6C00",
        borderRadius: 100,
    },

    formBtnText: {
        fontFamily: "Roboto-Regular",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        color: "#FFFFFF",
    },

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
