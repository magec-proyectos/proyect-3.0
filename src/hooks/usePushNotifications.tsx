import { useState, useEffect, useCallback } from 'react';
import { pushNotificationService, PushNotificationPayload } from '@/services/pushNotificationService';
import { useNotifications } from '@/contexts/NotificationContext';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export const usePushNotifications = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const { addNotification } = useNotifications();
  const { user } = useAuth();

  useEffect(() => {
    const initPushNotifications = async () => {
      const supported = await pushNotificationService.initialize();
      setIsSupported(supported);
      
      if (supported) {
        setPermission(Notification.permission);
        // Check if already subscribed
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          const subscription = await registration.pushManager.getSubscription();
          setIsSubscribed(!!subscription);
        }
      }
    };

    initPushNotifications();
  }, []);

  // Listen for new notifications in real-time
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('user-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'user_notifications',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          const notification = payload.new;
          
          // Add to local notifications
          addNotification({
            title: notification.title,
            message: notification.message,
            type: notification.type || 'info',
            link: notification.link
          });

          // Send push notification if subscribed
          if (isSubscribed && permission === 'granted') {
            pushNotificationService.sendLocalNotification({
              title: notification.title,
              body: notification.message,
              data: {
                type: notification.type,
                url: notification.link || '/',
                timestamp: new Date().toISOString()
              }
            });
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user, isSubscribed, permission, addNotification]);

  const requestPermission = useCallback(async () => {
    setIsLoading(true);
    try {
      const newPermission = await pushNotificationService.requestPermission();
      setPermission(newPermission);
      return newPermission;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const subscribe = useCallback(async () => {
    if (!isSupported || permission !== 'granted') {
      return false;
    }

    setIsLoading(true);
    try {
      const subscription = await pushNotificationService.subscribe();
      setIsSubscribed(!!subscription);
      return !!subscription;
    } finally {
      setIsLoading(false);
    }
  }, [isSupported, permission]);

  const unsubscribe = useCallback(async () => {
    setIsLoading(true);
    try {
      const success = await pushNotificationService.unsubscribe();
      if (success) {
        setIsSubscribed(false);
      }
      return success;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const sendTestNotification = useCallback(async () => {
    if (permission === 'granted') {
      await pushNotificationService.sendLocalNotification({
        title: '🎯 Test Notification',
        body: 'Push notifications are working perfectly!',
        data: {
          type: 'test',
          url: '/',
          timestamp: new Date().toISOString()
        }
      });
    }
  }, [permission]);

  // Helper functions for specific notification types
  const sendLikeNotification = useCallback(async (postAuthor: string, postTitle: string) => {
    if (permission === 'granted') {
      await pushNotificationService.sendLocalNotification({
        title: '❤️ New Like',
        body: `${postAuthor} liked your prediction: "${postTitle}"`,
        data: {
          type: 'like',
          url: '/social',
          timestamp: new Date().toISOString()
        }
      });
    }
  }, [permission]);

  const sendCommentNotification = useCallback(async (commenter: string, postTitle: string) => {
    if (permission === 'granted') {
      await pushNotificationService.sendLocalNotification({
        title: '💬 New Comment',
        body: `${commenter} commented on your prediction: "${postTitle}"`,
        data: {
          type: 'comment',
          url: '/social',
          timestamp: new Date().toISOString()
        }
      });
    }
  }, [permission]);

  const sendFollowNotification = useCallback(async (followerName: string) => {
    if (permission === 'granted') {
      await pushNotificationService.sendLocalNotification({
        title: '👥 New Follower',
        body: `${followerName} started following you!`,
        data: {
          type: 'follow',
          url: '/profile',
          timestamp: new Date().toISOString()
        }
      });
    }
  }, [permission]);

  return {
    isSupported,
    isSubscribed,
    isLoading,
    permission,
    requestPermission,
    subscribe,
    unsubscribe,
    sendTestNotification,
    sendLikeNotification,
    sendCommentNotification,
    sendFollowNotification
  };
};