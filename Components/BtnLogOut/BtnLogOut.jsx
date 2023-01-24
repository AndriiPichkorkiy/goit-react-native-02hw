import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { authSingOutUser } from "../../redux/auth/authOperations";
import { useDispatch } from "react-redux";

const BtnLogOut = ({ style }) => {
    const dispatch = useDispatch();
    return (
        <TouchableOpacity onPress={() => { dispatch(authSingOutUser()) }} style={{ marginHorizontal: 16, ...style }}>
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
        </TouchableOpacity>

    );
}

export default BtnLogOut;

const styles = StyleSheet.create({

})