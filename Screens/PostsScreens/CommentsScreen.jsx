import { Image, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BGMainScreen from "../../Components/BGMainScren/BGMainScreen";
import Comment from "../../Components/PostsComponents/Comment";
import InputComment from '../../Components/FormsComponents/InputComment'
import { useEffect, useState } from "react";
import { dbFirestore } from "../../firebase/config";
import { doc, setDoc, collection, addDoc, getDocs, updateDoc } from "firebase/firestore";
import { useSelector } from "react-redux";


const CommentsScreen = ({ route: { params: { post } } }) => {
    const photoSrc = typeof post.photo === "number" ? post.photo : { uri: post.photo }
    const { userId } = useSelector((state) => state.auth)
    const [comment, setComment] = useState("")
    const [allComments, setAllComments] = useState([])

    useEffect(() => {
        getComments();
    }, [])

    const getComments = async () => {
        const response = await getDocs(collection(dbFirestore, "posts", post.postId, "comments"));
        const responsePosts = response.docs.map((doc) => ({ ...doc.data(), id: doc.postId }))
        responsePosts.sort((a, b) => a.dateset - b.dateset)
        setAllComments(responsePosts)
        console.log("allComments: ", responsePosts)
    }

    const pushComment = async () => {
        // add new comment
        const response = await addDoc(collection(dbFirestore, "posts", post.postId, "comments"), {
            comment,
            userId,
            dateset: Date.now().toString()
        });

        // update count of comments in a post
        const postRef = doc(dbFirestore, "posts", post.postId);

        const responseUpdate = await updateDoc(postRef, {
            comments: allComments.length + 1
        });
        getComments();
    }
    return (
        <BGMainScreen>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.container}>
                    <Image source={photoSrc} style={styles.img} />
                    <View style={styles.commentsList}>
                        {allComments.map((commentItem, i) =>
                            <Comment key={i} comment={commentItem} />
                        )}
                    </View>
                </View>

            </ScrollView>
            <InputComment
                onChangeText={setComment}
                value={comment}
                onSubmit={pushComment}
            />

        </BGMainScreen>
    );
}

export default CommentsScreen;

const styles = StyleSheet.create({
    container: {
        paddingTop: 32,
        paddingLeft: 16,
        paddingRight: 16
    },
    img: {
        borderRadius: 8,
        width: "100%",
        minHeight: 240,

    },
    commentsList: {
        paddingTop: 32,
    }
})