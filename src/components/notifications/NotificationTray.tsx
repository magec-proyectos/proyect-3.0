
import React, { useState } from 'react';
import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useNotifications, Notification } from '@/contexts/NotificationContext';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { format } from 'date-fns';

const NotificationItem: React.FC<{
  notification: Notification;
  onMarkAsRead: () => void;
  onClear: () => void;
}> = ({ notification, onMarkAsRead, onClear }) => {
  const handleClick = () => {
    if (!notification.read) {
      onMarkAsRead();
    }
    if (notification.link) {
      window.location.href = notification.link;
    }
  };

  return (
    <div 
      className={`p-3 border-b border-dark-border last:border-b-0 cursor-pointer ${
        notification.read ? 'bg-dark-card' : 'bg-dark-card/60'
      }`}
      onClick={handleClick}
    >
      <div className="flex justify-between items-start">
        <h4 className="font-medium text-sm flex items-center gap-2">
          {!notification.read && (
            <span className="w-2 h-2 rounded-full bg-neon-blue"></span>
          )}
          {notification.title}
        </h4>
        <button 
          className="text-gray-500 hover:text-white text-xs"
          onClick={(e) => {
            e.stopPropagation();
            onClear();
          }}
        >
          &times;
        </button>
      </div>
      <p className="text-gray-400 text-xs mt-1">{notification.message}</p>
      <div className="flex justify-between items-center mt-2">
        <span className="text-gray-500 text-xs">
          {format(notification.timestamp, 'MMM d, h:mm a')}
        </span>
        {notification.type === 'success' && (
          <span className="text-xs px-1.5 py-0.5 rounded bg-green-900/30 text-green-400">
            Success
          </span>
        )}
        {notification.type === 'info' && (
          <span className="text-xs px-1.5 py-0.5 rounded bg-blue-900/30 text-blue-400">
            Info
          </span>
        )}
        {notification.type === 'warning' && (
          <span className="text-xs px-1.5 py-0.5 rounded bg-yellow-900/30 text-yellow-400">
            Warning
          </span>
        )}
        {notification.type === 'error' && (
          <span className="text-xs px-1.5 py-0.5 rounded bg-red-900/30 text-red-400">
            Error
          </span>
        )}
      </div>
    </div>
  );
};

const NotificationTray = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { 
    notifications, 
    unreadCount, 
    markAsRead, 
    markAllAsRead, 
    clearNotification, 
    clearAllNotifications 
  } = useNotifications();

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
  };

  return (
    <Popover open={isOpen} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon" 
          className="relative"
          aria-label="Open notifications"
        >
          <Bell size={20} />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-4 h-4 text-xs font-bold flex items-center justify-center bg-neon-blue text-black rounded-full">
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 bg-dark-card border-dark-border"
        align="end"
      >
        <div className="flex justify-between items-center p-3 border-b border-dark-border">
          <h3 className="font-medium">Notifications</h3>
          {notifications.length > 0 && (
            <div className="flex gap-2">
              <button 
                className="text-xs text-gray-400 hover:text-white"
                onClick={markAllAsRead}
              >
                Mark all as read
              </button>
              <button 
                className="text-xs text-gray-400 hover:text-white"
                onClick={clearAllNotifications}
              >
                Clear all
              </button>
            </div>
          )}
        </div>
        
        <ScrollArea className="h-[300px]">
          {notifications.length > 0 ? (
            notifications.map(notification => (
              <NotificationItem 
                key={notification.id} 
                notification={notification} 
                onMarkAsRead={() => markAsRead(notification.id)}
                onClear={() => clearNotification(notification.id)}
              />
            ))
          ) : (
            <div className="flex items-center justify-center h-[200px] text-gray-400">
              No notifications
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationTray;
