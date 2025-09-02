import React, { useState } from 'react';
import { X, Camera, Type, Palette, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/sonner';

interface CreateStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStoryCreated?: () => void;
}

const predictionTypes = [
  { value: 'match_result', label: '🏆 Match Result' },
  { value: 'goals', label: '⚽ Goals' },
  { value: 'cards', label: '🟨 Cards' },
  { value: 'corners', label: '📐 Corners' },
  { value: 'btts', label: '🎯 Both Teams to Score' },
  { value: 'quick_tip', label: '💡 Quick Tip' }
];

const backgroundColors = [
  '#1a1b23', '#2563eb', '#dc2626', '#16a34a', 
  '#ca8a04', '#7c3aed', '#db2777', '#ea580c'
];

const CreateStoryModal: React.FC<CreateStoryModalProps> = ({ isOpen, onClose, onStoryCreated }) => {
  const { user } = useAuth();
  const [predictionType, setPredictionType] = useState('');
  const [content, setContent] = useState('');
  const [teams, setTeams] = useState('');
  const [prediction, setPrediction] = useState('');
  const [odds, setOdds] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#1a1b23');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !predictionType || !content) return;

    setIsSubmitting(true);
    try {
      const storyData = {
        user_id: user.id,
        prediction_type: predictionType,
        prediction_content: {
          content,
          teams: teams || null,
          prediction: prediction || null,
          odds: odds || null
        },
        background_color: backgroundColor,
        text_color: '#ffffff'
      };

      const { error } = await (supabase as any)
        .from('user_stories')
        .insert([storyData]);

      if (error) throw error;

      toast.success('Story created successfully!');
      onStoryCreated?.();
      onClose();
      
      // Reset form
      setContent('');
      setTeams('');
      setPrediction('');
      setOdds('');
      setPredictionType('');
    } catch (error) {
      console.error('Error creating story:', error);
      toast.error('Failed to create story');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div className="bg-card border-border rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="text-lg font-semibold">Create Story</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          {/* Prediction Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Prediction Type
            </label>
            <Select value={predictionType} onValueChange={setPredictionType}>
              <SelectTrigger>
                <SelectValue placeholder="Select prediction type" />
              </SelectTrigger>
              <SelectContent>
                {predictionTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Main Content */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Your Prediction
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Share your quick prediction..."
              className="min-h-[100px]"
              maxLength={300}
            />
            <div className="text-xs text-muted-foreground mt-1">
              {content.length}/300 characters
            </div>
          </div>

          {/* Teams (optional) */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Teams (optional)
            </label>
            <Input
              value={teams}
              onChange={(e) => setTeams(e.target.value)}
              placeholder="e.g., Real Madrid vs Barcelona"
            />
          </div>

          {/* Prediction Details (optional) */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Prediction Details (optional)
            </label>
            <Input
              value={prediction}
              onChange={(e) => setPrediction(e.target.value)}
              placeholder="e.g., Over 2.5 Goals"
            />
          </div>

          {/* Odds (optional) */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Odds (optional)
            </label>
            <Input
              value={odds}
              onChange={(e) => setOdds(e.target.value)}
              placeholder="e.g., 1.85"
            />
          </div>

          {/* Background Color */}
          <div>
            <label className="block text-sm font-medium mb-2">
              <Palette className="w-4 h-4 inline mr-1" />
              Background Color
            </label>
            <div className="flex gap-2 flex-wrap">
              {backgroundColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  className={`w-8 h-8 rounded-full border-2 ${
                    backgroundColor === color ? 'border-white' : 'border-gray-600'
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setBackgroundColor(color)}
                />
              ))}
            </div>
          </div>

          {/* Preview */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Preview
            </label>
            <div 
              className="aspect-[9/16] max-h-48 rounded-lg p-4 text-white flex flex-col justify-center items-center text-center relative overflow-hidden"
              style={{ backgroundColor }}
            >
              <div className="text-xs opacity-70 mb-2">
                {predictionTypes.find(t => t.value === predictionType)?.label || 'Select type'}
              </div>
              {teams && (
                <div className="text-sm font-bold mb-2">{teams}</div>
              )}
              <div className="text-sm mb-2">{content || 'Your prediction...'}</div>
              {prediction && (
                <div className="text-xs bg-white/20 px-2 py-1 rounded">{prediction}</div>
              )}
              {odds && (
                <div className="text-xs mt-2 opacity-80">Odds: {odds}</div>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            className="w-full" 
            disabled={!predictionType || !content || isSubmitting}
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Creating...' : 'Share Story'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateStoryModal;