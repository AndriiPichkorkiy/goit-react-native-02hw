import {
    StyleSheet,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    FlatList
} from "react-native";
import Avatar from "../../Components/Avatar/Avatar";
import BGAuthScreen from "../../Components/BGAuthScreen/BGAuthScreen";
import BtnLogOut from "../../Components/BtnLogOut/BtnLogOut";
import PostPreviewItem from "../../Components/PostsComponents/PostPreviewItem";

import { collection, getDocs, onSnapshot, query, where } from "firebase/firestore";
import { dbFirestore } from "../../firebase/config";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import PostCard from "../../Components/PostsComponents/PostCard";


export default function ProfileScreen({ navigation }) {

    const [posts, setPosts] = useState([])
    const { userId, nickname } = useSelector((state) => state.auth)
    useEffect(() => {
        const q = query(collection(dbFirestore, "posts",), where("userOwner.userId", "==", userId));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const allposts = [];
            querySnapshot.forEach((doc) => {
                allposts.push({ ...doc.data(), postId: doc.id });
            });
            allposts.sort((a, b) => a.dateset - b.dateset)
            setPosts(allposts)
        });
    }, [])

    return (
        <View style={styles.container}>
            <BGAuthScreen>
                <View
                    style={styles.screen}
                >
                    <Avatar isEmplty={false} navigation={navigation} />
                    <BtnLogOut style={styles.BtnLogOut} />
                    <Text style={styles.title}>{nickname}</Text>


                    < FlatList
                        data={posts}
                        renderItem={({ item }) => <PostCard post={item} isHiddenLikes={false} navigation={navigation} />}

                        keyExtractor={(item, i) => i}
                        style={{ marginBottom: 0 }}
                    />
                </View>
            </BGAuthScreen>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    screen: {
        backgroundColor: "#fff",
        // paddingBottom: 78,

        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        marginTop: 128,
        paddingTop: 92,
        paddingLeft: 16,
        paddingRight: 16,
        // paddingBottom: 78,
        // position: "relative",
        overflow: "visible",
        // flex: 1,
    },
    BtnLogOut: {
        position: "absolute",
        right: 0,
        top: 22,
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
