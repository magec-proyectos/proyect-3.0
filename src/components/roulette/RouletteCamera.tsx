
import React, { useState, useRef } from 'react';
import { Camera, Image, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

interface RouletteCameraProps {
  onImageCaptured: (imageData: string) => void;
}

const RouletteCamera: React.FC<RouletteCameraProps> = ({ onImageCaptured }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setIsCapturing(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Error",
        description: "Could not access your camera. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCapturing(false);
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  };

  const confirmImage = () => {
    if (capturedImage) {
      onImageCaptured(capturedImage);
      setIsOpen(false);
      setCapturedImage(null);
    }
  };

  const retakePhoto = () => {
    setCapturedImage(null);
    startCamera();
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      setCapturedImage(null);
      startCamera();
    } else {
      stopCamera();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="bg-black/40 border-amber-500/30 text-amber-200 hover:bg-amber-800/30 transition-all flex gap-2 items-center"
          onClick={() => setIsOpen(true)}
        >
          <Camera size={18} />
          <span>Analyze Wheel</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gradient-to-b from-green-900 to-green-950 border-amber-500/50 text-white shadow-xl backdrop-blur-md max-w-md w-full">
        <div className="absolute inset-0 bg-[url('/felt-texture.png')] bg-repeat opacity-10 z-0 rounded-lg"></div>
        <DialogHeader className="relative z-10">
          <DialogTitle className="text-amber-100">
            {!capturedImage ? "Capture Roulette Wheel" : "Confirm Your Image"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative z-10 space-y-4">
          {!capturedImage ? (
            <>
              <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                {isCapturing ? (
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-amber-300/70">
                    <Camera size={48} className="mb-2 opacity-50" />
                    <p className="text-sm text-center mx-4">
                      Position your camera to capture the entire roulette wheel
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex justify-center">
                <Button
                  onClick={captureImage}
                  className="bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-medium border border-amber-400/20 shadow-lg"
                  disabled={!isCapturing}
                >
                  <Camera className="mr-2 h-4 w-4" />
                  Take Photo
                </Button>
              </div>
              
              <div className="mt-2 p-2 bg-black/30 rounded text-xs text-amber-200/80 flex items-start">
                <AlertCircle size={16} className="mr-2 flex-shrink-0 mt-0.5 text-amber-400" />
                <p>
                  For best results, ensure good lighting and capture the entire wheel. 
                  The photo will be analyzed to provide betting recommendations.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="relative aspect-video bg-black rounded-md overflow-hidden">
                <img 
                  src={capturedImage} 
                  alt="Captured roulette wheel" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex justify-between gap-3">
                <Button
                  onClick={retakePhoto}
                  variant="outline"
                  className="flex-1 bg-black/40 border-amber-500/30 text-amber-200 hover:bg-black/60"
                >
                  Retake Photo
                </Button>
                <Button
                  onClick={confirmImage}
                  className="flex-1 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white font-medium border border-amber-400/20 shadow-lg"
                >
                  <Image className="mr-2 h-4 w-4" />
                  Analyze Wheel
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RouletteCamera;
