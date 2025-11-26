import { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  StatusBar,
  Switch,
  Platform,
  Dimensions,
  Alert,
  ActivityIndicator,
  Image,
  Animated,
  Easing,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useAuth, useUser } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from "expo-image-picker";
import { getUserData, saveUserData } from "../utils/storage";
import * as Notifications from "expo-notifications";

const { width, height } = Dimensions.get("window");
const STATUSBAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight ?? 24 : 0;

// Handler para mostrar notificações enquanto o app está em primeiro plano
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// Solicita permissão para notificações (local)
const registerForNotifications = async (): Promise<boolean> => {
  try {
    const { status } = await Notifications.getPermissionsAsync();
    if (status !== "granted") {
      const { status: newStatus } = await Notifications.requestPermissionsAsync();
      return newStatus === "granted";
    }
    return true;
  } catch (e) {
    console.error("Erro ao solicitar permissão de notificações:", e);
    return false;
  }
};

// Envia notificação local imediata
const sendNotification = async (title: string, body: string) => {
  try {
    await Notifications.scheduleNotificationAsync({
      content: { title, body, data: { source: "profile" } },
      trigger: null,
    });
  } catch (e) {
    console.error("Erro ao enviar notificação:", e);
  }
};

export default function ProfilePage() {
  const router = useRouter();
  const { signOut } = useAuth();
  const { user } = useUser();
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const successOpacity = useState(new Animated.Value(0))[0];
  const successTranslate = useState(new Animated.Value(20))[0];

  const showSuccessToast = (title: string, description?: string) => {
    setShowSuccess(true);
    Animated.parallel([
      Animated.timing(successOpacity, {
        toValue: 1,
        duration: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(successTranslate, {
        toValue: 0,
        duration: 250,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        Animated.parallel([
          Animated.timing(successOpacity, {
            toValue: 0,
            duration: 250,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(successTranslate, {
            toValue: 20,
            duration: 250,
            easing: Easing.in(Easing.quad),
            useNativeDriver: true,
          }),
        ]).start(() => setShowSuccess(false));
      }, 2200);
    });
  };

  useEffect(() => {
    const loadProfile = async () => {
      if (!user) return;

      try {
        const userId = user.id;

        let savedName = await getUserData(userId, "name");
        let savedNickname = await getUserData(userId, "nickname");
        const savedNotifications = await getUserData(userId, "notifications");
        const savedDarkMode = await getUserData(userId, "darkmode");
        let savedImage = await getUserData(userId, "image");

        if (!savedName && user?.fullName) {
          savedName = user.fullName;
        }

        if (!savedImage && user?.imageUrl) {
          savedImage = user.imageUrl;
          await saveUserData(userId, "image", savedImage);
        }

        if (savedName) setName(savedName);
        if (savedNickname) setNickname(savedNickname);
        if (savedNotifications)
          setNotificationsEnabled(savedNotifications === "true");
        if (savedDarkMode) setDarkModeEnabled(savedDarkMode === "true");
        if (savedImage) setProfileImage(savedImage);
      } catch (e) {
        console.error("Erro ao carregar perfil:", e);
      }
    };

    loadProfile();
  }, [user]);

  // garante permissão quando usuário ativa notificações
  useEffect(() => {
    if (notificationsEnabled) {
      registerForNotifications().then((granted) => {
        if (!granted) {
          // desativa se não foi concedida
          setNotificationsEnabled(false);
        }
      });
    }
  }, [notificationsEnabled]);

  // Gera iniciais a partir do apelido > nome > fullName. Retorna "U" se vazio.
  const getInitials = (text?: string) => {
    if (!text) return "U";
    const parts = text.trim().split(/\s+/);
    if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
    return (parts[0][0] + parts[1][0]).toUpperCase();
  };
  const initials = getInitials((nickname || name || user?.fullName) ?? undefined);

  const handleSave = async () => {
    if (!user) return;

    setLoading(true);
    try {
      await saveUserData(user.id, "name", name);
      await saveUserData(user.id, "nickname", nickname);

      setTimeout(() => {
        setLoading(false);
        showSuccessToast("Informações salvas!", "Seus dados foram atualizados.");
      }, 800);
    } catch (e) {
      setLoading(false);
      Alert.alert("Erro", "Não foi possível salvar as informações.");
    }
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });
    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setProfileImage(uri);
      if (user?.id) {
        await saveUserData(user.id, "image", uri);
      }
    }
  };

  return (
    <LinearGradient
      colors={["#A259F7", "#c85efd", "#be41fd"]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#A259F7" />

      <View
        style={[
          styles.header,
          { paddingTop: STATUSBAR_HEIGHT + height * 0.02 },
        ]}
      >
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color="#ffffff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Meu Perfil</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={() => router.push("/settings")}>
          <Ionicons name="settings-outline" size={24} color="#ffffff" />
        </TouchableOpacity>
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={[
            "rgba(255,255,255,0.95)",
            "rgba(255,255,255,0.9)",
            "rgba(255,255,255,0.95)",
          ]}
          style={styles.mainContainer}
        >
          {/* Profile Info */}
          <View style={styles.section}>
            <View style={styles.profileHeader}>
              <View style={styles.avatarContainer}>
                <LinearGradient
                  colors={["#A259F7", "#c85efd"]}
                  style={styles.avatar}
                >
                  {profileImage ? (
                    <Image
                      source={{ uri: profileImage }}
                      style={{ width: 80, height: 80, borderRadius: 40 }}
                    />
                  ) : (
                    <Text style={styles.avatarText}>{initials}</Text>
                  )}
                </LinearGradient>
                <TouchableOpacity
                  style={styles.editAvatarButton}
                  onPress={pickImage}
                >
                  <Ionicons name="camera" size={16} color="#A259F7" />
                </TouchableOpacity>
              </View>
              <View style={styles.profileInfo}>
                <Text style={styles.profileName}>{nickname || "Usuário"}</Text>
                <View style={styles.membershipBadge}>
                  <Ionicons name="star" size={14} color="#FFD700" />
                  <Text style={styles.profileJoined}>Membro Premium</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Personal Information */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Ionicons name="person-outline" size={20} color="#A259F7" />{" "}
              Informações Pessoais
            </Text>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Nome completo</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="person"
                  size={20}
                  color="#A259F7"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  placeholder="Seu nome"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Apelido</Text>
              <View style={styles.inputContainer}>
                <Ionicons
                  name="pricetag"
                  size={20}
                  color="#A259F7"
                  style={styles.inputIcon}
                />
                <TextInput
                  style={styles.input}
                  value={nickname}
                  onChangeText={setNickname}
                  placeholder="Seu apelido"
                />
              </View>
            </View>
          </View>

          {/* Preferences */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Ionicons name="settings-outline" size={20} color="#A259F7" />{" "}
              Preferências
            </Text>

            <View style={styles.preferenceCard}>
              <View style={styles.preferenceItem}>
                <View style={styles.preferenceLeft}>
                  <View style={styles.preferenceIconContainer}>
                    <Ionicons name="notifications" size={20} color="#A259F7" />
                  </View>
                  <View style={styles.preferenceInfo}>
                    <Text style={styles.preferenceTitle}>Notificações</Text>
                    <Text style={styles.preferenceDescription}>
                      Receber lembretes e atualizações
                    </Text>
                  </View>
                </View>
                <Switch
                  value={notificationsEnabled}
                  onValueChange={setNotificationsEnabled}
                  trackColor={{ false: "#E5E7EB", true: "#A259F7" }}
                  thumbColor="#ffffff"
                />
              </View>

              <View style={styles.preferenceItem}>
                <View style={styles.preferenceLeft}>
                  <View style={styles.preferenceIconContainer}>
                    <Ionicons name="moon" size={20} color="#A259F7" />
                  </View>
                  <View style={styles.preferenceInfo}>
                    <Text style={styles.preferenceTitle}>Modo escuro</Text>
                    <Text style={styles.preferenceDescription}>
                      Tema escuro para o aplicativo
                    </Text>
                  </View>
                </View>
                <Switch
                  value={darkModeEnabled}
                  onValueChange={setDarkModeEnabled}
                  trackColor={{ false: "#E5E7EB", true: "#A259F7" }}
                  thumbColor="#ffffff"
                />
              </View>
            </View>
          </View>

          {/* Menu Options */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              <Ionicons
                name="shield-checkmark-outline"
                size={20}
                color="#A259F7"
              />{" "}
              Conta
            </Text>

            <View style={styles.menuCard}>
              
              <TouchableOpacity style={styles.menuItem} onPress={() => router.push("/myData")}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="bar-chart" size={20} color="#A259F7" />
                </View>
                <View style={styles.menuInfo}>
                  <Text style={styles.menuTitle}>Meus Dados</Text>
                  <Text style={styles.menuDescription}>
                    Visualize seu histórico e estatísticas
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.menuItem}>
                <View style={styles.menuIconContainer}>
                  <Ionicons name="help-circle" size={20} color="#A259F7" />
                </View>
                <View style={styles.menuInfo}>
                  <Text style={styles.menuTitle}>Ajuda e Suporte</Text>
                  <Text style={styles.menuDescription}>
                    Central de ajuda e contato
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          {/* Actions */}
          <View style={styles.section}>
            <TouchableOpacity
              style={[styles.saveButton, { marginBottom: 12 }]}
              onPress={handleSave}
            >
              <LinearGradient
                colors={["#A259F7", "#c856f7"]}
                style={styles.saveButtonGradient}
              >
                <Text style={styles.saveButtonText}>salvar</Text>
              </LinearGradient>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.logoutButton}
              onPress={async () => {
                try {
                  await signOut();
                  router.replace("/login");
                } catch (err) {
                  console.log(err);
                }
              }}
            >
              <Ionicons name="log-out-outline" size={20} color="#EF4444" />
              <Text style={styles.logoutButtonText}>Sair da Conta</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ScrollView>

      {showSuccess && (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.successToastContainer,
            {
              opacity: successOpacity,
              transform: [{ translateY: successTranslate }],
            },
          ]}
        >
          <LinearGradient
            colors={["#34D399", "#10B981"]}
            style={styles.successToastGradient}
          >
            <Ionicons
              name="checkmark-circle"
              size={24}
              color="#ffffff"
              style={styles.successToastIcon}
            />
            <View style={{ flex: 1 }}>
              <Text style={styles.successToastTitle}>Informações salvas!</Text>
              <Text style={styles.successToastDescription}>
                Seus dados foram atualizados.
              </Text>
            </View>
          </LinearGradient>
        </Animated.View>
      )}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  androidSpacing: {
    height: Platform.OS === "android" ? 24 : 0,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: width * 0.06,
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#ffffff",
  },
  settingsButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255,255,255,0.2)",
    alignItems: "center",
    justifyContent: "center",
  },

  mainContainer: {
    flex: 1,
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },

  // Sections
  section: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
  },

  profileHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  avatarContainer: {
    position: "relative",
    marginRight: 20,
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#A259F7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderColor: "#A259F7"
  },
  avatarText: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff",
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#A259F7",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: "#6B7280",
    marginBottom: 8,
  },
  membershipBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF7ED",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  profileJoined: {
    fontSize: 12,
    color: "#F59E0B",
    fontWeight: "600",
    marginLeft: 4,
  },

  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingHorizontal: 16,
    borderWidth: 2,
    borderColor: "#F1F5F9",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 16,
    fontSize: 16,
    color: "#1F2937",
  },

  preferenceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  preferenceItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  preferenceLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  preferenceIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  preferenceInfo: {
    flex: 1,
  },
  preferenceTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  preferenceDescription: {
    fontSize: 14,
    color: "#6B7280",
  },

  menuCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginVertical: 2,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F8F4FF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  menuInfo: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 4,
  },
  menuDescription: {
    fontSize: 14,
    color: "#6B7280",
  },

  saveButton: {
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: "#A259F7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  saveButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 18,
    borderRadius: 16,
  },
  saveButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "700",
    marginLeft: 7,
  },
  logoutButton: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FEE2E2",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  logoutButtonText: {
    color: "#EF4444",
    fontSize: 16,
    fontWeight: "600",
    marginLeft: 8,
  },
  successToastContainer: {
    position: "absolute",
    left: width * 0.06,
    right: width * 0.06,
    bottom: 24,
  },
  successToastGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  successToastIcon: {
    marginRight: 12,
  },
  successToastTitle: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "700",
  },
  successToastDescription: {
    color: "#ECFDF5",
    fontSize: 13,
    marginTop: 2,
  },
});
