import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import BGMainScreen from "../../Components/BGMainScren/BGMainScreen";
import { collection, onSnapshot, query, } from "firebase/firestore";
import { dbFirestore } from "../../firebase/config";

import PostCard from "../../Components/PostsComponents/PostCard";

const PostScreen = ({ navigation, route }) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        const q = query(collection(dbFirestore, "posts"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const allposts = [];
            querySnapshot.forEach((doc) => {
                allposts.push({ ...doc.data(), postId: doc.id });
            });
            allposts.sort((a, b) => a.dateset - b.dateset)
            setPosts(allposts)
        });
    }, [])

    // for flatlist's style
    const height = useBottomTabBarHeight();
    const userWrapperMargins = 48;
    return (
        <BGMainScreen>
            <View style={styles.container}>
                <FlatList
                    data={posts}
                    renderItem={({ item }) => <PostCard post={item} isHiddenLikes={true} navigation={navigation} />}
                    keyExtractor={(item, i) => i}
                    style={{ marginBottom: 0 }}
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