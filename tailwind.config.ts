
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			// Sistema tipográfico mejorado
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
				heading: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
			},
			
			// Sistema de espaciado mejorado
			spacing: {
				'xs': '0.25rem',
				'sm': '0.5rem', 
				'md': '1rem',
				'lg': '1.5rem',
				'xl': '2rem',
				'2xl': '3rem',
				'3xl': '4rem',
				'4xl': '6rem',
			},

			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				
				// Colores premium mejorados
				neon: {
					blue: "#3B82F6",
					lime: "#22C55E",
				},
				
				// Superficies premium
				surface: {
					primary: "hsl(var(--surface-primary))",
					secondary: "hsl(var(--surface-secondary))",
					tertiary: "hsl(var(--surface-tertiary))",
					elevated: "hsl(var(--surface-elevated))",
				},
				
				// Estados mejorados
				success: {
					50: "#ECFEF3",
					100: "#D1FAE0", 
					200: "#A3F3C4",
					300: "#6EE7A7",
					400: "#34D399",
					500: "#22C55E",
					600: "#16A34A",
					700: "#15803D",
					800: "#166534",
					900: "#14532D",
				},
				warning: {
					50: "#FFFBEB",
					100: "#FEF3C7",
					200: "#FDE68A",
					300: "#FCD34D",
					400: "#FBBF24",
					500: "#F59E0B",
					600: "#D97706",
					700: "#B45309",
					800: "#92400E",
					900: "#78350F",
				},
				error: {
					50: "#FEF2F2",
					100: "#FEE2E2",
					200: "#FECACA",
					300: "#FCA5A5",
					400: "#F87171",
					500: "#EF4444",
					600: "#DC2626",
					700: "#B91C1C",
					800: "#991B1B",
					900: "#7F1D1D",
				},
				info: {
					50: "#EFF6FF",
					100: "#DBEAFE",
					200: "#BFDBFE",
					300: "#93C5FD",
					400: "#60A5FA",
					500: "#3B82F6",
					600: "#2563EB",
					700: "#1D4ED8",
					800: "#1E40AF",
					900: "#1E3A8A",
				},
				
				// Tema oscuro mejorado
				dark: {
					DEFAULT: "#0F0F0F",
					lighter: "#1A1A1A",
					card: "#1F1F1F",
					border: "#2A2A2A",
					darker: "#0A0A0A",
					surface: "#252525",
					elevated: "#303030",
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			
			// Tipografía responsive mejorada
			fontSize: {
				'display-2xl': ['5rem', { lineHeight: '1', letterSpacing: '-0.025em' }],
				'display-xl': ['4rem', { lineHeight: '1.1', letterSpacing: '-0.025em' }],
				'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
				'display-sm': ['1.875rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
				'heading-xl': ['1.5rem', { lineHeight: '1.3', fontWeight: '700' }],
				'heading-lg': ['1.25rem', { lineHeight: '1.3', fontWeight: '700' }],
				'heading-md': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
				'body-lg': ['1.125rem', { lineHeight: '1.6' }],
				'body-md': ['1rem', { lineHeight: '1.6' }],
				'body-sm': ['0.875rem', { lineHeight: '1.5' }],
				'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
			},

			// Animaciones premium
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"scale-in-premium": {
					"0%": { opacity: "0", transform: "scale(0.9)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
				"shimmer": {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(100%)" },
				},
				"float-premium": {
					"0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
					"33%": { transform: "translateY(-8px) rotate(1deg)" },
					"66%": { transform: "translateY(-4px) rotate(-1deg)" },
				},
				"pulse-premium": {
					"0%, 100%": { opacity: "1", transform: "scale(1)" },
					"50%": { opacity: "0.8", transform: "scale(1.05)" },
				},
				"gradient-shift": {
					"0%, 100%": { backgroundPosition: "0% 50%" },
					"50%": { backgroundPosition: "100% 50%" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.3s ease-out",
				"scale-in-premium": "scale-in-premium 0.3s ease-out",
				"shimmer": "shimmer 2s infinite",
				"float-premium": "float-premium 6s ease-in-out infinite",
				"pulse-premium": "pulse-premium 3s ease-in-out infinite",
				"gradient-shift": "gradient-shift 3s ease infinite",
			},
			
			// Gradientes premium
			backgroundImage: {
				'gradient-premium': 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 50%, #22C55E 100%)',
				'gradient-surface': 'linear-gradient(135deg, hsl(var(--surface-primary)) 0%, hsl(var(--surface-secondary)) 100%)',
				'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
			},
			
			// Tamaños de fondo
			backgroundSize: {
				'size-200': '200% 200%',
			},
			
			// Posiciones de fondo
			backgroundPosition: {
				'pos-0': '0% 0%',
				'pos-100': '100% 100%',
			},
			
			// Sombras premium
			boxShadow: {
				'glass': '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
				'glass-lg': '0 16px 50px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
				'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
				'elevation-2': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
				'elevation-3': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
				'glow-blue': '0 0 20px rgba(59, 130, 246, 0.4)',
				'glow-emerald': '0 0 20px rgba(34, 197, 94, 0.4)',
				'glow-purple': '0 0 20px rgba(139, 92, 246, 0.4)',
				'neon-blue': '0 0 5px theme(colors.blue.500), 0 0 20px theme(colors.blue.500)',
				'neon-emerald': '0 0 5px theme(colors.emerald.500), 0 0 20px theme(colors.emerald.500)',
			},
			
			// Blur mejorado
			backdropBlur: {
				'xs': '2px',
				'sm': '4px',
				'md': '8px',
				'lg': '16px',
				'xl': '24px',
				'2xl': '32px',
				'3xl': '48px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
