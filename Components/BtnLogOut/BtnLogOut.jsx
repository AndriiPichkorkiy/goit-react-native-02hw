import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';

const BtnLogOut = ({ style }) => {
    return (
        <TouchableOpacity onPress={() => { console.log("LogOut was Pressed") }} style={{ marginHorizontal: 16, ...style }}>
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
        </TouchableOpacity>

    );
}

export default BtnLogOut;

const styles = StyleSheet.create({

})