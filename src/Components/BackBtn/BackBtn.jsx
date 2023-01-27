import { AntDesign } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

const BackBtn = ({ onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={{ marginHorizontal: 16 }}>
            <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
    );
}

export default BackBtn;