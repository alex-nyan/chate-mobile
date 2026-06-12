import type { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type GuidesStackParamList = {
  GuidesList: undefined;
  ArticleDetail: { articleId: string };
};

/** The bottom-tab routes — used for deep-link/web-URL typing. */
export type RootTabParamList = {
  Home: undefined;
  Programs: undefined;
  Guides: NavigatorScreenParams<GuidesStackParamList>;
  Connect: undefined;
};

export type GuidesListProps = NativeStackScreenProps<GuidesStackParamList, 'GuidesList'>;
export type ArticleDetailProps = NativeStackScreenProps<GuidesStackParamList, 'ArticleDetail'>;
