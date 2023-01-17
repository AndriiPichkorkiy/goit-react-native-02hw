import { Image, KeyboardAvoidingView, StyleSheet, Text, TouchableOpacity, View, Platform, Keyboard, TouchableWithoutFeedback } from "react-native";
import BGMainScreen from "../../Components/BGMainScren/BGMainScreen";
import { MaterialIcons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { TextInput } from "react-native-gesture-handler";
import InputLocation from "../../Components/FormsComponents/InputLocation";
import SubmitBtn from "../../Components/FormsComponents/SubmitBtn";
import { useEffect, useState } from "react";
import { Camera } from "expo-camera";
import { generalStyles } from "../../helpers/generalStyles";
import * as MediaLibrary from "expo-media-library";
import * as Location from "expo-location";
import * as ImagePicker from 'expo-image-picker';

const initialState = {
    photo: null,
    name: null,
    location: null,
    coords: null,
    comments: [],
    likes: 0,
}

const CreateScreen = ({ navigation }) => {
    const [hasPermissionCamera, setHasPermissionCamera] = useState(null);
    const [hasPermissionLocation, setHasPermissionLocation] = useState(null);
    const [camera, setCamera] = useState(null)
    const [formData, setFormData] = useState(initialState)

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageToFormData(result.assets[0].uri)
        }
    };

    const takePhoto = async () => {
        const photo = await camera.takePictureAsync();
        MediaLibrary.createAssetAsync(photo.uri);
        console.log("Save")
        setImageToFormData(photo)
    }

    const setImageToFormData = async (img) => {
        let coords;
        if (hasPermissionLocation) {
            const location = await Location.getLastKnownPositionAsync();
            coords = {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
            };
        } else {
            console.warn("NO PERMISSION!!!")
        }
        console.log(`coords `, coords)
        setFormData(prevState => ({ ...prevState, photo: img.uri, coords }))
    }

    const inputHadlerName = (value) => {
        setFormData(prevState => ({ ...prevState, name: value }))
    }
    const inputHadlerLocation = (value) => {
        setFormData(prevState => ({ ...prevState, location: value }))
    }

    const submitPost = () => {
        navigation.navigate("Posts", { createFormData: { ...formData } })
        setFormData(initialState)
    }

    const keyboardHide = () => {
        setIsShowKeyboard(false);
        Keyboard.dismiss();
    };

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

    const isEnabledSubmit = formData.name && formData.photo && formData.location

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();

            setHasPermissionCamera(status === "granted");

            const { status: PermissionLocation } = await Location.requestForegroundPermissionsAsync();
            setHasPermissionLocation(PermissionLocation === "granted")
        })();
    }, []);

    useEffect(() => {
        (async () => {


        })();
    }, []);

    if (hasPermissionCamera === null) {
        return <Text>Waiting permission</Text>;
    }
    if (hasPermissionCamera === false) {
        return <Text>No access to camera</Text>;
    }

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
                                    <Camera style={styles.photoWrapper} ref={setCamera}>
                                        {formData.photo && <Image
                                            style={styles.photo}
                                            source={{ uri: formData.photo }}
                                        // source={anotherUser}

                                        />}
                                        <TouchableOpacity onPress={takePhoto} style={styles.snapContainer} >
                                            <View style={styles.photoIconWrapper}>
                                                <View style={styles.photoIcon}>
                                                    <MaterialIcons name="photo-camera" size={24} color="black" />
                                                </View>

                                            </View>

                                        </TouchableOpacity>
                                    </Camera>
                                </View>

                                <TouchableOpacity onPress={pickImage}>
                                    <Text style={styles.photoBtnUploadPhoto}>Завантажити фото</Text>
                                </TouchableOpacity>
                            </View>

                            <TextInput
                                placeholder="Назва..."
                                placeholderTextColor={"#BDBDBD"}
                                style={styles.input}
                                onChangeText={inputHadlerName}
                                value={formData.name}
                            />

                            <InputLocation style={styles.input}
                                // onPress={() => { navigation.navigate("MapScreen"); }}
                                value={formData.location}
                                onChangeText={inputHadlerLocation} />


                            <SubmitBtn title="Опублікувати" onPress={submitPost} isEnable={isEnabledSubmit} />
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
        position: "relative",
        width: "100%",
        height: 240,
        backgroundColor: "#F6F6F6",
        // border: "1px solid #E8E8E8",
        borderWidth: 2,
        // borderStyle: "solid",
        borderColor: "#ba1b1b",
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    snapContainer: {
        // backgroundColor: "orange",
        width: 100,
        height: 100,
    },
    photo: {
        // width: "100%",
        width: "35%",
        height: "35%",
        // backgroundColor: "#F6F6F6",
        // border: "2px solid #E8E8E8",
        borderRadius: 8,
        position: "absolute",
        left: 8,
        top: 8,
        borderWidth: 1,
        borderColor: generalStyles.activeBG,
    },
    photoIconWrapper: {

        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
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