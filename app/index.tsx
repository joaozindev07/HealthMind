import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function index() {
    return (
        <LinearGradient
            colors={['#be41fdff', '#FDDCD0', '#ff58eebd']}
            style={styles.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}>
            <Image style={styles.image}
                source={require("../assets/images/icon.png")} />
            <Text style={styles.title}>HealthMind</Text>
        </LinearGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#49026E",
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        marginTop: 50,
        color: "#fff",
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: "contain",
        opacity: 0.7,
    },
})