'use client';
import { useEffect } from 'react';

export default function PurchaseEvent() {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'purchase', {
        currency: 'USD',
        transaction_id: `trial_${Date.now()}`,
      });
    }
  }, []);
  return null;
}
