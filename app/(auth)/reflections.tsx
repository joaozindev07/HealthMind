import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Platform,
  StatusBar,
  Alert,
  TextInput,
  Modal,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUser } from "@clerk/clerk-expo";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserData, saveUserData } from "../utils/storage";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import colors from '../theme/colors';

const { width, height } = Dimensions.get("window");
const STATUSBAR_HEIGHT =
  Platform.OS === "android" ? StatusBar.currentHeight ?? 20 : 0;

const PRIMARY = colors.primary;
const ACCENT = colors.primaryDark;
const MUTED = colors.gray;

const moods = [
  { emoji: "😊", label: "Feliz", color: colors.success },
  { emoji: "😌", label: "Calmo", color: colors.info },
  { emoji: "😔", label: "Triste", color: colors.gray },
  { emoji: "😰", label: "Ansioso", color: colors.warning },
  { emoji: "😡", label: "Irritado", color: colors.danger },
];

export default function ReflectionsPage() {
  const router = useRouter();
  const { user } = useUser();
  const [reflections, setReflections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal state for create/edit
  const [modalVisible, setModalVisible] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [modalMood, setModalMood] = useState<string | null>(null);
  const [modalNote, setModalNote] = useState("");

  useEffect(() => {
    loadReflections();
  }, [user]);

  const storageKeyLocal = "reflections_local";

  // READ
  const loadReflections = async () => {
    setLoading(true);
    try {
      let raw = null;
      if (user && user.id) {
        raw = await getUserData(user.id, "reflections");
      } else {
        raw = await AsyncStorage.getItem(storageKeyLocal);
      }
      const arr = raw ? JSON.parse(raw) : [];
      arr.sort((a: any, b: any) => {
        const ta = a?.createdAt ? Date.parse(a.createdAt) : 0;
        const tb = b?.createdAt ? Date.parse(b.createdAt) : 0;
        return tb - ta;
      });
      setReflections(arr);
    } catch (e) {
      console.error("Erro ao carregar reflexões:", e);
      Alert.alert("Erro", "Não foi possível carregar reflexões.");
    } finally {
      setLoading(false);
    }
  };

  const persistReflections = async (arr: any[]) => {
    try {
      if (user && user.id) {
        await saveUserData(user.id, "reflections", JSON.stringify(arr));
      } else {
        await AsyncStorage.setItem(storageKeyLocal, JSON.stringify(arr));
      }
    } catch (e) {
      console.error("Erro ao salvar reflexões:", e);
      Alert.alert("Erro", "Não foi possível salvar reflexões.");
    }
  };

  // CREATE
  const createReflection = async (mood: string | null, note: string) => {
    const now = new Date().toISOString();
    const newReflection = {
      id: Date.now().toString(),
      mood,
      note,
      createdAt: now,
      updatedAt: now,
    };
    const arr = [newReflection, ...reflections];
    setReflections(arr);
    await persistReflections(arr);
  };

  // UPDATE
  const updateReflection = async (
    id: string,
    mood: string | null,
    note: string
  ) => {
    const now = new Date().toISOString();
    const arr = reflections.map((r) =>
      r.id === id ? { ...r, mood, note, updatedAt: now } : r
    );
    setReflections(arr);
    await persistReflections(arr);
  };

  // DELETE
  const deleteReflection = (id: string) => {
    Alert.alert("Confirmar", "Deseja excluir esta reflexão?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: async () => {
          try {
            const arr = reflections.filter((r) => r.id !== id);
            setReflections(arr);
            await persistReflections(arr);
          } catch (e) {
            console.error("Erro ao excluir reflexão:", e);
            Alert.alert("Erro", "Não foi possível excluir a reflexão.");
          }
        },
      },
    ]);
  };

  // Open modal for new or edit
  const openNewModal = () => {
    setEditingId(null);
    setModalMood(null);
    setModalNote("");
    setModalVisible(true);
  };

  const openEditModal = (r: any) => {
    setEditingId(r.id);
    setModalMood(r.mood ?? null);
    setModalNote(r.note ?? "");
    setModalVisible(true);
  };

  // SAVE from modal -> decide create or update
  const saveFromModal = async () => {
    if (!modalMood && modalNote.trim().length === 0) {
      Alert.alert("Atenção", "Adicione uma reflexão ou selecione um humor.");
      return;
    }

    try {
      if (editingId) {
        await updateReflection(editingId, modalMood, modalNote);
      } else {
        await createReflection(modalMood, modalNote);
      }
      setModalVisible(false);
    } catch (e) {
      console.error("Erro ao salvar reflexão:", e);
      Alert.alert("Erro", "Não foi possível salvar a reflexão.");
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardTop}>
          <View style={styles.moodBadge}>
            <Text style={styles.moodEmoji}>
              {moods.find((m) => m.label === item.mood)?.emoji ?? "💭"}
            </Text>
            <Text style={styles.moodLabelSmall}>{item.mood ?? "—"}</Text>
          </View>

          <Text style={styles.cardDate}>
            {item.createdAt ? new Date(item.createdAt).toLocaleString() : "—"}
          </Text>
        </View>

        <Text style={styles.cardNote} numberOfLines={6}>
          {item.note}
        </Text>

        <View style={styles.cardFooter}>
          <View style={{ flexDirection: "row", gap: 12 }}>
            <TouchableOpacity
              style={styles.smallAction}
              onPress={() => openEditModal(item)}
            >
              <Ionicons name="create-outline" size={16} color={ACCENT} />
              <Text style={styles.smallActionText}>Editar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.smallAction}
              onPress={() => deleteReflection(item.id)}
            >
              <Ionicons name="trash-outline" size={16} color={colors.danger} />
              <Text style={[styles.smallActionText, { color: colors.danger }]}>
                Excluir
              </Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.updatedAt}>
            {item.updatedAt
              ? `Atualizado: ${new Date(item.updatedAt).toLocaleDateString()}`
              : ""}
          </Text>
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
        <View
          style={[styles.headerWrap, { paddingTop: STATUSBAR_HEIGHT - 20 }]}
        >
          <LinearGradient
            colors={[PRIMARY, ACCENT]}
            style={styles.headerGradient}
          >
            <TouchableOpacity
              onPress={() => router.back()}
              style={styles.headerBack}
            >
              <Ionicons name="arrow-back" size={22} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Minhas Reflexões</Text>
            <View style={{ width: 44 }} />
          </LinearGradient>
        </View>

        <View style={styles.loading}>
          <ActivityIndicator size="large" color={PRIMARY} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
    <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <View style={[styles.headerWrap, { paddingTop: STATUSBAR_HEIGHT - 20 }]}>
        <LinearGradient
          colors={[PRIMARY, ACCENT]}
          style={styles.headerGradient}
        >
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.headerBack}
          >
              <Ionicons name="arrow-back" size={22} color={colors.white} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Minhas Reflexões</Text>
            <TouchableOpacity onPress={openNewModal} style={styles.headerAdd}>
            <Ionicons name="add" size={20} color={colors.white} />
          </TouchableOpacity>
        </LinearGradient>
      </View>

      {reflections.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>Nenhuma reflexão ainda</Text>
          <Text style={styles.emptySubtitle}>
            Registre seus pensamentos e emoções para acompanhar sua jornada.
          </Text>

          <TouchableOpacity style={styles.primaryCta} onPress={openNewModal}>
            <LinearGradient
              colors={[PRIMARY, ACCENT]}
              style={styles.primaryCtaGradient}
            >
              <Ionicons
                name="create-outline"
                size={18}
                color={colors.white}
                style={{ marginRight: 8 }}
              />
              <Text style={styles.primaryCtaText}>Adicionar Reflexão</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={reflections}
          keyExtractor={(i) => i.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}

      {/* Modal para criar/editar */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>
              {editingId ? "Editar" : "Nova Reflexão"}
            </Text>

            <Text style={styles.label}>Humor</Text>
            <View style={{ flexDirection: "row", marginBottom: 12 }}>
              {moods.map((m) => {
                const selected = modalMood === m.label;
                return (
                  <TouchableOpacity
                    key={m.label}
                    onPress={() =>
                      setModalMood((prev) =>
                        prev === m.label ? null : m.label
                      )
                    }
                    style={[
                      styles.moodPicker,
                      selected && {
                        borderColor: m.color,
                        borderWidth: 2,
                          backgroundColor: colors.white,
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 20 }}>{m.emoji}</Text>
                    <Text style={{ fontSize: 12, color: MUTED }}>
                      {m.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <Text style={styles.label}>Reflexão</Text>
            <TextInput
              value={modalNote}
              onChangeText={setModalNote}
              placeholder="Escreva sua reflexão..."
              multiline
              style={styles.textarea}
            />

            <View style={styles.modalActions}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.modalBtnCancel}
              >
                <Text style={{ color: MUTED }}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={saveFromModal}
                style={styles.modalBtnSave}
              >
                <LinearGradient
                  colors={[PRIMARY, ACCENT]}
                  style={styles.modalSaveGradient}
                >
                  <Text style={{ color: colors.white, fontWeight: "700" }}>
                    {editingId ? "Salvar" : "Adicionar"}
                  </Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },

  headerWrap: {
    shadowColor: colors.black,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
  headerGradient: {
    height: 84,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  headerBack: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerAdd: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "700",
  },

  listContent: {
    padding: 20,
    paddingBottom: 36,
  },

    card: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.mutedLight,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
  },
  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  moodBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.mutedLight,
  },
  moodEmoji: {
    fontSize: 18,
    marginRight: 8,
  },
  moodLabelSmall: {
    color: MUTED,
    fontWeight: "600",
  },
  cardDate: {
    color: MUTED,
    fontSize: 12,
  },

  cardNote: {
   color: colors.text,
   marginBottom: 12,
   lineHeight: 20,
 },

  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  smallAction: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  smallActionText: {
    color: ACCENT,
    marginLeft: 6,
    fontWeight: "600",
  },
  updatedAt: {
    color: MUTED,
    fontSize: 12,
  },

  emptyWrap: {
    padding: 24,
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  emptySubtitle: {
    color: MUTED,
    textAlign: "center",
    marginBottom: 18,
  },

  primaryCta: {
    width: "100%",
    alignItems: "center",
  },
  primaryCtaGradient: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
  },
  primaryCtaText: {
    color: colors.white,
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    padding: 20,
  },
  modalCard: {
    backgroundColor: colors.white,
    borderRadius: 14,
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.text,
    marginBottom: 8,
  },
  label: {
    color: MUTED,
    marginBottom: 6,
  },

    moodPicker: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    marginRight: 10,
    borderRadius: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.mutedLight,
    minWidth: 72,
  },

  textarea: {
    minHeight: 100,
    borderRadius: 10,
    backgroundColor: colors.mutedLight,
    padding: 12,
    color: colors.text,
    marginBottom: 12,
  },

  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  modalBtnCancel: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  modalBtnSave: {
    borderRadius: 10,
    overflow: "hidden",
  },
  modalSaveGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  loading: { flex: 1, justifyContent: "center", alignItems: "center" },
});
