import { supabase } from '@/integrations/supabase/client';

export interface PushNotificationPayload {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  data?: any;
  actions?: NotificationAction[];
}

class PushNotificationService {
  private registration: ServiceWorkerRegistration | null = null;
  private vapidKey = 'BDd6sXQaQXpKVm7MAiLwVHKw-HwLqQtg8Qh_Mq_OmN0-jIVBEsn9K8K1nKvGiX4N8mF3P2Lm9cVEW4kVg_7VxjQ'; // Replace with your VAPID key

  async initialize(): Promise<boolean> {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      console.warn('Push notifications not supported');
      return false;
    }

    try {
      // Register service worker
      this.registration = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', this.registration);
      return true;
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      return false;
    }
  }

  async requestPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      return 'denied';
    }

    let permission = Notification.permission;
    
    if (permission === 'default') {
      permission = await Notification.requestPermission();
    }

    return permission;
  }

  async subscribe(): Promise<PushSubscription | null> {
    if (!this.registration) {
      console.error('Service Worker not registered');
      return null;
    }

    try {
      const subscription = await this.registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(this.vapidKey)
      });

      // Save subscription to Supabase
      await this.saveSubscription(subscription);
      
      return subscription;
    } catch (error) {
      console.error('Push subscription failed:', error);
      return null;
    }
  }

  async unsubscribe(): Promise<boolean> {
    if (!this.registration) {
      return false;
    }

    try {
      const subscription = await this.registration.pushManager.getSubscription();
      if (subscription) {
        await subscription.unsubscribe();
        await this.removeSubscription(subscription);
      }
      return true;
    } catch (error) {
      console.error('Unsubscribe failed:', error);
      return false;
    }
  }

  async sendLocalNotification(payload: PushNotificationPayload): Promise<void> {
    const permission = await this.requestPermission();
    
    if (permission === 'granted') {
      new Notification(payload.title, {
        body: payload.body,
        icon: payload.icon || '/favicon.ico',
        badge: payload.badge || '/favicon.ico',
        data: payload.data,
        actions: payload.actions,
        requireInteraction: true,
        tag: payload.data?.type || 'general'
      });
    }
  }

  private async saveSubscription(subscription: PushSubscription): Promise<void> {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    const subscriptionData = {
      user_id: user.id,
      endpoint: subscription.endpoint,
      p256dh: subscription.getKey('p256dh') ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('p256dh')!))) : null,
      auth: subscription.getKey('auth') ? btoa(String.fromCharCode(...new Uint8Array(subscription.getKey('auth')!))) : null
    };

    await supabase
      .from('push_subscriptions')
      .upsert(subscriptionData, { onConflict: 'user_id' });
  }

  private async removeSubscription(subscription: PushSubscription): Promise<void> {
    const user = (await supabase.auth.getUser()).data.user;
    if (!user) return;

    await supabase
      .from('push_subscriptions')
      .delete()
      .eq('user_id', user.id);
  }

  private urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }
}

export const pushNotificationService = new PushNotificationService();