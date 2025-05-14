
import { Post } from '@/components/social/PostItem';

export const initialPosts: Post[] = [
  {
    id: 1,
    user: {
      name: 'Alex Thompson',
      avatar: 'https://placehold.co/40',
      username: 'alexbet'
    },
    content: "Just placed my bet on Liverpool to win 2-1! Who's with me? 🔥⚽️ #PremierLeague",
    bet: {
      match: 'Liverpool vs Manchester United',
      prediction: 'Liverpool Win (2-1)',
      odds: 3.25,
      amount: 50
    },
    likes: 245,
    comments: 32,
    shares: 18,
    timestamp: '2h ago'
  },
  {
    id: 2,
    user: {
      name: 'Sarah Wilson',
      avatar: 'https://placehold.co/40',
      username: 'sarahwins'
    },
    content: 'This AI prediction gives Arsenal a 70% chance to win against Chelsea! Putting $100 on it! 💰',
    bet: {
      match: 'Arsenal vs Chelsea',
      prediction: 'Arsenal Win & Over 2.5 Goals',
      odds: 2.80,
      amount: 100
    },
    likes: 189,
    comments: 41,
    shares: 14,
    timestamp: '5h ago'
  },
  {
    id: 3,
    user: {
      name: 'Mike Johnson',
      avatar: 'https://placehold.co/40',
      username: 'mikethebetter'
    },
    content: 'The algorithm is suggesting BTTS for the Manchester City game. Already up $500 this week following these predictions! 📈',
    bet: {
      match: 'Manchester City vs Tottenham',
      prediction: 'Both Teams To Score - Yes',
      odds: 1.75,
      amount: 200
    },
    likes: 312,
    comments: 57,
    shares: 29,
    timestamp: '1d ago'
  }
];
