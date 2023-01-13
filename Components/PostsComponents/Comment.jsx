import { Image, StyleSheet, Text, View } from "react-native";
import { getDateString } from "../../helpers/getDateString";

const Comment = ({ comment }) => {
    const date = getDateString(comment.dateset)
    const styleContainer = comment.isOwn
        ? { ...styles.container, flexDirection: "row-reverse" }
        : styles.container
    const styleComment = comment.isOwn
        ? ownComment
        : anotherComment
    const styleCommentDate = comment.isOwn
        ? ownCommentDate
        : anotherCommentDate
    return (
        <View style={styleContainer}>
            <Image source={comment.avatar} style={styles.avatar} />
            <View style={styleComment}>
                <Text style={styles.text}>{comment.text}</Text>
                <Text style={styleCommentDate}>{date}</Text>
            </View>
        </View>
    );
}

export default Comment;

const styles = StyleSheet.create({
    container: {
        paddingTop: 24,
        flexDirection: "row",

    },
    avatar: {
        borderRadius: 8,
        width: 28,
        height: 28,
    },
    comment: {
        padding: 16,
        flexShrink: 1,
        width: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.03)",
        borderBottomLeftRadius: 6,
        borderBottomRightRadius: 6,
    },
    leftComment: {
        marginLeft: 16,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 6,
    },
    rightComment: {
        marginRight: 16,
        borderTopLeftRadius: 6,
        borderTopRightRadius: 0,
    },
    text: {
        fontFamily: "Roboto-Regular",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 13,
        lineHeight: 18,

        color: "#212121",
    },
    date: {
        marginTop: 8,
        fontFamily: "Roboto-Regular",
        fontStyle: "normal",
        fontWeight: "400",
        fontSize: 10,
        lineHeight: 12,
        textAlign: "right",

        color: "#BDBDBD",
    },
    dateRight: {
        textAlign: "right",
    },
    dateLeft: {
        textAlign: "left",
    }
})

const ownComment = StyleSheet.compose(styles.comment, styles.rightComment)
const anotherComment = StyleSheet.compose(styles.comment, styles.leftComment)

const ownCommentDate = StyleSheet.compose(styles.date, styles.dateLeft)
const anotherCommentDate = StyleSheet.compose(styles.date, styles.dateRight)