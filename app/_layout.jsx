import { tokenCache } from './cache'
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-expo';
import { Text, View } from "react-native";
import LoginScreen from "../app-example/components/loginScreen";

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
    'outfit-bold': require("./../assets/fonts/Outfit-Bold.ttf"),
    'outfit-medium': require("./../assets/fonts/Outfit-SemiBold.ttf")
  });

  if (!fontsLoaded) {
    return <Text>Loading fonts...</Text>;  // Prevents rendering before fonts are ready
  }

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" />
        </Stack>
      </SignedIn>
      <SignedOut>
        <LoginScreen />
      </SignedOut>
    </ClerkProvider>
  );
}
