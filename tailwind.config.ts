
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
			// Enhanced font family system
			fontFamily: {
				sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
				display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
				heading: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
			},
			
			// Enhanced spacing system
			spacing: {
				'xs': 'var(--spacing-xs)',
				'sm': 'var(--spacing-sm)', 
				'md': 'var(--spacing-md)',
				'lg': 'var(--spacing-lg)',
				'xl': 'var(--spacing-xl)',
				'2xl': 'var(--spacing-2xl)',
				'3xl': 'var(--spacing-3xl)',
				'4xl': 'var(--spacing-4xl)',
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
				
				// Richer brand colors with expanded palette
				brand: {
					blue: {
						50: "#eff6ff",
						100: "#dbeafe",
						200: "#bfdbfe",
						300: "#93c5fd",
						400: "#60a5fa",
						500: "#3b82f6",
						600: "#2563eb", // Primary blue
						700: "#1d4ed8",
						800: "#1e40af",
						900: "#1e3a8a",
						950: "#172554"
					},
					green: {
						50: "#f0fdf4",
						100: "#dcfce7",
						200: "#bbf7d0",
						300: "#86efac",
						400: "#4ade80",
						500: "#22c55e", // Primary green
						600: "#16a34a",
						700: "#15803d",
						800: "#166534",
						900: "#14532d",
						950: "#052e16"
					},
					purple: {
						50: "#faf5ff",
						100: "#f3e8ff",
						200: "#e9d5ff",
						300: "#d8b4fe",
						400: "#c084fc",
						500: "#a855f7",
						600: "#9333ea", // Primary purple
						700: "#7c2d12",
						800: "#6b21a8",
						900: "#581c87",
						950: "#3b0764"
					}
				},
				
				// Enhanced neon colors for gaming
				neon: {
					blue: "#2563eb", // Solid blue instead of gradient
					lime: "#22c55e", // Solid green instead of gradient
					purple: "#9333ea",
					orange: "#ea580c",
					pink: "#ec4899",
					cyan: "#06b6d4",
					yellow: "#eab308"
				},
				
				// Enhanced surface colors
				surface: {
					primary: "hsl(var(--surface-primary))",
					secondary: "hsl(var(--surface-secondary))",
					tertiary: "hsl(var(--surface-tertiary))",
					elevated: "hsl(var(--surface-elevated))",
				},
				
				// Expressive state colors
				success: {
					50: "#f0fdf4",
					100: "#dcfce7",
					200: "#bbf7d0",
					300: "#86efac",
					400: "#4ade80",
					500: "#22c55e", // Main success
					600: "#16a34a",
					700: "#15803d",
					800: "#166534",
					900: "#14532d",
				},
				warning: {
					50: "#fffbeb",
					100: "#fef3c7",
					200: "#fde68a",
					300: "#fcd34d",
					400: "#fbbf24",
					500: "#f59e0b", // Main warning
					600: "#d97706",
					700: "#b45309",
					800: "#92400e",
					900: "#78350f",
				},
				error: {
					50: "#fef2f2",
					100: "#fee2e2",
					200: "#fecaca",
					300: "#fca5a5",
					400: "#f87171",
					500: "#ef4444", // Main error
					600: "#dc2626",
					700: "#b91c1c",
					800: "#991b1b",
					900: "#7f1d1d",
				},
				info: {
					50: "#f0f9ff",
					100: "#e0f2fe",
					200: "#bae6fd",
					300: "#7dd3fc",
					400: "#38bdf8",
					500: "#0ea5e9", // Main info
					600: "#0284c7",
					700: "#0369a1",
					800: "#075985",
					900: "#0c4a6e",
				},
				
				// Gaming/betting specific colors
				betting: {
					win: "#22c55e",
					loss: "#ef4444",
					pending: "#f59e0b",
					void: "#6b7280",
					favorite: "#fbbf24",
					underdog: "#8b5cf6",
					even: "#06b6d4",
					odd: "#ec4899"
				},
				
				// Enhanced dark theme colors
				dark: {
					DEFAULT: "#0a0a0a",
					lighter: "#151515",
					card: "#1a1a1a",
					border: "#2a2a2a",
					darker: "#050505",
					surface: "#202020",
					elevated: "#303030",
				},
				
				// Enhanced sport colors with solid colors
				sport: {
					football: {
						primary: "#2563eb", // Solid blue
						secondary: "#1d4ed8",
						accent: "#06b6d4",
						light: "#eff6ff",
						dark: "#1e3a8a",
					},
					basketball: {
						primary: "#ea580c", // Solid orange
						secondary: "#dc2626",
						accent: "#22c55e",
						light: "#fff7ed",
						dark: "#9a3412",
					},
					americanFootball: {
						primary: "#9333ea", // Solid purple
						secondary: "#7c2d12",
						accent: "#ec4899",
						light: "#faf5ff",
						dark: "#581c87",
					},
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			
			// Enhanced typography
			fontSize: {
				'display-2xl': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
				'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
				'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
				'display-sm': ['1.875rem', { lineHeight: '1.2' }],
				'heading-xl': ['1.5rem', { lineHeight: '1.3', fontWeight: '600' }],
				'heading-lg': ['1.25rem', { lineHeight: '1.3', fontWeight: '600' }],
				'heading-md': ['1.125rem', { lineHeight: '1.4', fontWeight: '600' }],
				'body-lg': ['1.125rem', { lineHeight: '1.6' }],
				'body-md': ['1rem', { lineHeight: '1.6' }],
				'body-sm': ['0.875rem', { lineHeight: '1.5' }],
				'caption': ['0.75rem', { lineHeight: '1.4', fontWeight: '500' }],
			},

			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				// Enhanced animations
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(8px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"fade-out": {
					"0%": { opacity: "1", transform: "translateY(0)" },
					"100%": { opacity: "0", transform: "translateY(8px)" },
				},
				"scale-in": {
					"0%": { opacity: "0", transform: "scale(0.95)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
				"slide-up": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"shimmer": {
					"0%": { transform: "translateX(-100%)" },
					"100%": { transform: "translateX(100%)" },
				},
				"float": {
					"0%, 100%": { transform: "translateY(0px)" },
					"50%": { transform: "translateY(-4px)" },
				},
				"pulse-soft": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0.8" },
				},
				"glow": {
					"0%, 100%": { boxShadow: "0 0 20px rgba(37, 99, 235, 0.3)" },
					"50%": { boxShadow: "0 0 30px rgba(37, 99, 235, 0.5)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.3s ease-out",
				"fade-out": "fade-out 0.3s ease-out",
				"scale-in": "scale-in 0.2s ease-out",
				"slide-up": "slide-up 0.3s ease-out",
				"shimmer": "shimmer 2s infinite",
				"float": "float 4s ease-in-out infinite",
				"pulse-soft": "pulse-soft 3s ease-in-out infinite",
				"glow": "glow 2s ease-in-out infinite",
			},
			
			// Enhanced box shadows with solid colors
			boxShadow: {
				'glass': '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
				'glass-lg': '0 12px 40px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
				'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
				'elevation-2': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
				'elevation-3': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
				'glow-blue': '0 0 20px rgba(37, 99, 235, 0.3)',
				'glow-green': '0 0 20px rgba(34, 197, 94, 0.3)',
				'glow-orange': '0 0 20px rgba(234, 88, 12, 0.3)',
				'glow-purple': '0 0 20px rgba(147, 51, 234, 0.3)',
			},
			
			// Enhanced backdrop blur
			backdropBlur: {
				'xs': '2px',
				'sm': '4px',
				'md': '8px',
				'lg': '16px',
				'xl': '24px',
				'2xl': '32px',
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
