import React from "react";
import { TouchableOpacity } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { UserCircle2 } from "lucide-react-native";

import { TRPCProvider } from "~/utils/api";
import { supabase } from "~/utils/supabase";

// This is the main layout of the app
// It wraps your pages with the providers they need
const RootLayout = () => {
  return (
    <SessionContextProvider supabaseClient={supabase}>
      <TRPCProvider>
        <SafeAreaProvider>
          {/*
          The Stack component displays the current page.
          It also allows you to configure your screens 
        */}
          <Stack
            screenOptions={{
              headerTintColor: "#1F104A",
              headerStyle: {
                backgroundColor: "#f472b6",
              },
              headerRight: HeaderRight,
            }}
          >
            {/*
             * Present the profile screen as a modal
             * @see https://expo.github.io/router/docs/guides/modals
             */}
            <Stack.Screen
              name="profile"
              options={{
                title: "Profile",
                presentation: "modal",
                headerRight: undefined,
              }}
            />
          </Stack>
          <StatusBar />
        </SafeAreaProvider>
      </TRPCProvider>
    </SessionContextProvider>
  );
};

const HeaderRight = () => {
  const router = useRouter();

  return (
    <TouchableOpacity onPress={() => router.push("/profile")}>
      <UserCircle2 />
    </TouchableOpacity>
  );
};

export default RootLayout;
