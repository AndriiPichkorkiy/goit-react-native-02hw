import { View, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

const MapScreen = ({ route: { params: { post } } }) => {
    if (!post.coords) return <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
        <Text>There is no coordinate </Text>
        <Text>It appears that you have not given location permission</Text>
        <Text>when you took the picture</Text>
        <Text style={{ fontSize: 24, marginTop: 16 }}>°˖✧◝(⁰▿⁰)◜✧˖°</Text>
    </View>

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: post.coords.latitude,
                    longitude: post.coords.longitude,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.006,
                }}
            >

                <Marker
                    coordinate={{
                        latitude: post.coords.latitude,
                        longitude: post.coords.longitude,
                    }}
                    title={post.name}
                    description={post.location}
                >
                </Marker>
            </MapView>

        </View>
    );
}

export default MapScreen;