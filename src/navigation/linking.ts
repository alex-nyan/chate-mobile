import type { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import type { RootTabParamList } from './types';

/**
 * Deep-link + web-URL config. Enables shareable links like
 * `chate://article/curriculum` (and the matching https://chatethehook.com path),
 * and gives the web build real URLs (/guides, /article/:id, …) so browser
 * back/forward and link-sharing work.
 */
export const linking: LinkingOptions<RootTabParamList> = {
  prefixes: [Linking.createURL('/'), 'https://chatethehook.com', 'https://www.chatethehook.com'],
  config: {
    screens: {
      Home: 'home',
      Programs: 'programs',
      Guides: {
        screens: {
          GuidesList: 'guides',
          ArticleDetail: 'article/:articleId',
          BlogPost: 'blog/:postId',
        },
      },
      Settings: {
        screens: {
          SettingsHome: 'settings',
          SavedArticles: 'settings/saved',
        },
      },
    },
  },
};
