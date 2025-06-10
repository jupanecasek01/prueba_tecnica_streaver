'use client';
import { SWRConfig } from 'swr';
import React, { useState, useEffect } from 'react';

const SlowConnectionNotification = () => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
    <div className="bg-yellow-500 text-white px-6 py-3 rounded shadow-lg animate-pulse text-lg">
      The connection is taking longer than expected...
    </div>
  </div>
);


export function SWRProvider({ children }: { children: React.ReactNode }) {
  const [isSlow, setIsSlow] = useState(false);

  const onOnline = () => {
    window.dispatchEvent(new Event('online'));
  };

  useEffect(() => {
    window.addEventListener('online', onOnline);
    return () => window.removeEventListener('online', onOnline);
  }, []);

  const swrConfig = {
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    shouldRetryOnError: true,
    errorRetryCount: 3,
    dedupingInterval: 2000,
    loadingTimeout: 3000,
    provider: () => new Map(),
    onSuccess: (data: any, key: string) => {
      setIsSlow(false);
      console.log('SWR Success:', key);
    },
    onError: (err: any, key: string) => {
      console.error('SWR Error:', key, err);
    },
    onLoadingSlow: () => {
      setIsSlow(true);
    },
  };

  return (
    <SWRConfig value={swrConfig}>
      {isSlow && <SlowConnectionNotification />}
      {children}
    </SWRConfig>
  );
}