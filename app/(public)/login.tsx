import { useState, useEffect } from "react";
import { Platform } from "react-native";
import {
  View,
  ScrollView,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  StatusBar,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link, useRouter } from "expo-router";
import { useOAuth, useSignIn, useUser } from "@clerk/clerk-expo";
import * as WebBrowser from "expo-web-browser";
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import * as linking from 'expo-linking';

const { width, height } = Dimensions.get("window");
WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState("");
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();
  const googleOAuth = useOAuth({ strategy: "oauth_google" }); // <-- Mova para o topo do componente
  const { user } = useUser(); // Adicione este hook

  async function handleLogin() {
    if (!isLoaded) return;
    setIsLoading(true);
    setErro("");
    try {
      const result = await signIn.create({
        identifier: email,
        password: senha,
      });
      await setActive({ session: result.createdSessionId });
      // Aqui você pode verificar o onboarding
      const onboardingComplete = await AsyncStorage.getItem("onboardingComplete");
      if (!onboardingComplete) {
        router.replace("/onboarding");
      } else {
        router.replace("/(tabs)/home");
      }
    } catch (e: any) {
      setErro(e.errors?.[0]?.message || "Email ou senha inválidos.");
    } finally {
      setIsLoading(false);
    }
  }

  async function OnGoogleSignIn() {
    try {
      const redirectUrl = linking.createURL('/');
      const oAuthFlow = await googleOAuth.startOAuthFlow({ redirectUrl });

      if (oAuthFlow.authSessionResult?.type === "success") {
        if (oAuthFlow.setActive) {
          await oAuthFlow.setActive({ session: oAuthFlow.createdSessionId });

          // Aguarde o Clerk atualizar o usuário
          setTimeout(async () => {
            // Pegue os dados do usuário logado
            const currentUser = user;
            if (currentUser) {
              await AsyncStorage.setItem("profile_email", currentUser.emailAddresses[0]?.emailAddress || "");
              await AsyncStorage.setItem("profile_name", currentUser.fullName || "");
              await AsyncStorage.setItem("profile_photo", currentUser.imageUrl || "");
            }
            // Verifique onboarding após login social
            const onboardingComplete = await AsyncStorage.getItem("onboardingComplete");
            if (!onboardingComplete) {
              router.replace("/onboarding");
            } else {
              router.replace("/(tabs)/home");
            }
          }, 500); // Pequeno delay para garantir que Clerk atualizou
        }
      } else {
        console.log("Google Sign-In cancelled or failed");
      }
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (Platform.OS !== "web") {
      WebBrowser.warmUpAsync();
      return () => {
        WebBrowser.coolDownAsync();
      };
    }
  }, []);

  return (
    <LinearGradient
      colors={["#A259F7", "#c85efd", "#be41fd"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#A259F7" />
      {/* Header Section */}
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.logo}
          ></Image>
        </View>
        <Text style={styles.appTitle}>HEALTHMIND</Text>
        <Text style={styles.subtitle}>Entre na sua conta</Text>
      </View>
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.98)", "rgba(255, 255, 255, 0.92)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.formContainer}
      >
        {erro ? (
          <Text
            style={{ color: "#ff3333", textAlign: "center", marginBottom: 12 }}
          >
            {erro}
          </Text>
        ) : null}
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="mail-outline"
                size={20}
                color="#9CA3AF"
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Email"
                placeholderTextColor="#9CA3AF"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <Ionicons
                name="lock-closed-outline"
                size={20}
                color="#9CA3AF"
                style={styles.inputIcon}
              />
              <TextInput
                style={[styles.textInput, { paddingRight: 50 }]}
                placeholder="Senha"
                placeholderTextColor="#9CA3AF"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry={!showPassword}
                autoCapitalize="none"
                autoCorrect={false}
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setShowPassword(!showPassword)}
              >
                <Ionicons
                  name={showPassword ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color="#9CA3AF"
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* Forgot Password */}
          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Esqueceu a senha?</Text>
          </TouchableOpacity>

          {/* Login Button */}
          <TouchableOpacity
            style={[
              styles.loginButtonWrapper,
              isLoading && styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={isLoading}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={["#A259F7", "#c85efd", "#be41fd"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginButton}
            >
              {isLoading ? (
                <View style={styles.loadingContainer}>
                  <ActivityIndicator size="small" color="#FFFFFF" />
                  <Text style={styles.loginButtonText}>Entrando...</Text>
                </View>
              ) : (
                <Text style={styles.loginButtonText}>Entrar</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou continue com</Text>
            <View style={styles.dividerLine} />
          </View>

          {/* Social Buttons */}
          <View style={styles.socialButtonsContainer}>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7} onPress={OnGoogleSignIn}>
              <Text style={styles.socialButtonText}>G</Text>
              <Text style={styles.socialButtonLabel}>Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialButton} activeOpacity={0.7}>
              <Text style={styles.socialButtonText}>f</Text>
              <Text style={styles.socialButtonLabel}>Facebook</Text>
            </TouchableOpacity>
          </View>

          {/* Sign Up Link */}
          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>Não tem uma conta? </Text>
            <TouchableOpacity>
              <Link href="/register">
                <Text style={styles.signUpLink}>Cadastre-se</Text>
              </Link>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: "contain",
  },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.8)",
  },
  formContainer: {
    flex: 0.6,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 32,
    paddingTop: 40,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  inputContainer: {
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    height: 56,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: "#374151",
    paddingVertical: 0,
  },
  eyeButton: {
    padding: 8,
    position: "absolute",
    right: 8,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 32,
  },
  forgotPasswordText: {
    color: "#A259F7",
    fontSize: 14,
    fontWeight: "600",
  },
  loginButtonWrapper: {
    borderRadius: 16,
    marginBottom: 32,
    shadowColor: "#A259F7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  loginButton: {
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  loginButtonDisabled: {
    opacity: 0.7,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    marginHorizontal: 16,
    color: "#6B7280",
    fontSize: 14,
  },
  socialButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 32,
  },
  socialButton: {
    flex: 0.48,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  socialButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    marginRight: 8,
    color: "#374151",
  },
  socialButtonLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 24,
    marginBottom: 20,
  },
  signUpText: {
    color: "#6B7280",
    fontSize: 16,
  },
  signUpLink: {
    color: "#A259F7",
    fontSize: 16,
    fontWeight: "600",
  },
});
