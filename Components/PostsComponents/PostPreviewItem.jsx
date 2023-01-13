import { Image, View, Text, StyleSheet } from "react-native";
import { Feather } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import { TouchableOpacity } from "react-native-gesture-handler";

const PostPreviewItem = ({ post: { name, photo, comments, likes, location }, isHiddenLikes }) => {
    const colorCommentsIcon = comments.length ? "#FF6C00" : "#BDBDBD"
    const colorLikesIcon = comments.length ? "#FF6C00" : "#BDBDBD"
    return (
        <View style={styles.container}>
            <Image source={photo} style={styles.img} />
            <Text style={styles.title}>{name}</Text>
            <View style={styles.bottomDescription}>
                <View style={{ flexDirection: "row", }}>
                    <View style={styles.bottomItem}>
                        <Feather name="message-circle" size={24} color={colorCommentsIcon} style={styles.msgIcon} />
                        <Text style={styles.text}>{comments.length}</Text>
                    </View>
                    {!isHiddenLikes && <View style={styles.bottomItem}>
                        <EvilIcons name="like" size={32} color={colorLikesIcon} />
                        <Text style={styles.text}>{likes}</Text>
                    </View>}

                </View>

                <View style={{ ...styles.bottomItem, marginRight: 0 }}>
                    <Feather name="map-pin" size={24} color={"#BDBDBD"} />
                    <Text style={{ ...styles.text, textDecorationLine: "underline" }}>{location}</Text>
                </View>



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
        width: "100%"
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