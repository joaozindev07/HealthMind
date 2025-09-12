"use client";

import { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const { width, height } = Dimensions.get("window");

// Dados do calendário de intensivo
const intensiveData = {
  title: "Intensivo Dias Felizes",
  subtitle: "7 dias para transformar seu humor",
  startDate: new Date(2024, 2, 1), // Março 2024
  totalDays: 7,
  currentDay: 4,
  completedDays: 3,
};

// Gerar dados do calendário para o mês
const generateCalendarData = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  const calendar = [];
  
  // Adicionar dias vazios do início do mês
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendar.push({ day: null, isEmpty: true });
  }

  // Adicionar dias do mês
  for (let day = 1; day <= daysInMonth; day++) {
    const isIntensiveDay = day >= 1 && day <= 7; // Primeiros 7 dias do mês
    const isCompleted = isIntensiveDay && day <= intensiveData.completedDays;
    const isCurrent = isIntensiveDay && day === intensiveData.currentDay;
    const isToday = day === today.getDate();
    
    calendar.push({
      day,
      isEmpty: false,
      isIntensiveDay,
      isCompleted,
      isCurrent,
      isToday,
      intensiveDay: isIntensiveDay ? day : null,
    });
  }

  return calendar;
};

const monthNames = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

export default function IntensiveCalendarScreen() {
  const [currentDate] = useState(new Date());
  const calendarData = generateCalendarData();
  
  const currentMonth = monthNames[currentDate.getMonth()];
  const currentYear = currentDate.getFullYear();

  const renderCalendarDay = (item, index) => {
    if (item.isEmpty) {
      return <View key={index} style={styles.emptyDay} />;
    }

    let dayStyle = [styles.calendarDay];
    let textStyle = [styles.dayText];
    let iconName = null;

    if (item.isCompleted) {
      dayStyle.push(styles.completedDay);
      textStyle.push(styles.completedDayText);
      iconName = "checkmark";
    } else if (item.isCurrent) {
      dayStyle.push(styles.currentDay);
      textStyle.push(styles.currentDayText);
      iconName = "play";
    } else if (item.isIntensiveDay) {
      dayStyle.push(styles.intensiveDay);
      textStyle.push(styles.intensiveDayText);
    } else if (item.isToday) {
      dayStyle.push(styles.todayDay);
      textStyle.push(styles.todayText);
    }

    return (
      <TouchableOpacity
        key={index}
        style={dayStyle}
        activeOpacity={item.isIntensiveDay ? 0.7 : 1}
      >
        {iconName ? (
          <View style={styles.dayContent}>
            <Ionicons
              name={"checkmark"}
              size={16}
              color={item.isCompleted ? "#FFFFFF" : "#A259F7"}
            />
            <Text style={[textStyle, { fontSize: 10, marginTop: 2 }]}>
              {item.day}
            </Text>
          </View>
        ) : (
          <Text style={textStyle}>{item.day}</Text>
        )}
        
        {item.isIntensiveDay && (
          <View style={styles.intensiveDot} />
        )}
      </TouchableOpacity>
    );
  };

  const renderLegend = () => (
    <View style={styles.legendContainer}>
      <Text style={styles.legendTitle}>Legenda</Text>
      
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, styles.completedLegend]} />
        <Text style={styles.legendText}>Dia Completo</Text>
      </View>
      
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, styles.currentLegend]} />
        <Text style={styles.legendText}>Dia Atual</Text>
      </View>
      
      <View style={styles.legendItem}>
        <View style={[styles.legendDot, styles.intensiveLegend]} />
        <Text style={styles.legendText}>Dia do Intensivo</Text>
      </View>
    </View>
  );

  const renderStats = () => (
    <View style={styles.statsCard}>
      <Text style={styles.statsTitle}>Progresso do Intensivo</Text>
      
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Ionicons name="checkmark-circle" size={24} color="#10B981" />
          <Text style={styles.statNumber}>{intensiveData.completedDays}</Text>
          <Text style={styles.statLabel}>Completos</Text>
        </View>
        
        <View style={styles.statItem}>
          <Ionicons name="calendar" size={24} color="#A259F7" />
          <Text style={styles.statNumber}>{intensiveData.currentDay}</Text>
          <Text style={styles.statLabel}>Dia Atual</Text>
        </View>
        
        <View style={styles.statItem}>
          <Ionicons name="flag" size={24} color="#FFC107" />
          <Text style={styles.statNumber}>{intensiveData.totalDays}</Text>
          <Text style={styles.statLabel}>Total</Text>
        </View>
      </View>
      
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <LinearGradient
            colors={["#10B981", "#34D399"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.progressFill,
              { width: `${(intensiveData.completedDays / intensiveData.totalDays) * 100}%` }
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          {Math.round((intensiveData.completedDays / intensiveData.totalDays) * 100)}% completo
        </Text>
      </View>
    </View>
  );

  return (
    <LinearGradient
      colors={["#A259F7", "#c85efd", "#be41fd"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.container}
    >
      <StatusBar barStyle="light-content" backgroundColor="#A259F7" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity 
        style={styles.backButton}
        onPress={() => {
          router.push("/(tabs)/intensiveMood");
        }}
        >
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        
        <View style={styles.headerContent}>
          <Image
            source={require("../../assets/images/icon.png")}
            style={styles.imageLogo}
          />
          <Text style={styles.appTitle}>Calendário do Intensivo</Text>
          <Text style={styles.subtitle}>{intensiveData.subtitle}</Text>
        </View>
      </View>

      {/* Content */}
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {/* Calendar Header */}
        <View style={styles.calendarHeader}>
          <TouchableOpacity style={styles.monthNavButton}>
            <Ionicons name="chevron-back" size={20} color="#A259F7" />
          </TouchableOpacity>
          
          <Text style={styles.monthTitle}>
            {currentMonth} {currentYear}
          </Text>
          
          <TouchableOpacity style={styles.monthNavButton}>
            <Ionicons name="chevron-forward" size={20} color="#A259F7" />
          </TouchableOpacity>
        </View>

        {/* Week Days Header */}
        <View style={styles.weekDaysContainer}>
          {weekDays.map((day, index) => (
            <Text key={index} style={styles.weekDayText}>
              {day}
            </Text>
          ))}
        </View>

        {/* Calendar Grid */}
        <View style={styles.calendarGrid}>
          {calendarData.map((item, index) => renderCalendarDay(item, index))}
        </View>

        {/* Legend */}
        {renderLegend()}

        {/* Stats */}
        {renderStats()}

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.primaryButton}>
            <Ionicons name="play" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
            <Text style={styles.primaryButtonText}>Continuar Intensivo</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton}>
            <Ionicons name="list" size={20} color="#A259F7" style={{ marginRight: 8 }} />
            <Text style={styles.secondaryButtonText}>Ver Desafios</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center", // centraliza todo o conteúdo
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // centraliza verticalmente também
  },
  imageLogo: {
    width: 60,
    height: 60,
    marginBottom: 8,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 14,
    color: "#EEE",
    textAlign: "center",
    marginTop: 4,
  },
  contentContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  monthNavButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#374151",
  },
  weekDaysContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  weekDayText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#6B7280",
    textAlign: "center",
    width: 40,
  },
  calendarGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center", // centraliza colunas
    marginBottom: 24,
  },
  emptyDay: {
    width: 40,
    height: 40,
    margin: 2,
  },
  calendarDay: {
    width: 40,
    height: 40,
    margin: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    position: "relative",
  },
  dayContent: {
    alignItems: "center",
    justifyContent: "center",
  },
  dayText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#374151",
  },
  completedDay: {
    backgroundColor: "#10B981",
  },
  completedDayText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  currentDay: {
    backgroundColor: "#A259F7",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#A259F7",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  currentDayText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
  intensiveDay: {
    backgroundColor: "#EDE9FE",
    borderWidth: 1,
    borderColor: "#A259F7",
  },
  intensiveDayText: {
    color: "#A259F7",
    fontWeight: "600",
  },
  todayDay: {
    width: 40,
    height: 40,
    margin: 2,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FEF3C7",
    position: "relative",
    borderWidth: 1,
    borderColor: "#FFC107",
  },
  todayText: {
    fontSize: 14,
    color: "#92400E",
    fontWeight: "600",
  },
  intensiveDot: {
    position: "absolute",
    bottom: 2,
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: "#A259F7",
  },
  legendContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 12,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  legendDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 12,
  },
  completedLegend: {
    backgroundColor: "#10B981",
  },
  currentLegend: {
    backgroundColor: "#A259F7",
  },
  intensiveLegend: {
    backgroundColor: "#EDE9FE",
    borderWidth: 1,
    borderColor: "#A259F7",
  },
  legendText: {
    fontSize: 14,
    color: "#6B7280",
  },
  statsCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 3,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 16,
    textAlign: "center",
  },
  statsRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#374151",
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  progressContainer: {
    width: "100%",
  },
  progressBar: {
    width: "100%",
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 4,
  },
  progressFill: {
    height: "100%",
    borderRadius: 4,
  },
  progressText: {
    textAlign: "center",
    color: "#6B7280",
    marginTop: 8,
    fontSize: 14,
  },
  actionButtons: {
    gap: 12,
    alignItems: "center", // centraliza botões
  },
  primaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A259F7",
    paddingVertical: 16,
    borderRadius: 16,
    width: "100%",
    maxWidth: 300, // largura máxima opcional
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
  secondaryButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#A259F7",
    width: "100%",
    maxWidth: 300,
  },
  secondaryButtonText: {
    color: "#A259F7",
    fontSize: 16,
    fontWeight: "600",
  },
});