import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { LiquidGlassTabBar } from '../components/LiquidGlassTabBar';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { ArticleDetailScreen } from '../screens/ArticleDetailScreen';
import { GuidesScreen } from '../screens/GuidesScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProgramsScreen } from '../screens/ProgramsScreen';
import { SavedArticlesScreen } from '../screens/SavedArticlesScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { useTheme } from '../theme/ThemeContext';
import type { GuidesStackParamList, SettingsStackParamList } from './types';

const Tab = createBottomTabNavigator();
const GuidesStack = createNativeStackNavigator<GuidesStackParamList>();
const SettingsStack = createNativeStackNavigator<SettingsStackParamList>();

function GuidesNavigator() {
  return (
    <GuidesStack.Navigator screenOptions={{ headerShown: false }}>
      <GuidesStack.Screen name="GuidesList" component={GuidesScreen} />
      <GuidesStack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
    </GuidesStack.Navigator>
  );
}

function SettingsNavigator() {
  return (
    <SettingsStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingsStack.Screen name="SettingsHome" component={SettingsScreen} />
      <SettingsStack.Screen name="SavedArticles" component={SavedArticlesScreen} />
    </SettingsStack.Navigator>
  );
}

type IconName = keyof typeof Ionicons.glyphMap;

const ICONS: Record<string, { active: IconName; inactive: IconName }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Programs: { active: 'compass', inactive: 'compass-outline' },
  Guides: { active: 'book', inactive: 'book-outline' },
  Settings: { active: 'settings', inactive: 'settings-outline' },
};

export function RootNavigator() {
  const { t } = useLang();
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      tabBar={(props) => <LiquidGlassTabBar {...props} />}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarIcon: ({ focused, color, size }) => {
          const pair = ICONS[route.name] ?? ICONS.Home;
          return (
            <Ionicons
              name={focused ? pair.active : pair.inactive}
              size={size - 2}
              color={color}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: t(ui.tabHome) }} />
      <Tab.Screen
        name="Programs"
        component={ProgramsScreen}
        options={{ tabBarLabel: t(ui.tabPrograms) }}
      />
      <Tab.Screen
        name="Guides"
        component={GuidesNavigator}
        options={{ tabBarLabel: t(ui.tabArticles) }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsNavigator}
        options={{ tabBarLabel: t(ui.tabSettings) }}
      />
    </Tab.Navigator>
  );
}
