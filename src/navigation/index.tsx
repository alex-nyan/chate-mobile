import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { useLang } from '../i18n/LanguageContext';
import { ui } from '../i18n/strings';
import { ArticleDetailScreen } from '../screens/ArticleDetailScreen';
import { ConnectScreen } from '../screens/ConnectScreen';
import { GuidesScreen } from '../screens/GuidesScreen';
import { HomeScreen } from '../screens/HomeScreen';
import { ProgramsScreen } from '../screens/ProgramsScreen';
import { colors } from '../theme/colors';
import type { GuidesStackParamList } from './types';

const Tab = createBottomTabNavigator();
const GuidesStack = createNativeStackNavigator<GuidesStackParamList>();

function GuidesNavigator() {
  return (
    <GuidesStack.Navigator screenOptions={{ headerShown: false }}>
      <GuidesStack.Screen name="GuidesList" component={GuidesScreen} />
      <GuidesStack.Screen name="ArticleDetail" component={ArticleDetailScreen} />
    </GuidesStack.Navigator>
  );
}

type IconName = keyof typeof Ionicons.glyphMap;

const ICONS: Record<string, { active: IconName; inactive: IconName }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Programs: { active: 'compass', inactive: 'compass-outline' },
  Guides: { active: 'book', inactive: 'book-outline' },
  Connect: { active: 'people', inactive: 'people-outline' },
};

export function RootNavigator() {
  const { t } = useLang();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          borderTopColor: colors.border,
          backgroundColor: colors.bg,
          height: 60,
          paddingBottom: 8,
          paddingTop: 6,
        },
        tabBarLabelStyle: { fontSize: 11.5, fontWeight: '600' },
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
        name="Connect"
        component={ConnectScreen}
        options={{ tabBarLabel: t(ui.tabConnect) }}
      />
    </Tab.Navigator>
  );
}
