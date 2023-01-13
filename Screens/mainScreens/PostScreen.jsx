
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";
import { Image, Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import BGMainScreen from "../../Components/BGMainScren/BGMainScreen";
import PostPreviewItem from "../../Components/PostsComponents/PostPreviewItem";


import { posts, user } from '../../data'

const PostScreen = ({ navigation }) => {
    const height = useBottomTabBarHeight();
    const paddingHeight = 32;
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
                <ScrollView>
                    <View style={{ paddingBottom: height + paddingHeight, }}>
                        {posts.map((post, i) =>
                            <TouchableOpacity key={i} onPress={() => {
                                navigation.navigate("Comments", { post: post })
                            }}>
                                <PostPreviewItem post={post} isHiddenLikes={true} />
                            </TouchableOpacity>

                        )}
                    </View>
                </ScrollView>
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
        alignItems: "center"
    },
    secondColumn: {
        marginLeft: 8
    },
    name: {
        // fontFamily: 'Roboto',
        fontStyle: "normal",
        fontWeight: "700",
        fontSize: 13,
        lineHeight: 15,

        color: "#212121",
    },
    email: {
        // fontFamily: 'Roboto',s
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 11,
        lineHeight: 13,

        color: "rgba(33, 33, 33, 0.8)",
    },
    posts: {
        paddingBottom: 96,
    },
})