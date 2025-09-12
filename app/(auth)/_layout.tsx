import { Stack } from "expo-router";

export default function AuthLayout() {
    return (
        <Stack screenOptions={{}}>
            <Stack.Screen name="intensiveCalendarScreen" options={{ headerShown: false }} />
            <Stack.Screen name="profile" options={{ headerShown: false }} />
        </Stack>
    )
}