import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import BGMainScreen from "../../Components/BGMainScren/BGMainScreen";
import PostPreviewItem from "../../Components/PostsComponents/PostPreviewItem";

import { posts as fakePosts, user } from '../../data'

const PostScreen = ({ navigation, route }) => {
    const [posts, setPosts] = useState(fakePosts)

    useEffect(() => {
        if (route.params) {
            setPosts(prevState => ([...prevState, route.params.createFormData]))
        }
    }, [route.params])

    // for flatlist's style
    const height = useBottomTabBarHeight();
    const userWrapperMargins = 48;
    return (
        <BGMainScreen>
            <View style={styles.container}>
                <View style={styles.userWrapper}>
                    <View>
                        <Image source={user.avatar} />
                    </View>
                    <View style={styles.secondColumn}>
                        <Text style={styles.name}>{user.name}</Text>
                        <Text style={styles.email}>{user.email}</Text>
                    </View>
                </View>
                <FlatList
                    data={posts}
                    renderItem={({ item }) => <PostPreviewItem post={item} isHiddenLikes={true} navigation={navigation} />}
                    keyExtractor={(item, i) => i}
                    style={{ marginBottom: height + userWrapperMargins, }}
                />
            </View>
        </ BGMainScreen>
    );
}

export default PostScreen;

const styles = StyleSheet.create({
    container: {
        padding: 16,
    },
    userWrapper: {
        marginTop: 32,
        // paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 16,

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
    posts: {
        paddingBottom: 112,
    },
})