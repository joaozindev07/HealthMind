import { Stack } from "expo-router";

export default function PublicLayout() {
    return (
        <Stack screenOptions={{
            headerStyle: { backgroundColor: '#D6C3F8' },
            headerTintColor: '#A259F7',
        }}>
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="onboarding" options={{ headerShown: false }} />
        </Stack>
    )
}