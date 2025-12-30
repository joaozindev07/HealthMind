import { StyleSheet } from "react-native";
import colors from "../../theme/colors";

export const Styles = StyleSheet.create({
     container: { flex: 1 },
  headerContainer: {
    paddingTop: 64, // aumentei para acomodar botões absolutos
    paddingHorizontal: 20,
    zIndex: 2,
    alignItems: "center",
  },
  imageLogo: {
    width: 72,
    height: 72,
    marginTop: 12,
    marginBottom: 6,
  },
  headerTopRow: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center", // centraliza o título
    alignItems: "center",
  },
  headerActions: {
    flexDirection: "row",
    gap: 10,
  },
  headerActionsAbsolute: {
    position: "absolute",
    top: 46,
    right: 20,
    flexDirection: "row",
    gap: 8,
    zIndex: 10,
  },
  iconButton: {
    backgroundColor: colors.white12,
    padding: 8,
    borderRadius: 10,
  },
  appTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.white,
    textAlign: "center", // garante centralização do texto
  },
  subtitle: {
    fontSize: 13,
    color: colors.faintPurple,
    marginTop: 4,
    marginBottom: 10,
    textAlign: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 6,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.white,
  },
  statLabel: {
    fontSize: 11,
    color: colors.faintPurple,
  },
  progressContainer: {
    width: "100%",
    marginTop: 12,
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: colors.white16,
    borderRadius: 6,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    borderRadius: 6,
  },
  progressText: {
    textAlign: "center",
    color: "#FFF",
    marginTop: 8,
    fontWeight: "600",
  },

  contentContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 18,
    paddingBottom: 10,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 10,
    zIndex: 3,
    marginTop: 14,
  },

  tabContainer: {
    flexDirection: "row",
    backgroundColor: colors.mutedLight,
    borderRadius: 12,
    padding: 4,
    marginBottom: 14,
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: colors.white,
    shadowColor: colors.primary,
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  tabText: {
    fontSize: 15,
    fontWeight: "600",
  },

  quickControls: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // centraliza os botões de controle
    marginBottom: 12,
    gap: 8,
    flexWrap: "wrap",
    width: "100%",
  },
  controlButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.faintPurple,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    gap: 8,
    marginHorizontal: 6,
    minWidth: 120,
    justifyContent: "center",
  },
  controlButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  controlText: {
    color: colors.gray,
    fontWeight: "600",
    fontSize: 13,
  },
  controlTextActive: {
    color: colors.white,
  },
  calendarWrapper: {
    alignItems: "center",
    marginBottom: 14,
  },
  calendarCTA: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOpacity: 0.12,
    shadowRadius: 8,
    elevation: 3,
  },
  calendarCTAtext: {
    color: colors.white,
    fontWeight: "700",
  },

  challengeCard: {
    padding: 14,
    backgroundColor: "#FFF",
    borderRadius: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },
  currentCard: {
    borderColor: colors.primary,
    borderWidth: 1.5,
    shadowColor: colors.primary,
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 6,
  },
  completedCard: {
    backgroundColor: colors.white98,
    borderColor: colors.success,
  },

  challengeHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  challengeIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  completedIconContainer: {
    backgroundColor: "#10B981",
  },
  challengeInfo: {
    flex: 1,
  },
  challengeTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  challengeTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.text,
    flex: 1,
  },
  xpBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.white98,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  xpText: {
    fontSize: 12,
    color: colors.warning,
    fontWeight: "700",
    marginLeft: 6,
  },
  challengeDescription: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 6,
  },

  cardMetaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 10,
    gap: 8,
  },
  difficultyPill: {
    backgroundColor: colors.faintPurple,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  difficultyHard: {
    backgroundColor: colors.white16,
  },
  difficultyText: {
    fontSize: 12,
    color: colors.gray,
    fontWeight: "600",
  },
  completedPill: {
    backgroundColor: colors.white98,
    color: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: "700",
    overflow: "hidden",
  },
  currentPill: {
    backgroundColor: colors.faintPurple,
    color: colors.textSecondary,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: "700",
    overflow: "hidden",
  },

  challengeFooter: {
    marginTop: 12,
    alignItems: "center", // mantém centralização do botão no card
  },

  // botão principal (Começar) mantém destaque
  startButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.primary,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: colors.primary,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 120,
    justifyContent: "center",
  },

  // botão "Rever" menos protagonista: menor, sem sombra, borda sutil, texto menor
  startButtonGhost: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "transparent",               // sem fundo para não competir
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.faintPurple,        // borda roxa sutil
    shadowColor: "transparent",
    shadowOpacity: 0,
    shadowRadius: 0,
    elevation: 0,
    minWidth: 88,
    height: 36,
    justifyContent: "center",
  },

  startButtonText: {
    color: colors.white,
    fontWeight: "700",
  },

  startButtonTextGhost: {
    color: colors.primary,
    fontWeight: "600",
    fontSize: 13,            // menor que o botão principal
  },

  achievementCard: {
    marginBottom: 14,
    borderRadius: 12,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 4,
  },
  lockedAchievement: {
    opacity: 0.75,
  },
  achievementGradient: {
    borderRadius: 12,
  },
  achievementContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
  },
  achievementIcon: {
    width: 52,
    height: 52,
    backgroundColor: colors.white70,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 14,
  },
  unlockedIcon: {
    backgroundColor: colors.white95,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textSecondary,
    marginBottom: 4,
  },
  achievementDescription: {
    fontSize: 13,
    color: colors.gray,
  },
  lockedText: {
    color: colors.muted,
  },
  achievementBadge: {
    marginLeft: 8,
    backgroundColor: colors.white9,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  achievementsContainer: {
    marginTop: 10,
    marginBottom: 20,
    paddingHorizontal: 4,
  },
  achievementsTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 8,
  },
  achievementsSubtitle: {
    fontSize: 14,
    color: colors.gray,
    textAlign: "center",
    marginBottom: 16,
  },
})