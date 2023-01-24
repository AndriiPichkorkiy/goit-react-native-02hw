import { Camera } from "expo-camera";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import BGMainScreen from "../../Components/BGMainScren/BGMainScreen";
import { generalStyles } from "../../helpers/generalStyles"
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';

const AvatarScreen = () => {
    const [camera, setCamera] = useState(null)
    const [photo, setPhoto] = useState(null)
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImageToFormData(result.assets[0])
        }
    };


    const takePhoto = async () => {
        const photo = await camera.takePictureAsync();
        MediaLibrary.createAssetAsync(photo.uri);
        console.log("Save")
        setImageToFormData(photo)
    }

    return (<View>
        <View  >
            <Camera style={styles.photoWrapper} ref={setCamera}>
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
            </Camera>
        </View>

        <TouchableOpacity onPress={pickImage}>
            <Text style={styles.photoBtnUploadPhoto}>Завантажити фото</Text>
        </TouchableOpacity>
    </View >
    );
}

export default AvatarScreen;

const styles = StyleSheet.create({
    photoWrapper: {
        position: "relative",
        // width: "100%",
        // height: 240,
        flex: 1,
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
})