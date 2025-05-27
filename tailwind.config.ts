
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
				
				// Enhanced Brand Colors - Better contrast and accessibility
				neon: {
					blue: "#2196F3", // More accessible blue
					lime: "#8BC34A", // Softer lime green
				},
				
				// Thematic Sport Colors
				sport: {
					football: {
						primary: "#2196F3",
						secondary: "#1976D2",
						accent: "#03DAC6",
						light: "#E3F2FD",
						dark: "#0D47A1",
					},
					basketball: {
						primary: "#FF9800",
						secondary: "#F57C00",
						accent: "#4CAF50",
						light: "#FFF3E0",
						dark: "#E65100",
					},
					americanFootball: {
						primary: "#9C27B0",
						secondary: "#7B1FA2",
						accent: "#E91E63",
						light: "#F3E5F5",
						dark: "#4A148C",
					},
					baseball: {
						primary: "#4CAF50",
						secondary: "#388E3C",
						accent: "#FFC107",
						light: "#E8F5E8",
						dark: "#1B5E20",
					},
					tennis: {
						primary: "#009688",
						secondary: "#00695C",
						accent: "#CDDC39",
						light: "#E0F2F1",
						dark: "#004D40",
					},
				},
				
				// Enhanced State Colors
				success: {
					50: "#E8F5E8",
					100: "#C8E6C9",
					200: "#A5D6A7",
					300: "#81C784",
					400: "#66BB6A",
					500: "#4CAF50",
					600: "#43A047",
					700: "#388E3C",
					800: "#2E7D32",
					900: "#1B5E20",
				},
				warning: {
					50: "#FFF8E1",
					100: "#FFECB3",
					200: "#FFE082",
					300: "#FFD54F",
					400: "#FFCA28",
					500: "#FFC107",
					600: "#FFB300",
					700: "#FFA000",
					800: "#FF8F00",
					900: "#FF6F00",
				},
				error: {
					50: "#FFEBEE",
					100: "#FFCDD2",
					200: "#EF9A9A",
					300: "#E57373",
					400: "#EF5350",
					500: "#F44336",
					600: "#E53935",
					700: "#D32F2F",
					800: "#C62828",
					900: "#B71C1C",
				},
				info: {
					50: "#E3F2FD",
					100: "#BBDEFB",
					200: "#90CAF9",
					300: "#64B5F6",
					400: "#42A5F5",
					500: "#2196F3",
					600: "#1E88E5",
					700: "#1976D2",
					800: "#1565C0",
					900: "#0D47A1",
				},
				
				// Semantic UI Colors
				surface: {
					primary: "#1a1a1a",
					secondary: "#2a2a2a",
					tertiary: "#3a3a3a",
					elevated: "#404040",
				},
				
				// Enhanced Neutral Palette
				neutral: {
					50: "#FAFAFA",
					100: "#F5F5F5",
					200: "#EEEEEE",
					300: "#E0E0E0",
					400: "#BDBDBD",
					500: "#9E9E9E",
					600: "#757575",
					700: "#616161",
					800: "#424242",
					900: "#212121",
				},
				
				// Dark Theme Colors - Improved hierarchy
				dark: {
					DEFAULT: "#0D0D0D",
					lighter: "#1a1a1a",
					card: "#1e1e1e",
					border: "#3a3a3a",
					darker: "#050505",
					surface: "#252525",
					elevated: "#2f2f2f",
				},
				
				// Interactive States
				interactive: {
					hover: "rgba(255, 255, 255, 0.08)",
					active: "rgba(255, 255, 255, 0.12)",
					focus: "rgba(33, 150, 243, 0.24)",
					disabled: "rgba(255, 255, 255, 0.38)",
				},
				
				// Gaming/Casino Specific Colors
				casino: {
					felt: "#0B4D2C",
					gold: "#FFD700",
					silver: "#C0C0C0",
					bronze: "#CD7F32",
					chip: {
						red: "#DC2626",
						blue: "#2563EB",
						green: "#16A34A",
						black: "#171717",
						white: "#FFFFFF",
					},
				},
				
				// Data Visualization Colors
				chart: {
					primary: "#2196F3",
					secondary: "#4CAF50",
					tertiary: "#FF9800",
					quaternary: "#9C27B0",
					danger: "#F44336",
					grid: "rgba(255, 255, 255, 0.1)",
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
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
				// Enhanced animations with better performance
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' },
				},
				glow: {
					'0%, 100%': { filter: 'brightness(1)' },
					'50%': { filter: 'brightness(1.1)' },
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
				"spin-slow": {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				"bounce-soft": {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
				"fade-in-soft": {
					'0%': { opacity: '0', transform: 'translateY(5px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				},
				shimmer: {
					'0%': { transform: 'translateX(-100%)' },
					'100%': { transform: 'translateX(100%)' },
				},
				"scale-in": {
					'0%': { transform: 'scale(0.9)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"pulse": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
				"glow": "glow 3s ease-in-out infinite",
				"float": "float 4s ease-in-out infinite",
				"spin-slow": "spin-slow 12s linear infinite",
				"bounce-soft": "bounce-soft 3s ease-in-out infinite",
				"fade-in-soft": "fade-in-soft 0.5s ease-out",
				"shimmer": "shimmer 2s infinite",
				"scale-in": "scale-in 0.3s ease-out",
			},
			// Enhanced gradients
			backgroundImage: {
				'gradient-sport-football': 'linear-gradient(135deg, #2196F3 0%, #03DAC6 100%)',
				'gradient-sport-basketball': 'linear-gradient(135deg, #FF9800 0%, #4CAF50 100%)',
				'gradient-sport-american-football': 'linear-gradient(135deg, #9C27B0 0%, #E91E63 100%)',
				'gradient-brand': 'linear-gradient(135deg, #2196F3 0%, #8BC34A 100%)',
				'gradient-success': 'linear-gradient(135deg, #4CAF50 0%, #81C784 100%)',
				'gradient-warning': 'linear-gradient(135deg, #FFC107 0%, #FFE082 100%)',
				'gradient-error': 'linear-gradient(135deg, #F44336 0%, #EF5350 100%)',
				'gradient-surface': 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
			},
			// Box shadows for depth
			boxShadow: {
				'glow-blue': '0 0 20px rgba(33, 150, 243, 0.3)',
				'glow-green': '0 0 20px rgba(76, 175, 80, 0.3)',
				'glow-orange': '0 0 20px rgba(255, 152, 0, 0.3)',
				'glow-purple': '0 0 20px rgba(156, 39, 176, 0.3)',
				'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)',
				'elevation-2': '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
				'elevation-3': '0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
