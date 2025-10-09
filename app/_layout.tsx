import { useEffect, useState } from "react";
import { Slot, useRouter, useSegments } from "expo-router";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import AsyncStorage from "@react-native-async-storage/async-storage";

const publishkey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!;

const InitialLayout = () => {
  const { isLoaded, isSignedIn } = useAuth();
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

    if (isLoaded) {
      checkOnboarding();
    }
  }, [isLoaded, isSignedIn]);

  useEffect(() => {
    if (!isLoaded || !onboardingChecked) return;

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
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishkey}>
      <InitialLayout />
    </ClerkProvider>
  );
}
