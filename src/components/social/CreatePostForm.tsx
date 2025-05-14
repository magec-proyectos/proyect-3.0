
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface CreatePostFormProps {
  onCreatePost: (content: string) => void;
  onCancel: () => void;
}

const CreatePostForm: React.FC<CreatePostFormProps> = ({ onCreatePost, onCancel }) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim()) {
      onCreatePost(content);
      setContent('');
    }
  };

  return (
    <Card className="bg-dark-card border-dark-border mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Create a Post</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Textarea 
            placeholder="Share your bet prediction..." 
            className="bg-dark-lighter border-dark-border resize-none"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="pt-2 border-t border-dark-border">
            <h3 className="text-sm font-medium mb-2">Attach a bet:</h3>
            <div className="bg-dark-lighter p-3 rounded-md">
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
