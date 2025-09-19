import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DollarSign, Gift } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';

interface TipButtonProps {
  recipientUserId: string;
  recipientName: string;
  postId?: string;
  variant?: 'default' | 'ghost' | 'outline';
  size?: 'sm' | 'default' | 'lg';
  className?: string;
}

const TipButton: React.FC<TipButtonProps> = ({
  recipientUserId,
  recipientName,
  postId,
  variant = 'ghost',
  size = 'sm',
  className = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSendTip = async () => {
    if (!user) {
      toast({
        title: "Authentication Required",
        description: "Please log in to send tips",
        variant: "destructive"
      });
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid tip amount",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.rpc('send_tip', {
        recipient_user_id: recipientUserId,
        tip_amount: parseFloat(amount),
        tip_message: message || null,
        related_post_id: postId || null
      });

      if (error) {
        throw error;
      }

      const result = data as { success: boolean; error?: string; message?: string };
      
      if (result?.success) {
        toast({
          title: "Tip Sent!",
          description: `Successfully sent $${amount} to ${recipientName}`,
        });
        setIsOpen(false);
        setAmount('');
        setMessage('');
      } else {
        toast({
          title: "Tip Failed",
          description: result?.error || "Failed to send tip",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error sending tip:', error);
      toast({
        title: "Error",
        description: "Failed to send tip. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const quickAmounts = [1, 5, 10, 25];

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant={variant} 
          size={size} 
          className={`flex items-center gap-1.5 hover:text-primary transition-all ${className}`}
        >
          <DollarSign size={18} />
          Tip
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Gift className="text-primary" size={20} />
            Send Tip to {recipientName}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">Amount ($)</label>
            <div className="space-y-2">
              <Input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0.01"
                step="0.01"
                className="bg-background"
              />
              <div className="flex gap-2">
                {quickAmounts.map((quickAmount) => (
                  <Button
                    key={quickAmount}
                    variant="outline"
                    size="sm"
                    onClick={() => setAmount(quickAmount.toString())}
                    className="flex-1"
                  >
                    ${quickAmount}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Message (Optional)</label>
            <Textarea
              placeholder="Add a message with your tip..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-background resize-none"
              rows={3}
            />
          </div>

          <div className="flex gap-2 pt-2">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendTip}
              disabled={loading || !amount}
              className="flex-1"
            >
              {loading ? "Sending..." : `Send $${amount || "0"}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TipButton;