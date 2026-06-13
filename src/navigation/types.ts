import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type GuidesStackParamList = {
  GuidesList: undefined;
  ArticleDetail: { articleId: string };
};

export type SettingsStackParamList = {
  SettingsHome: undefined;
  SavedArticles: undefined;
};

/** The bottom-tab routes — used for deep-link/web-URL typing. */
export type RootTabParamList = {
  Home: undefined;
  Programs: undefined;
  Guides: NavigatorScreenParams<GuidesStackParamList>;
  Settings: NavigatorScreenParams<SettingsStackParamList>;
};

export type GuidesListProps = NativeStackScreenProps<GuidesStackParamList, 'GuidesList'>;
export type ArticleDetailProps = NativeStackScreenProps<GuidesStackParamList, 'ArticleDetail'>;
export type SettingsHomeProps = NativeStackScreenProps<SettingsStackParamList, 'SettingsHome'>;
export type SavedArticlesProps = NativeStackScreenProps<SettingsStackParamList, 'SavedArticles'>;
