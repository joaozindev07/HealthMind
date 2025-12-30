import { Image, StyleSheet, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import colors from './theme/colors';

export default function index() {
    return (
        <LinearGradient
            colors={[colors.primaryDark, colors.accent, colors.pinkAccent]}
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
        backgroundColor: colors.primaryAlt,
    },
    title: {
        fontSize: 40,
        fontWeight: "bold",
        marginTop: 50,
        color: colors.white,
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: "contain",
        opacity: 0.7,
    },
})