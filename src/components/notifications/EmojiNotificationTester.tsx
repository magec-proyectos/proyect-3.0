import { useEffect } from 'react';
import { useNotifications } from '@/contexts/NotificationContext';

export const EmojiNotificationTester = () => {
  const { addNotification } = useNotifications();

  useEffect(() => {
    // Add sample emoji notifications for testing
    const sampleNotifications = [
      {
        title: '🏆 ¡Nueva victoria!',
        message: '¡Felicidades! Tu predicción fue correcta 🎉⚽',
        type: 'success' as const
      },
      {
        title: '💰 Ganancia disponible',
        message: 'Tienes $150 disponibles para retirar 💳✨',
        type: 'info' as const
      },
      {
        title: '🔥 Racha activa',
        message: '¡5 predicciones correctas seguidas! 🚀🎯',
        type: 'success' as const
      }
    ];

    // Add notifications with a delay to see them appear
    sampleNotifications.forEach((notification, index) => {
      setTimeout(() => {
        addNotification(notification);
      }, (index + 1) * 1000);
    });
  }, [addNotification]);

  return null; // This component doesn't render anything
};

export default EmojiNotificationTester;