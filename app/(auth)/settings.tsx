import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import colors from "../theme/colors";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Switch,
} from "react-native";

const { width, height } = Dimensions.get("window");

export default function SettingsPage() {
  const router = useRouter();

  return (
    <LinearGradient
      colors={[colors.primary, colors.primaryLight, colors.primaryDark]}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />

      <View style={[styles.header, { paddingTop: 24 + height * 0.02 }]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={24} color={colors.white} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Configurações</Text>
        <View style={{ width: 44 }} />
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
          {/* Conta */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conta</Text>
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.linkRow}
                onPress={() => router.push("/profile")}
              >
                <View style={styles.iconCircle}>
                  <Ionicons
                    name="person-circle-outline"
                    size={20}
                    color={colors.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Dados da conta</Text>
                  <Text style={styles.desc}>
                    Nome, email e informações pessoais
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.linkRow} onPress={() => {}}>
                <View style={styles.iconCircle}>
                  <Ionicons
                    name="shield-checkmark-outline"
                    size={20}
                    color={colors.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Segurança</Text>
                  <Text style={styles.desc}>
                    Senha, 2FA e dispositivos confiáveis
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.linkRow} onPress={() => {}}>
                <View style={styles.iconCircle}>
                  <Ionicons
                    name="finger-print-outline"
                    size={20}
                    color={colors.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Sessões ativas</Text>
                  <Text style={styles.desc}>
                    Gerencie dispositivos conectados
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Aplicativo */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Aplicativo</Text>
            <View style={styles.card}>
              <TouchableOpacity
                style={styles.linkRow}
                onPress={() => router.push("/profile")}
              >
                <View style={styles.iconCircle}>
                  <Ionicons
                    name="notifications-outline"
                    size={20}
                    color={colors.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Notificações</Text>
                  <Text style={styles.desc}>Gerenciar no Perfil</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkRow}
                onPress={() => router.push("/profile")}
              >
                <View style={styles.iconCircle}>
                  <Ionicons name="moon-outline" size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Aparência (Tema)</Text>
                  <Text style={styles.desc}>Gerenciar no Perfil</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.linkRow} onPress={() => {}}>
                <View style={styles.iconCircle}>
                  <Ionicons name="globe-outline" size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Idioma</Text>
                  <Text style={styles.desc}>Português (Brasil)</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.linkRow} onPress={() => {}}>
                <View style={styles.iconCircle}>
                  <Ionicons
                    name="accessibility-outline"
                    size={20}
                    color={colors.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Acessibilidade</Text>
                  <Text style={styles.desc}>Tamanho do texto e contraste</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Dados e Armazenamento */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Dados e Armazenamento</Text>
            <View style={styles.card}>
              <TouchableOpacity style={styles.linkRow} onPress={() => {}}>
                <View style={styles.iconCircle}>
                  <Ionicons name="cloud-outline" size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Uso de dados</Text>
                  <Text style={styles.desc}>
                    Controle de sincronização e mídia
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
              </TouchableOpacity>

              <TouchableOpacity style={styles.linkRow} onPress={() => {}}>
                <View style={styles.iconCircle}>
                  <Ionicons name="trash-outline" size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Limpar cache</Text>
                  <Text style={styles.desc}>Liberar armazenamento local</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
              </TouchableOpacity>

              <View style={[styles.row, { borderBottomWidth: 0 }]}>
                <View style={styles.left}>
                  <View style={styles.iconCircle}>
                    <Ionicons name="wifi-outline" size={20} color={colors.primary} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.title}>
                      Downloads somente via Wi‑Fi
                    </Text>
                    <Text style={styles.desc}>Evita uso de dados móveis</Text>
                  </View>
                </View>
                <Switch
                  value={true}
                  onValueChange={() => {}}
                  trackColor={{ false: colors.border, true: colors.primary }}
                  thumbColor={colors.white}
                />
              </View>
            </View>
          </View>

          {/* Privacidade */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Privacidade</Text>
            <View style={styles.card}>
              <TouchableOpacity style={styles.linkRow} onPress={() => {}}>
                <View style={styles.iconCircle}>
                  <Ionicons name="eye-off-outline" size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Compartilhamento de dados</Text>
                  <Text style={styles.desc}>Controle de dados analíticos</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.linkRow} onPress={() => {}}>
                <View style={styles.iconCircle}>
                  <Ionicons name="shield-outline" size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Rastreamento</Text>
                  <Text style={styles.desc}>
                    Preferências de cookies e anúncios
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Sobre */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre</Text>
            <View style={styles.card}>
              <TouchableOpacity style={styles.linkRow} onPress={() => {}}>
                <View style={styles.iconCircle}>
                  <Ionicons
                    name="document-text-outline"
                    size={20}
                    color={colors.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Termos de Uso</Text>
                  <Text style={styles.desc}>Leia os termos do serviço</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.linkRow} onPress={() => {}}>
                <View style={styles.iconCircle}>
                  <Ionicons
                    name="newspaper-outline"
                    size={20}
                    color={colors.primary}
                  />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.title}>Política de Privacidade</Text>
                  <Text style={styles.desc}>Como tratamos seus dados</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color={colors.muted} />
              </TouchableOpacity>
              <View
                style={[styles.linkRow, { justifyContent: "space-between" }]}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={styles.iconCircle}>
                    <Ionicons
                      name="information-circle-outline"
                      size={20}
                      color={colors.primary}
                    />
                  </View>
                  <Text style={styles.title}>Versão do app</Text>
                </View>
                <Text style={styles.desc}>v1.0.0</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Conta</Text>
            <View style={styles.card}>
              <TouchableOpacity style={styles.linkRow}>
                <Ionicons
                  name="person-circle-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.linkText}>Dados da conta</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.muted}
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.linkRow}>
                <Ionicons
                  name="shield-checkmark-outline"
                  size={20}
                  color={colors.primary}
                />
                <Text style={styles.linkText}>Segurança</Text>
                <Ionicons
                  name="chevron-forward"
                  size={20}
                  color={colors.muted}
                  style={{ marginLeft: "auto" }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollView: { flex: 1 },
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
    backgroundColor: colors.white20,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { fontSize: 20, fontWeight: "700", color: colors.white },

  mainContainer: {
    flex: 1,
    marginTop: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 24,
    paddingBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  section: { paddingHorizontal: 24, marginBottom: 24 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 12,
  },

  card: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.mutedLight,
  },
  left: { flexDirection: "row", alignItems: "center", flex: 1 },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.faintPurple,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  title: { fontSize: 16, fontWeight: "600", color: colors.text },
  desc: { fontSize: 13, color: colors.gray },

  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  linkText: {
    marginLeft: 10,
    color: colors.text,
    fontSize: 16,
    fontWeight: "600",
  },
});
