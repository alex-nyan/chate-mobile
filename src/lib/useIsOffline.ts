import NetInfo from '@react-native-community/netinfo';
import { useEffect, useState } from 'react';

/**
 * True when the device has no network connection. Works on native and on web
 * (NetInfo maps onto `navigator.onLine`). Unknown/initial state is treated as
 * online to avoid false "offline" alarms on first paint.
 */
export function useIsOffline(): boolean {
  const [offline, setOffline] = useState(false);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      // isConnected is `null` until the first probe — only flag offline once
      // we've actually observed a disconnected state.
      setOffline(state.isConnected === false);
    });
    return () => unsubscribe();
  }, []);

  return offline;
}
