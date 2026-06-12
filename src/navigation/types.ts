import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type GuidesStackParamList = {
  GuidesList: undefined;
  ArticleDetail: { articleId: string };
};

export type GuidesListProps = NativeStackScreenProps<GuidesStackParamList, 'GuidesList'>;
export type ArticleDetailProps = NativeStackScreenProps<GuidesStackParamList, 'ArticleDetail'>;
