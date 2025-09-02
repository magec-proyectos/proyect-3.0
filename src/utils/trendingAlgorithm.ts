import { Post } from '@/components/social/PostItem';

export interface TrendingScore {
  score: number;
  breakdown: {
    engagementScore: number;
    timeScore: number;
    velocityScore: number;
    qualityScore: number;
  };
}

export interface TrendingPost extends Post {
  trendingScore: TrendingScore;
  isHot: boolean;
  isFresh: boolean;
  isViral: boolean;
}

// Configuration for trending algorithm
const TRENDING_CONFIG = {
  // Time decay parameters
  TIME_DECAY_HOURS: 24,
  FRESH_THRESHOLD_HOURS: 2,
  HOT_THRESHOLD_HOURS: 6,
  
  // Engagement weights
  LIKE_WEIGHT: 1,
  COMMENT_WEIGHT: 3,
  SHARE_WEIGHT: 5,
  
  // Quality thresholds
  MIN_ENGAGEMENT_FOR_VIRAL: 50,
  VIRAL_MULTIPLIER: 1.5,
  
  // Score weights
  ENGAGEMENT_WEIGHT: 0.4,
  TIME_WEIGHT: 0.3,
  VELOCITY_WEIGHT: 0.2,
  QUALITY_WEIGHT: 0.1
};

/**
 * Parse timestamp to hours ago
 */
function parseTimestamp(timestamp: string): number {
  if (timestamp === 'Just now' || timestamp === 'Ahora') return 0;
  
  const match = timestamp.match(/(\d+)([hmd])/);
  if (!match) return 24; // Default to 24 hours if can't parse
  
  const value = parseInt(match[1]);
  const unit = match[2];
  
  switch (unit) {
    case 'm': return value / 60; // minutes to hours
    case 'h': return value;
    case 'd': return value * 24;
    default: return 24;
  }
}

/**
 * Calculate time decay score (fresher posts get higher scores)
 */
function calculateTimeScore(hoursAgo: number): number {
  const decay = Math.exp(-hoursAgo / TRENDING_CONFIG.TIME_DECAY_HOURS);
  return Math.max(0, decay);
}

/**
 * Calculate engagement score based on likes, comments, and shares
 */
function calculateEngagementScore(post: Post): number {
  const { likes, comments, shares } = post;
  
  const engagementPoints = 
    (likes * TRENDING_CONFIG.LIKE_WEIGHT) +
    (comments * TRENDING_CONFIG.COMMENT_WEIGHT) +
    (shares * TRENDING_CONFIG.SHARE_WEIGHT);
  
  // Normalize using logarithmic scale to prevent runaway scores
  return Math.log(engagementPoints + 1) / 10;
}

/**
 * Calculate velocity score (engagement rate over time)
 */
function calculateVelocityScore(post: Post, hoursAgo: number): number {
  const totalEngagement = post.likes + post.comments + post.shares;
  
  if (hoursAgo === 0) hoursAgo = 0.1; // Prevent division by zero
  
  const velocity = totalEngagement / Math.max(hoursAgo, 0.1);
  
  // Normalize velocity score
  return Math.min(velocity / 10, 1);
}

/**
 * Calculate quality score based on post characteristics
 */
function calculateQualityScore(post: Post): number {
  let qualityScore = 0.5; // Base score
  
  // Bonus for higher odds (riskier predictions)
  if (post.bet.odds > 3) qualityScore += 0.2;
  if (post.bet.odds > 5) qualityScore += 0.1;
  
  // Bonus for longer content
  if (post.content.length > 100) qualityScore += 0.1;
  if (post.content.length > 200) qualityScore += 0.1;
  
  // Bonus for balanced engagement (not just likes)
  const engagementRatio = post.comments / Math.max(post.likes, 1);
  if (engagementRatio > 0.1) qualityScore += 0.1;
  
  return Math.min(qualityScore, 1);
}

/**
 * Calculate overall trending score for a post
 */
export function calculateTrendingScore(post: Post): TrendingScore {
  const hoursAgo = parseTimestamp(post.timestamp);
  
  const engagementScore = calculateEngagementScore(post);
  const timeScore = calculateTimeScore(hoursAgo);
  const velocityScore = calculateVelocityScore(post, hoursAgo);
  const qualityScore = calculateQualityScore(post);
  
  // Calculate weighted overall score
  const score = 
    (engagementScore * TRENDING_CONFIG.ENGAGEMENT_WEIGHT) +
    (timeScore * TRENDING_CONFIG.TIME_WEIGHT) +
    (velocityScore * TRENDING_CONFIG.VELOCITY_WEIGHT) +
    (qualityScore * TRENDING_CONFIG.QUALITY_WEIGHT);
  
  return {
    score,
    breakdown: {
      engagementScore,
      timeScore,
      velocityScore,
      qualityScore
    }
  };
}

/**
 * Add trending metadata to posts
 */
export function calculateTrendingPosts(posts: Post[]): TrendingPost[] {
  return posts.map(post => {
    const hoursAgo = parseTimestamp(post.timestamp);
    const trendingScore = calculateTrendingScore(post);
    const totalEngagement = post.likes + post.comments + post.shares;
    
    return {
      ...post,
      trendingScore,
      isHot: hoursAgo <= TRENDING_CONFIG.HOT_THRESHOLD_HOURS && trendingScore.score > 0.3,
      isFresh: hoursAgo <= TRENDING_CONFIG.FRESH_THRESHOLD_HOURS,
      isViral: totalEngagement >= TRENDING_CONFIG.MIN_ENGAGEMENT_FOR_VIRAL && trendingScore.score > 0.5
    };
  });
}

/**
 * Sort posts by trending score
 */
export function sortPostsByTrending(posts: Post[]): TrendingPost[] {
  const trendingPosts = calculateTrendingPosts(posts);
  
  return trendingPosts.sort((a, b) => {
    // Viral posts get priority
    if (a.isViral && !b.isViral) return -1;
    if (!a.isViral && b.isViral) return 1;
    
    // Then sort by trending score
    return b.trendingScore.score - a.trendingScore.score;
  });
}

/**
 * Get trending posts for carousel (top performing)
 */
export function getTrendingCarouselPosts(posts: Post[], limit = 5): TrendingPost[] {
  return sortPostsByTrending(posts)
    .filter(post => post.trendingScore.score > 0.2) // Minimum threshold
    .slice(0, limit);
}

/**
 * Filter posts by trending criteria
 */
export function filterTrendingPosts(posts: Post[], criteria: 'hot' | 'fresh' | 'viral' | 'all' = 'all'): TrendingPost[] {
  const trendingPosts = calculateTrendingPosts(posts);
  
  switch (criteria) {
    case 'hot':
      return trendingPosts.filter(post => post.isHot);
    case 'fresh':
      return trendingPosts.filter(post => post.isFresh);
    case 'viral':
      return trendingPosts.filter(post => post.isViral);
    default:
      return sortPostsByTrending(posts);
  }
}