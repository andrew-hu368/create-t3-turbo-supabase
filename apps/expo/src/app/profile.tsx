import { useState } from "react";
import {
  Alert,
  Pressable,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { Eye, EyeOff } from "lucide-react-native";

export default function Profile() {
  const user = useUser();
  return (
    <View className="flex-1 bg-[#1F104A] p-4">
      {user ? <SignedInView /> : <SignedOutView />}
    </View>
  );
}

function SignedInView() {
  const supabase = useSupabaseClient();
  const user = useUser();

  return (
    <View className="flex gap-4">
      <Text className="text-zinc-200">Signed in as {user?.email}</Text>
      <TouchableOpacity
        onPress={() => supabase.auth.signOut()}
        className="flex-row items-center justify-center gap-2 rounded-lg bg-zinc-200 p-2"
      >
        <Text className="text-xl font-semibold text-zinc-900">Sign out</Text>
      </TouchableOpacity>
    </View>
  );
}

function SignedOutView() {
  return (
    <View className="space-y-4">
      <Text className="mb-4 text-2xl font-bold text-zinc-200">Sign In</Text>

      {/* Email Sign In */}
      <EmailForm />
    </View>
  );
}

function EmailForm() {
  const supabase = useSupabaseClient();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);

  const signInWithPassword = async () => {
    try {
      const { error, data } = isSignUp
        ? await supabase.auth.signUp({
            email,
            password,
          })
        : await supabase.auth.signInWithPassword({
            email,
            password,
          });
      if (error) Alert.alert("Error", error.message);
      else if (isSignUp && data.user) {
        Alert.alert("Check your email for a confirmation link.");
        setIsSignUp(false);
      }
    } catch (error) {
      Alert.alert("Request failed", (error as Error).message);
    }
  };

  return (
    <View className="flex-col gap-4">
      <TextInput
        className="mb-2 rounded bg-white/10 p-2 text-white"
        placeholderTextColor="rgba(255, 255, 255, 0.5)"
        value={email}
        autoCapitalize="none"
        onChangeText={setEmail}
        placeholder="Email"
      />
      <View className="relative space-y-1">
        <TextInput
          className="mb-2 rounded bg-white/10 p-2 text-white"
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          placeholder="Password"
        />
        <Pressable
          className="absolute right-2"
          onPress={() => setShowPassword((prev) => !prev)}
        >
          {showPassword && <Eye size={24} color="#A1A1A9" />}
          {!showPassword && <EyeOff size={24} color="#A1A1A9" />}
        </Pressable>
      </View>

      <Pressable className="h-4" onPress={() => setIsSignUp((prev) => !prev)}>
        <Text className="flex-1 text-white">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}
        </Text>
      </Pressable>

      <TouchableOpacity
        onPress={signInWithPassword}
        className="rounded bg-pink-400 p-2"
      >
        <Text className="font-semibold text-white">
          {isSignUp ? "Sign Up" : "Sign In"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
