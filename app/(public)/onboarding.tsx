"use client";

import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function OnboardingScreen() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<{
    nome?: string;
    sentimento?: string;
    uso?: string;
  }>({});
  const [nomeInput, setNomeInput] = useState("");

  const handleNext = async (value?: string) => {
    let newAnswers = { ...answers };
    if (step === 0) newAnswers.nome = nomeInput;
    if (step === 1 && value) newAnswers.sentimento = value;
    if (step === 2 && value) newAnswers.uso = value;

    setAnswers(newAnswers);

    if (step < onboardingQuestions.length - 1) {
      setStep(step + 1);
    } else {
      await AsyncStorage.setItem("onboardingUser", JSON.stringify(newAnswers));
      await AsyncStorage.setItem("onboardingComplete", "true"); // <-- ADICIONE ESTA LINHA
      router.replace("/(tabs)/home");
    }
  };

  const onboardingQuestions = [
    {
      title: "Qual seu nome ou apelido?",
      subtitle: "Isso nos ajuda a te chamar de forma mais pessoal.",
      input: true,
    },
    {
      title: "Como você tem se sentido ultimamente?",
      subtitle: "Escolha a opção que mais representa seu momento.",
      options: [
        { label: "Tranquilo", icon: "happy-outline" },
        { label: "Estressado", icon: "alert-outline" },
        { label: "Ansioso", icon: "cloud-outline" },
        { label: "Desanimado", icon: "sad-outline" },
      ],
    },
    {
      title: "Como gostaria de usar o app?",
      subtitle: "Selecione o que mais faz sentido para sua experiência.",
      options: [
        {
          label: "Agendar consultas com profissionais",
          icon: "calendar-outline",
        },
        { label: "Receber recomendações personalizadas", icon: "star-outline" },
        { label: "Lembretes de autocuidado", icon: "alarm-outline" },
      ],
    },
  ];

  return (
    <LinearGradient
      colors={["#A259F7", "#c85efd", "#be41fd"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#A259F7" />

      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.imageLogo}
          />
        </View>
        <Text style={styles.appTitle}>HEALTHMIND</Text>
        <Text style={styles.welcomeText}>Bem-vindo!</Text>
      </View>

      <LinearGradient
        colors={["rgba(255, 255, 255, 0.98)", "rgba(255, 255, 255, 0.92)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.formContainer}
      >
        {/* Progress Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <LinearGradient
              colors={["#A259F7", "#c85efd"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                styles.progressFill,
                {
                  width: `${((step + 1) / onboardingQuestions.length) * 100}%`,
                },
              ]}
            />
          </View>
          <Text style={styles.progressText}>
            {step + 1} de {onboardingQuestions.length}
          </Text>
        </View>

        {/* Question Section */}
        <View style={styles.questionContainer}>
          <Text style={styles.questionTitle}>
            {onboardingQuestions[step].title}
          </Text>
          <Text style={styles.questionSubtitle}>
            {onboardingQuestions[step].subtitle}
          </Text>
        </View>

        {/* Step 1: Nome */}
        {onboardingQuestions[step].input && (
          <View style={{ marginBottom: 32 }}>
            <TextInput
              style={styles.input}
              placeholder="Digite seu nome ou apelido"
              value={nomeInput}
              onChangeText={setNomeInput}
              placeholderTextColor="#aaa"
            />
            <TouchableOpacity
              style={[
                styles.nextButton,
                { backgroundColor: nomeInput.trim() ? "#A259F7" : "#ccc" },
              ]}
              onPress={() => nomeInput.trim() && handleNext()}
              activeOpacity={0.8}
            >
              <Text style={styles.nextButtonText}>Próximo</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Step 2 & 3: Opções */}
        {onboardingQuestions[step].options && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.optionsContainer}
          >
            {onboardingQuestions[step].options.map((option) => (
              <TouchableOpacity
                key={option.label}
                style={styles.optionButtonWrapper}
                onPress={() => handleNext(option.label)}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={["#A259F7", "#c85efd", "#be41fd"]}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.optionButton}
                >
                  <View style={styles.optionContent}>
                    <View style={styles.optionIconContainer}>
                      <Ionicons
                        name={option.icon as any}
                        size={24}
                        color="#FFFFFF"
                      />
                    </View>
                    <Text style={styles.optionText}>{option.label}</Text>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="rgba(255,255,255,0.7)"
                    />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
        <View style={styles.androidBottomSpacing} />
      </LinearGradient>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  headerContainer: {
    flex: 0.35,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 60,
  },
  logoContainer: { marginBottom: 24 },
  imageLogo: { width: 100, height: 100 },
  appTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    letterSpacing: 2,
    marginBottom: 8,
  },
  welcomeText: { fontSize: 16, color: "rgba(255,255,255,0.8)" },
  formContainer: {
    flex: 0.65,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 32,
    paddingTop: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
  },
  progressContainer: { marginBottom: 32 },
  progressBar: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
    marginBottom: 8,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: 3 },
  progressText: {
    textAlign: "center",
    color: "#6B7280",
    fontSize: 14,
    fontWeight: "500",
  },
  questionContainer: {
    marginBottom: 32,
    alignItems: "center",
  },
  questionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#374151",
    textAlign: "center",
    marginBottom: 8,
  },
  questionSubtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    lineHeight: 22,
  },
  input: {
    borderWidth: 1,
    borderColor: "#A259F7",
    borderRadius: 12,
    padding: 12,
    fontSize: 18,
    marginBottom: 16,
    backgroundColor: "#fff",
    color: "#374151",
  },
  optionsContainer: { flex: 1 },
  optionButtonWrapper: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#A259F7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  optionButton: {
    borderRadius: 16,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  optionContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  optionIconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  optionText: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    marginHorizontal: 16,
  },
  nextButton: {
    backgroundColor: "#A259F7",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
    marginTop: 8,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  androidBottomSpacing: { height: 24 },
});
