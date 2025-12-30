import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";
import colors from "../../theme/colors";

const { width, height } = Dimensions.get("window");

export const Styles = StyleSheet.create({
     container: {
    flex: 1,
      backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },

  // Hero Section
  heroSection: {
    paddingHorizontal: width * 0.06,
    // paddingTop será sobrescrito no componente
    paddingBottom: height * 0.05,
    position: "relative",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    zIndex: 2,
  },
  heroContent: {
    flex: 1,
    // paddingRight será sobrescrito no componente
  },
  profileButton: {
    marginTop: height * 0.001,
  },
  profileIcon: {
    width: width * 0.18,
    height: width * 0.18,
    borderRadius: width * 0.17,
    backgroundColor: colors.mutedLight,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#A259F7",
  },
  profileIconText: {
    fontSize: width * 0.055,
    color: colors.gray,
  },
  heroTitle: {
    fontSize: width * 0.08,
    fontWeight: "700",
    color: "#1F2937",
    lineHeight: width * 0.1,
    marginBottom: height * 0.015,
  },
  heroSubtitle: {
    fontSize: width * 0.045,
    color: "#6B7280",
    lineHeight: width * 0.06,
    marginBottom: height * 0.01,
    marginRight: -55,
  },
  heroIllustration: {
    position: "absolute",
    right: -width * 0.05,
    top: height * 0.05,
    width: width * 0.32,
    height: width * 0.32,
  },
  illustrationCircle1: {
    position: "absolute",
    width: width * 0.16,
    height: width * 0.16,
    borderRadius: width * 0.08,
    backgroundColor: colors.primary,
    opacity: 0.1,
    top: 0,
    right: 0,
  },
  illustrationCircle2: {
    position: "absolute",
    width: width * 0.11,
    height: width * 0.11,
    borderRadius: width * 0.055,
    backgroundColor: colors.primary,
    opacity: 0.2,
    top: width * 0.08,
    right: width * 0.11,
  },
  illustrationCircle3: {
    position: "absolute",
    width: width * 0.21,
    height: width * 0.21,
    borderRadius: width * 0.105,
    backgroundColor: colors.primary,
    opacity: 0.05,
    top: width * 0.05,
    right: width * 0.05,
  },

  // Sections
  section: {
    paddingHorizontal: width * 0.06,
    marginBottom: height * 0.05,
  },
  sectionTitle: {
    fontSize: width * 0.06,
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: height * 0.01,
  },
  sectionSubtitle: {
    fontSize: width * 0.045,
    color: "#6B7280",
    marginBottom: height * 0.03,
  },

  // Mood Tracker
  moodContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: height * 0.03,
    // gap não é suportado em RN, usamos marginHorizontal nos filhos
  },
  moodButton: {
    alignItems: "center",
    borderRadius: 16,
    backgroundColor: colors.mutedLight,
    borderWidth: 1,
    borderColor: "transparent",
  },
  moodButtonSelected: {
    backgroundColor: "#ffffff",
    borderWidth: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  moodEmoji: {
    marginBottom: height * 0.01,
  },
  moodLabel: {
    color: "#6B7280",
    fontWeight: "500",
  },
  noteContainer: {
    backgroundColor: "#F1F5F9",
    borderRadius: 16,
    padding: width * 0.05,
  },
  noteInput: {
    color: "#1F2937",
    textAlignVertical: "top",
    marginBottom: height * 0.02,
  },
  saveNoteButton: {
    backgroundColor: "#A259F7",
    borderRadius: 12,
    paddingVertical: height * 0.018,
    alignItems: "center",
  },
  saveNoteText: {
    color: colors.white,
    fontWeight: "600",
  },

  // Botão Reflexões (novo)
  reflectionsButton: {
    marginVertical: height * 0.02,
    alignSelf: "flex-start",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    paddingVertical: height * 0.012,
    paddingHorizontal: width * 0.04,
    borderWidth: 1,
    borderColor: "#E6E0FA",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  reflectionsButtonText: {
    color: "#6B46C1",
    fontWeight: "700",
  },

  // Professionals
  professionalsScroll: {
    marginHorizontal: -width * 0.06,
    paddingHorizontal: width * 0.06,
  },
  professionalCard: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    marginRight: width * 0.04,
    marginBottom: height * 0.01,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
    borderWidth: 1,
    borderColor: colors.mutedLight,
  },
  professionalHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: height * 0.02,
    position: "relative",
  },
  professionalAvatar: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.primary,
  },
  professionalInitial: {
    color: colors.white,
    fontWeight: "700",
  },
  statusIndicator: {
    position: "absolute",
    right: 0,
    top: 0,
    borderWidth: 2,
    borderColor: colors.white,
  },
  professionalName: {
    fontWeight: "700",
    color: "#1F2937",
    marginBottom: height * 0.005,
  },
  professionalSpecialty: {
    color: "#6B7280",
    marginBottom: height * 0.015,
  },
  ratingContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  ratingText: {
    color: "#1F2937",
    fontWeight: "600",
  },
  availabilityText: {
    fontWeight: "500",
  },
  connectButton: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: height * 0.018,
  },
  connectButtonDisabled: {
    backgroundColor: "#F1F5F9",
  },
  connectButtonText: {
    color: colors.white,
    fontWeight: "600",
  },
  connectButtonTextDisabled: {
    color: "#6B7280",
  },

  // Resources
  resourcesScroll: {
    paddingHorizontal: width * 0.06,
  },
  resourceCard: {
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginRight: width * 0.04,
    marginBottom: height * 0.01,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.mutedLight,
  },
  resourceHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: height * 0.02,
  },
  resourceIcon: {
    alignItems: "center",
    justifyContent: "center",
  },
  resourceIconText: {},
  resourceDuration: {
    color: "#6B7280",
    fontWeight: "500",
  },
  resourceTitle: {
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: height * 0.005,
  },
  resourceType: {
    color: "#6B7280",
  },

  // Footer
  footer: {
    alignItems: "center",
    backgroundColor: colors.mutedLight,
  },
  footerText: {
    color: "#1F2937",
    marginBottom: height * 0.02,
    fontWeight: "500",
  },
  emergencyButton: {
    backgroundColor: colors.danger,
    borderRadius: 12,
    marginBottom: height * 0.03,
    alignItems: "center",
  },
  emergencyButtonText: {
    color: colors.white,
    fontWeight: "600",
  },
  footerLinks: {
    flexDirection: "row",
    gap: width * 0.06,
  },
  footerLink: {
    color: "#6B7280",
    textDecorationLine: "underline",
  },
})