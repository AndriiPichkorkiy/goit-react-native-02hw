import { useState } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import PostPreviewItem from "./PostPreviewItem";
import minion from "../../assets/images/minion.png"

// const defaultUser = {
//     avatar: minion,
//     name: "name",
//     email: "email@email.email"
// }

const PostCard = ({ post, navigation, isHiddenLikes }) => {
    const [user, setUser] = useState(post.userOwner)
    return (
        <View style={styles.post}>
            <Text>{post.userId}</Text>
            <View style={styles.userWrapper}>
                <View >
                    <Image source={{ uri: user.photoURL }} style={styles.avatar} />
                </View>
                <View style={styles.secondColumn}>
                    <Text style={styles.name}>{user.nickname}</Text>
                    <Text style={styles.email}>{user.email}</Text>
                </View>
            </View>
            <PostPreviewItem post={post} isHiddenLikes={isHiddenLikes} navigation={navigation} />
        </View>
    )
}

export default PostCard;

const styles = StyleSheet.create({
    userWrapper: {
        marginTop: 32,
        // paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,

    },
    avatar: {
        width: 64,
        height: 64,
        borderRadius: 4,
    },
    secondColumn: {
        marginLeft: 8
    },
    name: {
        fontFamily: 'Roboto-Medium',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 13,
        lineHeight: 15,

        color: "#212121",
    },
    email: {
        fontFamily: 'Roboto-Medium',
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 11,
        lineHeight: 13,

        color: "rgba(33, 33, 33, 0.8)",
    },
    post: {
        // borderWidth: 2,
        // borderColor: "orange"
    }
})