import { Camera } from "expo-camera";
import { TouchableOpacity, View, StyleSheet, Text, Image } from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { generalStyles } from "../../helpers/generalStyles"
import { useEffect, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import SubmitBtn from "../../Components/FormsComponents/SubmitBtn";
import { useDispatch } from "react-redux";

import * as MediaLibrary from "expo-media-library";

import uploadPhotoToServer from "../../firebase/uploadPhotoToServer"
import { authUpdateAvatar } from "../../redux/auth/authOperations";

const AvatarScreen = ({ navigation, route: { params: { isRegestration } } }) => {
    const [hasPermissionCamera, setHasPermissionCamera] = useState(null);
    const [camera, setCamera] = useState(null)
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back)
    const [photo, setPhoto] = useState(null)

    const switchCamera = () => { cameraType === 'back' ? setCameraType('front') : setCameraType('back') }

    const [flashMode, setFlashMode] = useState(false)
    console.log('flashMode', flashMode)
    const handleFlashMode = () => { setFlashMode(!flashMode) }

    const dispatch = useDispatch()
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri)
        }
    };

    const takePhoto = async () => {
        const photo = await camera.takePictureAsync();
        MediaLibrary.createAssetAsync(photo.uri);
        setPhoto(photo.uri)
    }

    const submitPhoto = async () => {
        const photoAdress = await uploadPhotoToServer(photo, "avatar")
        console.log('photoAdress', photoAdress)

        dispatch(authUpdateAvatar({ photoURL: photoAdress, isRegestration }))
        navigation.goBack();
    }
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            await MediaLibrary.requestPermissionsAsync();

            setHasPermissionCamera(status === "granted");
        })();
    }, []);

    if (hasPermissionCamera === null) {
        return <Text>Waiting permission</Text>;
    }
    if (hasPermissionCamera === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            <View style={styles.cameraContainer}>
                <Camera style={styles.photoWrapper} ref={setCamera} type={cameraType} flashMode={flashMode ? Camera.Constants.FlashMode.torch : Camera.Constants.FlashMode.off}>
                    {photo && <Image
                        style={styles.photo}
                        source={{ uri: photo }}
                    />}
                    <TouchableOpacity onPress={takePhoto} style={styles.snapContainer} >
                        <View style={styles.photoIconWrapper}>
                            <View style={styles.photoIcon}>
                                <MaterialIcons name="photo-camera" size={24} color="black" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={switchCamera} style={styles.switcherContainer} >
                        <View style={styles.photoIconWrapper}>
                            <View style={styles.photoIcon}>
                                <MaterialIcons name="flip-camera-android" size={24} color="black" />
                            </View>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleFlashMode} style={styles.flashlightContainer} >
                        <View style={styles.photoIconWrapper}>
                            <View style={styles.photoIcon}>
                                <MaterialCommunityIcons name="flashlight" size={24} color="black" />
                            </View>
                        </View>
                    </TouchableOpacity>
                </Camera>

                <TouchableOpacity onPress={pickImage}>
                    <Text style={styles.photoBtnUploadPhoto}>Завантажити фото</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.btnContainer}>
                <SubmitBtn title="Підтвердити" onPress={submitPhoto} isEnable={photo ? true : false} />
            </View>
        </View >
    );
}

export default AvatarScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    cameraContainer: {
        flex: 1

    },
    btnContainer: {
        marginTop: 32,
        height: 150,
        paddingLeft: 15,
        paddingRight: 15,
    },
    photoWrapper: {
        position: "relative",
        width: "100%",
        height: "100%",
        borderWidth: 2,

        backgroundColor: "#F6F6F6",

        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    snapContainer: {
        width: 100,
        height: 100,
    },
    switcherContainer: {
        width: 100,
        height: 100,
        position: "absolute",
        bottom: 0,
        right: 0
    },
    flashlightContainer: {
        width: 100,
        height: 100,
        position: "absolute",
        bottom: 0,
        left: 0
    },
    photo: {
        width: "35%",
        height: "35%",

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
        marginLeft: 15,
        paddingTop: 8,
        fontFamily: "Roboto-Regular",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,
        color: "#BDBDBD",
    },
})