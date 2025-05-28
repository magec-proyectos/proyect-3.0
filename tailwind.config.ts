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
				
				// Enhanced Brand Colors with modern, appealing colors
				neon: {
					blue: "#0EA5E9", // More vibrant sky blue
					lime: "#22C55E", // Cleaner green
				},
				
				// Enhanced surface colors
				surface: {
					primary: "hsl(var(--surface-primary))",
					secondary: "hsl(var(--surface-secondary))",
					tertiary: "hsl(var(--surface-tertiary))",
					elevated: "hsl(var(--surface-elevated))",
				},
				
				// Enhanced state colors with modern, appealing colors
				success: {
					50: "#ECFEF3",
					100: "#D1FAE0", 
					200: "#A3F3C4",
					300: "#6EE7A7",
					400: "#34D399",
					500: "#22C55E", // Better green - more vibrant
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
					50: "#F0F9FF",
					100: "#E0F2FE",
					200: "#BAE6FD",
					300: "#7DD3FC",
					400: "#38BDF8",
					500: "#0EA5E9", // Better blue - more appealing and modern
					600: "#0284C7",
					700: "#0369A1",
					800: "#075985",
					900: "#0C4A6E",
				},
				
				// Enhanced dark theme colors
				dark: {
					DEFAULT: "#0A0A0A",
					lighter: "#151515",
					card: "#1A1A1A",
					border: "#2A2A2A",
					darker: "#050505",
					surface: "#202020",
					elevated: "#303030",
				},
				
				// Enhanced sport colors with better blue
				sport: {
					football: {
						primary: "#0EA5E9", // Better blue
						secondary: "#0284C7",
						accent: "#06B6D4",
						light: "#F0F9FF",
						dark: "#0C4A6E",
					},
					basketball: {
						primary: "#F97316",
						secondary: "#EA580C",
						accent: "#22C55E", // Better green
						light: "#FED7AA",
						dark: "#C2410C",
					},
					americanFootball: {
						primary: "#A855F7",
						secondary: "#9333EA",
						accent: "#EC4899",
						light: "#E9D5FF",
						dark: "#7C2D12",
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
			},
			
			// Enhanced gradients
			backgroundImage: {
				'gradient-brand': 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--secondary)) 100%)',
				'gradient-surface': 'linear-gradient(135deg, hsl(var(--surface-primary)) 0%, hsl(var(--surface-secondary)) 100%)',
				'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
			},
			
			// Enhanced box shadows with better colors
			boxShadow: {
				'glass': '0 8px 32px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
				'glass-lg': '0 12px 40px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
				'elevation-1': '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
				'elevation-2': '0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 4px rgba(0, 0, 0, 0.06)',
				'elevation-3': '0 10px 15px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
				'glow-blue': '0 0 20px rgba(14, 165, 233, 0.3)', // Better blue glow
				'glow-green': '0 0 20px rgba(34, 197, 94, 0.3)', // Better green glow
				'glow-orange': '0 0 20px rgba(249, 115, 22, 0.3)',
				'glow-purple': '0 0 20px rgba(168, 85, 247, 0.3)',
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
