import { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';

const InputLocation = ({ onFocus, onChangeText, value, style, onPress }) => {
    return (
        <View style={style}>
            <TextInput
                style={{ paddingLeft: 32 }}
                onFocus={onFocus}
                onChangeText={onChangeText}
                value={value}
                placeholder="Місцевість..."
                placeholderTextColor={style.placeholderTextColor}
                onPressIn={onPress}
            />

            <Feather name="map-pin" size={24} color={style.placeholderTextColor} style={styles.showPassBtn} />

        </View>
    );
}

export default InputLocation;

const styles = StyleSheet.create({
    showPassBtn: {
        position: "absolute",
        top: "50%",
    },
})