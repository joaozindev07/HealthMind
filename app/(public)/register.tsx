import React, { useState } from "react";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function RegisterScreen() {
  const { signUp, setActive, isLoaded } = useSignUp();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [dia, setDia] = useState("");
  const [mes, setMes] = useState("");
  const [ano, setAno] = useState("");
  const [genero, setGenero] = useState("");
  const [emailpending, setEmailPending] = useState(false);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Validação dos campos
  const camposValidos =
    nome.length > 2 &&
    email.includes("@") &&
    senha.length >= 6 &&
    dia.length === 2 &&
    mes.length === 2 &&
    ano.length === 4 &&
    genero !== "";

  async function handleregister() {
    setErro("");
    setLoading(true);
    try {
      if (!isLoaded) return;
      await signUp.create({
        emailAddress: email,
        password: senha,
      });
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setEmailPending(true);
      await AsyncStorage.setItem("profile_email", email);
    } catch (err: any) {
      setErro(err.errors?.[0]?.message || "Erro ao criar conta.");
    }
    setLoading(false);
  }

  async function handleVerifyAccount() {
    setErro("");
    setLoading(true);
    try {
      if (!isLoaded) return;
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        await AsyncStorage.removeItem("onboardingComplete"); // <-- Adicione esta linha
        router.replace("/onboarding");
      }

    } catch (err: any) {
      setErro(err.errors?.[0]?.message || "Erro ao verificar código.");
    }
    setLoading(false);
  }

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
          />
        </View>
        <Text style={styles.appTitle}>HEALTHMIND</Text>
        <Text style={styles.subtitle}>Crie sua conta</Text>
      </View>
      <LinearGradient
        colors={["rgba(255, 255, 255, 0.98)", "rgba(255, 255, 255, 0.92)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.formContainer}
      >
        {erro ? <Text style={styles.error}>{erro}</Text> : null}
        <ScrollView showsVerticalScrollIndicator={false}>
          {!emailpending && (
            <>
              {/* Nome */}
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <FontAwesome
                    name="user"
                    size={20}
                    color="#9CA3AF"
                    style={styles.inputIcon}
                  />
                  <TextInput
                    style={styles.textInput}
                    placeholder="Nome de Usuário"
                    placeholderTextColor="#9CA3AF"
                    value={nome}
                    onChangeText={setNome}
                    autoCapitalize="words"
                  />
                </View>
              </View>
              {/* Email */}
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
              {/* Senha */}
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
                    placeholder="Senha (mín. 6 caracteres)"
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
              {/* Data de nascimento */}
              <View style={styles.inputContainer}>
                <Text style={styles.birthLabel}>Data de Nascimento</Text>
                <View style={styles.birthInputs}>
                  <TextInput
                    style={styles.birthInput}
                    placeholder="DD"
                    placeholderTextColor="#9CA3AF"
                    value={dia}
                    onChangeText={setDia}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <TextInput
                    style={styles.birthInput}
                    placeholder="MM"
                    placeholderTextColor="#9CA3AF"
                    value={mes}
                    onChangeText={setMes}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                  <TextInput
                    style={styles.birthInput}
                    placeholder="AAAA"
                    placeholderTextColor="#9CA3AF"
                    value={ano}
                    onChangeText={setAno}
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </View>
              </View>
              {/* Gênero */}
              <View style={styles.inputContainer}>
                <View style={styles.inputWrapper}>
                  <FontAwesome
                    name="venus-mars"
                    size={20}
                    color="#9CA3AF"
                    style={styles.inputIcon}
                  />
                  <Picker
                    selectedValue={genero}
                    style={styles.picker}
                    onValueChange={(itemValue) => {
                      if (itemValue !== "") setGenero(itemValue);
                    }}
                    dropdownIconColor="#9CA3AF"
                  >
                    <Picker.Item
                      label="Selecione o gênero"
                      value=""
                      color="#9CA3AF"
                    />
                    <Picker.Item label="Masculino" value="Masculino" />
                    <Picker.Item label="Feminino" value="Feminino" />
                    <Picker.Item label="Outro" value="Outro" />
                    <Picker.Item
                      label="Prefiro não dizer"
                      value="Prefiro não dizer"
                    />
                  </Picker>
                </View>
              </View>
              {/* Botão Criar Conta */}
              <TouchableOpacity
                style={[
                  styles.registerButtonWrapper,
                  (!camposValidos || loading) && styles.registerButtonDisabled,
                ]}
                onPress={handleregister}
                disabled={!camposValidos || loading}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#A259F7", "#c85efd", "#be41fd"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.registerButton}
                >
                  {loading ? (
                    <View style={styles.loadingContainer}>
                      <ActivityIndicator size="small" color="#FFFFFF" />
                      <Text style={styles.registerButtonText}>Criando...</Text>
                    </View>
                  ) : (
                    <Text style={styles.registerButtonText}>Criar Conta</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
              {/* Link para login */}
              <View style={styles.signInContainer}>
                <Text style={styles.signInText}>Já tem uma conta? </Text>
                <TouchableOpacity>
                  <Link href="/login">
                    <Text style={styles.signInLink}>Entrar</Text>
                  </Link>
                </TouchableOpacity>
              </View>
            </>
          )}

          {/* Verificação de código */}
          {emailpending && (
            <View style={{ marginTop: 20 }}>
              <Text style={styles.title}>
                Digite o código enviado ao seu email
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Código"
                placeholderTextColor="#666"
                value={code}
                onChangeText={setCode}
                keyboardType="numeric"
                maxLength={6}
              />
              <TouchableOpacity
                style={[
                  styles.registerButtonWrapper,
                  loading && styles.registerButtonDisabled,
                ]}
                onPress={handleVerifyAccount}
                disabled={loading || code.length < 4}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#A259F7", "#c85efd", "#be41fd"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.registerButton}
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.registerButtonText}>Ativar Conta</Text>
                  )}
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}
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
    marginBottom: 20,
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
    backgroundColor: "#fff",
    minHeight: height * 0.65,
    marginBottom: -150,
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
    backgroundColor: "transparent",
  },
  eyeButton: {
    padding: 8,
    position: "absolute",
    right: 8,
  },
  birthLabel: {
    color: "#6B7280",
    fontWeight: "bold",
    marginBottom: 4,
    marginLeft: 8,
    fontSize: 13,
  },
  birthInputs: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8,
  },
  birthInput: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 10,
    fontSize: 16,
    color: "#374151",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    elevation: 2,
    width: "30%",
    textAlign: "center",
  },
  picker: {
    flex: 1,
    height: 56,
    color: "#374151",
    backgroundColor: "transparent",
    borderRadius: 16,
    borderWidth: 0,
  },
  registerButtonWrapper: {
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#A259F7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  registerButton: {
    borderRadius: 16,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  registerButtonDisabled: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 8,
    marginBottom: 10,
  },
  signInText: {
    color: "#6B7280",
    fontSize: 16,
  },
  signInLink: {
    color: "#A259F7",
    fontSize: 16,
    fontWeight: "600",
  },
  error: {
    color: "#ff3333",
    fontWeight: "bold",
    marginBottom: 12,
    fontSize: 15,
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#A259F7",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 16,
    height: 56,
    fontSize: 16,
    color: "#374151",
    marginBottom: 20,
  },
});
