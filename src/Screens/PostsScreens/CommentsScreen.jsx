import { Image, Keyboard, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import BGMainScreen from "../../Components/BGMainScren/BGMainScreen";
import Comment from "../../Components/PostsComponents/Comment";
import InputComment from '../../Components/FormsComponents/InputComment'
import { useEffect, useState } from "react";
import { dbFirestore } from "../../firebase/config";
import { doc, collection, addDoc, updateDoc, query, onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";


const CommentsScreen = ({ route: { params: { post } } }) => {
    const photoSrc = typeof post.photo === "number" ? post.photo : { uri: post.photo }
    const { userId, nickname, email, photoURL } = useSelector((state) => state.auth)
    const [comment, setComment] = useState("")
    const [allComments, setAllComments] = useState([])

    useEffect(() => {
        const q = query(collection(dbFirestore, "posts", post.postId, "comments"));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const onSnapshotComments = [];
            querySnapshot.forEach((doc) => {
                onSnapshotComments.push(doc.data());
            });
            onSnapshotComments.sort((a, b) => a.dateset - b.dateset)
            setAllComments(onSnapshotComments)
        });
    }, [])

    const pushComment = async () => {
        // add new comment
        const response = await addDoc(collection(dbFirestore, "posts", post.postId, "comments"), {
            comment,
            userOwner: { userId, nickname, photoURL },
            dateset: Date.now().toString()
        });

        // update count of comments in a post
        const postRef = doc(dbFirestore, "posts", post.postId);

        await updateDoc(postRef, {
            comments: allComments.length + 1
        });
        keyboardHide();
        setComment("")
    }

    // useEffect(() => {
    //     const keyboardDidShowListener = Keyboard.addListener(
    //         'keyboardDidShow',
    //         () => {
    //             setIsShowKeyboard(true);
    //         }
    //     );
    //     const keyboardDidHideListener = Keyboard.addListener(
    //         'keyboardDidHide',
    //         () => {
    //             setIsShowKeyboard(false);
    //         }
    //     );

    //     return () => {
    //         keyboardDidHideListener.remove();
    //         keyboardDidShowListener.remove();
    //     };
    // }, []);

    const keyboardHide = () => { Keyboard.dismiss() };

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