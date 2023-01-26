import { Image, View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';

const PostPreviewItem = ({ post: { name, photo, comments, likes, location, postId }, post, isHiddenLikes, navigation }) => {
    const colorCommentsIcon = comments ? "#FF6C00" : "#BDBDBD"
    const colorLikesIcon = likes ? "#FF6C00" : "#BDBDBD"

    const photoSrc = typeof photo === "number" ? photo : { uri: photo }
    return (

        <View style={styles.container}>
            <TouchableOpacity onPress={() => {
                navigation.navigate("Comments", { post: post })
            }}>
                <Image source={photoSrc} style={styles.img} />
            </TouchableOpacity>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.bottomDescription}>
                <View style={{ flexDirection: "row", }}>
                    <View style={styles.bottomItem}>
                        <Feather name="message-circle" size={24} color={colorCommentsIcon} style={styles.msgIcon} />
                        <Text style={styles.text}>{comments}</Text>
                    </View>
                    {!isHiddenLikes && <View style={styles.bottomItem}>
                        <EvilIcons name="like" size={32} color={colorLikesIcon} />
                        <Text style={styles.text}>{likes}</Text>
                    </View>}

                </View>

                <TouchableOpacity onPress={() => {
                    navigation.navigate("MapScreen", { post })
                }}>
                    <View style={{ ...styles.bottomItem, marginRight: 0 }}>
                        <Feather name="map-pin" size={24} color={"#BDBDBD"} />
                        <Text style={{ ...styles.text, textDecorationLine: "underline" }}>{location}</Text>
                    </View>
                </TouchableOpacity>



            </View>
        </View>


    );
}

export default PostPreviewItem;


const styles = StyleSheet.create({
    container: {
        marginTop: 32,
    },
    img: {
        borderRadius: 8,
        minWidth: "100%",
        minHeight: 240,
    }
    ,
    title: {
        marginTop: 8,
        fontFamily: "Roboto-Medium",
        fontStyle: "normal",
        fontWeight: "500",
        fontSize: 16,
        lineHeight: 19,

        color: "#212121",
    },
    msgIcon: {

    },
    text: {
        ontFamily: "Roboto-Medium",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 16,
        lineHeight: 19,

        color: "#212121",
        marginLeft: 6,
    },


    bottomDescription: {
        marginTop: 8,
        flexDirection: "row", justifyContent: "space-between",
        width: "100%"
    },
    bottomItem: {
        flexDirection: "row",
        marginRight: 24,
        alignItems: "flex-end"
    },
})