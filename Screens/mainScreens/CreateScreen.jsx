import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import BGMainScreen from "../../Components/BGMainScren/BGMainScreen";
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { TextInput } from "react-native-gesture-handler";
import InputLocation from "../../Components/FormsComponents/InputLocation";
import SubmitBtn from "../../Components/FormsComponents/SubmitBtn";
import { useEffect, useState } from "react";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

const CreateScreen = ({ navigation }) => {
    const uploadPhoto = () => {
        console.log("Clicked uploadPhoto")
    }
    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    };
    // const heightKeyboardOffset = useBottomTabBarHeight() - 40;
    const heightKeyboardOffset = -80;
    const [isShowKeyboard, setIsShowKeyboard] = useState(false);

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

    return (



        <BGMainScreen >
            <View style={{
                flex: 1,
                justifyContent: "flex-end"
            }} >
                <KeyboardAvoidingView
                    style={{ flex: 1, justifyContent: "flex-end" }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    enabled
                    keyboardVerticalOffset={heightKeyboardOffset}
                >
                    <TouchableWithoutFeedback onPress={keyboardHide}>
                        <View style={{ ...styles.form }}>

                            <View>
                                <View  >
                                    <TouchableOpacity onPress={uploadPhoto} style={styles.photoWrapper} >
                                        <Image style={styles.photo} />
                                        <View style={styles.photoIconWrapper}>
                                            <View style={styles.photoIcon}>
                                                <MaterialIcons name="photo-camera" size={24} color="black" />
                                            </View>

                                        </View>

                                    </TouchableOpacity>

                                </View>

                                <TouchableOpacity onPress={uploadPhoto}>
                                    <Text style={styles.photoBtnUploadPhoto}>Завантажити фото</Text>
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                placeholder="Назва..."
                                placeholderTextColor={"#BDBDBD"}
                                style={styles.input}
                            />

                            <InputLocation style={styles.input} onPress={() => { navigation.navigate("MapScreen"); }} />

                            <SubmitBtn title="Опублікувати" onPress={() => { }} isEnable={false} />
                        </View>
                    </TouchableWithoutFeedback>
                    <View style={isShowKeyboard ? { display: "none" } : styles.bottomTab}>
                        <TouchableOpacity style={styles.deleteBtn}>
                            <EvilIcons name="trash" size={24} color="#BDBDBD" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>

            </View >
        </ BGMainScreen>

    );
}

export default CreateScreen;

const styles = StyleSheet.create({
    form: {
        marginTop: 32,
        paddingHorizontal: 16,
        flex: 1,
        // flex: 1,
        justifyContent: "flex-start"
    },
    photoWrapper: {
        position: "relative"
    },
    photo: {
        width: "100%",
        height: 240,
        backgroundColor: "#F6F6F6",
        border: "1px solid #E8E8E8",
        borderRadius: 8,
    },
    photoIconWrapper: {
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',
    },
    photoIcon: {
        width: 60, height: 60, backgroundColor: "white", borderRadius: 90, justifyContent: "center", alignItems: "center",
    },
    photoBtnUploadPhoto: {
        paddingTop: 8,
        // fontFamily: 'Roboto',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD",
    },
    input: {
        marginTop: 32,
        // fontFamily: 'Roboto',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        paddingVertical: 16,

        color: "#BDBDBD",

        borderBottomColor: "#BDBDBD",
        borderBottomWidth: 1,
    },
    bottomTab: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        // backgroundColor: "orange",
    },
    deleteBtn: {
        alignSelf: "center",
        paddingVertical: 8,
        paddingHorizontal: 24,
        backgroundColor: "#F6F6F6",
        borderRadius: 20,
        marginBottom: 8,
    }
})