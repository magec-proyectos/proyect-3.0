
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  FileText, 
  Search, 
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  Calendar,
  User,
  Globe,
  Lock
} from 'lucide-react';

const ContentManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock content data
  const posts = [
    {
      id: '1',
      title: 'Getting Started with Sports Betting',
      author: 'Admin',
      status: 'published',
      type: 'article',
      views: 1234,
      createdAt: '2024-01-15T10:30:00Z',
      updatedAt: '2024-01-15T11:30:00Z'
    },
    {
      id: '2',
      title: 'NFL Week 1 Predictions',
      author: 'Sports Analyst',
      status: 'draft',
      type: 'prediction',
      views: 0,
      createdAt: '2024-01-14T15:45:00Z',
      updatedAt: '2024-01-14T16:45:00Z'
    },
    {
      id: '3',
      title: 'Basketball Analytics Deep Dive',
      author: 'Data Expert',
      status: 'published',
      type: 'analysis',
      views: 856,
      createdAt: '2024-01-13T09:15:00Z',
      updatedAt: '2024-01-13T10:15:00Z'
    }
  ];

  const pages = [
    {
      id: '1',
      title: 'About Us',
      slug: '/about',
      status: 'published',
      lastModified: '2024-01-10T10:00:00Z'
    },
    {
      id: '2',
      title: 'Terms of Service',
      slug: '/terms',
      status: 'published',
      lastModified: '2024-01-05T14:30:00Z'
    },
    {
      id: '3',
      title: 'Privacy Policy',
      slug: '/privacy',
      status: 'draft',
      lastModified: '2024-01-15T09:00:00Z'
    }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      published: 'bg-green-500/20 text-green-400',
      draft: 'bg-yellow-500/20 text-yellow-400',
      archived: 'bg-gray-500/20 text-gray-400'
    };
    return variants[status as keyof typeof variants] || variants.draft;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      article: FileText,
      prediction: Eye,
      analysis: Calendar
    };
    const Icon = icons[type as keyof typeof icons] || FileText;
    return <Icon size={16} />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">Content Management</h2>
          <p className="text-gray-400">Manage posts, pages, and media content</p>
        </div>
        <Button className="bg-gradient-to-r from-soft-blue to-soft-cyan text-white">
          <Plus size={16} className="mr-2" />
          Create Content
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Posts</p>
                <p className="text-xl font-bold text-white">156</p>
              </div>
              <FileText className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Published</p>
                <p className="text-xl font-bold text-white">134</p>
              </div>
              <Globe className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Drafts</p>
                <p className="text-xl font-bold text-white">22</p>
              </div>
              <Lock className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-dark-card border-dark-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">Total Views</p>
                <p className="text-xl font-bold text-white">45.2K</p>
              </div>
              <Eye className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="posts" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 bg-dark-card">
          <TabsTrigger value="posts">Posts</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
        </TabsList>

        <TabsContent value="posts">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white">Blog Posts & Articles</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-dark-lighter border-dark-border text-white"
                  />
                </div>
                <Button variant="outline" className="border-dark-border text-gray-400 hover:text-white">
                  <Filter size={16} className="mr-2" />
                  Filter
                </Button>
              </div>

              <div className="space-y-4">
                {posts.map((post) => (
                  <div key={post.id} className="flex items-center justify-between p-4 bg-dark-lighter rounded-lg border border-dark-border">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-blue-500/20 rounded-lg">
                        {getTypeIcon(post.type)}
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{post.title}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-gray-400 text-sm flex items-center gap-1">
                            <User size={12} />
                            {post.author}
                          </span>
                          <span className="text-gray-400 text-sm flex items-center gap-1">
                            <Calendar size={12} />
                            {formatDate(post.createdAt)}
                          </span>
                          <span className="text-gray-400 text-sm flex items-center gap-1">
                            <Eye size={12} />
                            {post.views} views
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusBadge(post.status)}>
                        {post.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Edit size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-red-400">
                          <Trash2 size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pages">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white">Static Pages</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pages.map((page) => (
                  <div key={page.id} className="flex items-center justify-between p-4 bg-dark-lighter rounded-lg border border-dark-border">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-purple-500/20 rounded-lg">
                        <FileText size={16} />
                      </div>
                      <div>
                        <h3 className="text-white font-medium">{page.title}</h3>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-gray-400 text-sm">{page.slug}</span>
                          <span className="text-gray-400 text-sm flex items-center gap-1">
                            <Calendar size={12} />
                            Modified {formatDate(page.lastModified)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className={getStatusBadge(page.status)}>
                        {page.status}
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Eye size={16} />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
                          <Edit size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="media">
          <Card className="bg-dark-card border-dark-border">
            <CardHeader>
              <CardTitle className="text-white">Media Library</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Media management coming soon</p>
                <p className="text-gray-500 text-sm">Upload and manage images, videos, and documents</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ContentManagement;
