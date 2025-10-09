import { useAuth } from "@clerk/clerk-expo";
import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function AuthTabsLayout() {
  const { isSignedIn } = useAuth();

  // Você pode proteger as rotas aqui, se necessário

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#A259F7",
        tabBarInactiveTintColor: "#6B7280",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 14,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="professional"
        options={{
          title: "Profissionais",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="intensiveMood"
        options={{
          title: "Intensivo",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="happy-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
