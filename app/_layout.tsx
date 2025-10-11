import { useEffect, useState } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { AuthProvider, useAuth } from "./providers/AuthProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

const InitialLayout = () => {
  const { isSignedIn, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const [onboardingChecked, setOnboardingChecked] = useState(false);

  useEffect(() => {
    const checkOnboarding = async () => {
      try {
        if (isSignedIn) {
          const completed = await AsyncStorage.getItem("onboardingComplete");
          if (!completed) {
            router.replace("/onboarding");
            return;
          }
        }
      } catch (err) {
        console.error("Erro ao checar onboarding:", err);
      } finally {
        setOnboardingChecked(true);
      }
    };

    if (!loading) {
      checkOnboarding();
    }
  }, [loading, isSignedIn]);

  useEffect(() => {
    if (loading || !onboardingChecked) return;

    const inAuthGroup = segments[0] === "(auth)";
    const inPublicGroup = segments[0] === "(public)";

    if (isSignedIn) {
      AsyncStorage.getItem("onboardingComplete").then((completed) => {
        if (completed && !inAuthGroup) {
          router.replace("/home");
        }
      });
    } else if (!isSignedIn && !inPublicGroup) {
      router.replace("/login");
    }
  }, [isSignedIn, onboardingChecked]);

  return <Slot />;
};

export default function RootLayout() {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
}
