import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { useAccessibility } from '@/contexts/AccessibilityContext';
import {
  Accessibility,
  Eye,
  Type,
  Focus,
  Volume2,
  RotateCcw,
  Minus,
  Plus,
  Contrast,
  Zap
} from 'lucide-react';
import { cn } from '@/lib/utils';

export const AccessibilityPanel = () => {
  const {
    settings,
    updateSetting,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    resetSettings,
  } = useAccessibility();

  const [isOpen, setIsOpen] = useState(false);

  const fontSizeLabels = {
    small: 'Pequeño',
    medium: 'Mediano',
    large: 'Grande',
    'extra-large': 'Extra Grande'
  };

  return (
    <>
      {/* Accessibility Toggle Button */}
      <Button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "fixed top-4 right-4 z-50 p-3 rounded-full",
          "bg-primary text-primary-foreground",
          "hover:bg-primary/90 transition-all duration-300",
          "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          isOpen && "bg-primary/90"
        )}
        aria-label="Abrir panel de accesibilidad"
        aria-expanded={isOpen}
      >
        <Accessibility className="h-5 w-5" />
      </Button>

      {/* Accessibility Panel */}
      {isOpen && (
        <Card className={cn(
          "fixed top-16 right-4 z-40 w-80 max-h-[80vh] overflow-y-auto",
          "animate-fade-in border-2 shadow-xl",
          "bg-background/95 backdrop-blur-md"
        )}>
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Accessibility className="h-5 w-5" />
              Configuración de Accesibilidad
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* High Contrast */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="high-contrast" className="flex items-center gap-2 text-sm font-medium">
                  <Contrast className="h-4 w-4" />
                  Alto Contraste
                </Label>
                <Switch
                  id="high-contrast"
                  checked={settings.highContrast}
                  onCheckedChange={toggleHighContrast}
                  aria-describedby="high-contrast-desc"
                />
              </div>
              <p id="high-contrast-desc" className="text-xs text-muted-foreground">
                Aumenta el contraste para mejorar la legibilidad
              </p>
            </div>

            {/* Font Size */}
            <div className="space-y-3">
              <Label className="flex items-center gap-2 text-sm font-medium">
                <Type className="h-4 w-4" />
                Tamaño de Fuente: {fontSizeLabels[settings.fontSize]}
              </Label>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={decreaseFontSize}
                  disabled={settings.fontSize === 'small'}
                  aria-label="Disminuir tamaño de fuente"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <div className="flex-1 text-center text-sm">
                  {fontSizeLabels[settings.fontSize]}
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={increaseFontSize}
                  disabled={settings.fontSize === 'extra-large'}
                  aria-label="Aumentar tamaño de fuente"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            </div>

            {/* Reduce Motion */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="reduce-motion" className="flex items-center gap-2 text-sm font-medium">
                  <Zap className="h-4 w-4" />
                  Reducir Animaciones
                </Label>
                <Switch
                  id="reduce-motion"
                  checked={settings.reduceMotion}
                  onCheckedChange={(checked) => updateSetting('reduceMotion', checked)}
                  aria-describedby="reduce-motion-desc"
                />
              </div>
              <p id="reduce-motion-desc" className="text-xs text-muted-foreground">
                Reduce las animaciones para evitar mareos
              </p>
            </div>

            {/* Focus Visible */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="focus-visible" className="flex items-center gap-2 text-sm font-medium">
                  <Focus className="h-4 w-4" />
                  Indicador de Foco
                </Label>
                <Switch
                  id="focus-visible"
                  checked={settings.focusVisible}
                  onCheckedChange={(checked) => updateSetting('focusVisible', checked)}
                  aria-describedby="focus-visible-desc"
                />
              </div>
              <p id="focus-visible-desc" className="text-xs text-muted-foreground">
                Muestra indicadores visuales al navegar con teclado
              </p>
            </div>

            {/* Reset Button */}
            <Button
              onClick={resetSettings}
              variant="outline"
              className="w-full"
              aria-label="Restablecer configuración de accesibilidad"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Restablecer Configuración
            </Button>

            {/* Keyboard Shortcuts Info */}
            <div className="pt-4 border-t">
              <h4 className="text-sm font-medium mb-2">Atajos de Teclado:</h4>
              <div className="space-y-1 text-xs text-muted-foreground">
                <div>• Alt + C: Alternar alto contraste</div>
                <div>• Alt + +: Aumentar fuente</div>
                <div>• Alt + -: Disminuir fuente</div>
                <div>• Escape: Cerrar panel</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/20 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};