
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Upload, X, Hash } from 'lucide-react';

interface CreatePostFormProps {
  onCreatePost: (content: string) => void;
  onCancel: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onCreatePost, onCancel }) => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      // Add any tags to the content
      let finalContent = content;
      tags.forEach(tag => {
        if (!finalContent.includes(`#${tag}`)) {
          finalContent = `${finalContent} #${tag}`;
        }
      });
      
      onCreatePost(finalContent.trim());
      setContent('');
      setTags([]);
      setCurrentTag('');
    }
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <Card className="bg-dark-card border-dark-border mb-6 animate-scale-in">
      <CardHeader>
        <CardTitle className="text-xl">Create a Post</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea 
            placeholder="Share your bet prediction..." 
            className="bg-dark-lighter border-dark-border resize-none min-h-[120px] focus:border-neon-blue"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          
          {tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag, index) => (
                <Badge key={index} variant="secondary" className="bg-dark-lighter flex items-center gap-1">
                  #{tag}
                  <X 
                    size={14} 
                    className="cursor-pointer hover:text-red-500" 
                    onClick={() => removeTag(tag)} 
                  />
                </Badge>
              ))}
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <div className="flex-1 flex gap-2 items-center bg-dark-lighter rounded-md border border-dark-border px-2">
              <Hash size={16} className="text-gray-400" />
              <input
                type="text"
                placeholder="Add tag..."
                className="flex-1 bg-transparent border-none py-2 text-sm focus:outline-none"
                value={currentTag}
                onChange={(e) => setCurrentTag(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddTag();
                  }
                }}
              />
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-7 w-7 p-0" 
                onClick={handleAddTag}
              >
                +
              </Button>
            </div>
            <Button variant="outline" size="icon" className="shrink-0">
              <Upload size={16} />
            </Button>
          </div>
          
          <div className="pt-2 border-t border-dark-border">
            <h3 className="text-sm font-medium mb-2">Attach a bet:</h3>
            <div className="bg-dark-lighter p-3 rounded-md hover:border-neon-blue/30 border border-dark-border transition-all cursor-pointer">
              <p className="text-sm text-gray-400">Selected bet:</p>
              <p className="font-medium">Liverpool vs Manchester United - Home Win</p>
              <div className="flex justify-between mt-2">
                <span className="text-sm">@2.50</span>
                <span className="text-sm">$25 stake</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>Cancel</Button>
        <Button 
          className="bg-neon-lime text-black hover:bg-neon-lime/90"
          onClick={handleSubmit}
        >
          Post
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CreatePostForm;
