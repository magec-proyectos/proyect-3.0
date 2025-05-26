
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
				// Nuevos colores más suaves para reducir fatiga visual
				neon: {
					blue: "#4FC3F7", // Azul más suave (era #00f0ff)
					lime: "#8BC34A", // Verde más suave (era #aaff00)
				},
				// Colores alternativos más suaves
				soft: {
					blue: "#64B5F6",
					cyan: "#4DD0E1",
					green: "#81C784",
					lime: "#AED581",
					teal: "#4DB6AC",
					purple: "#9575CD",
				},
				dark: {
					DEFAULT: "#121212",
					lighter: "#1e1e1e",
					card: "#1a1a1a", // Ligeramente más claro para mejor contraste
					border: "#404040", // Más claro para mejor visibilidad
					darker: "#0d0d0d" // Más oscuro para mejor jerarquía
				}
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
				// Animaciones más suaves
				pulse: {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }, // Menos contraste (era 0.5)
				},
				glow: {
					'0%, 100%': { filter: 'brightness(1)' },
					'50%': { filter: 'brightness(1.1)' }, // Menos intenso (era 1.2)
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }, // Menos movimiento (era -10px)
				},
				"spin-slow": {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' },
				},
				"bounce-soft": { // Nueva animación más suave
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }, // Menos agresivo
				},
				"fade-in-soft": { // Nueva animación de fade más suave
					'0%': { opacity: '0', transform: 'translateY(5px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' },
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"pulse": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite", // Más lento
				"glow": "glow 3s ease-in-out infinite", // Más lento
				"float": "float 4s ease-in-out infinite", // Más lento
				"spin-slow": "spin-slow 12s linear infinite", // Más lento
				"bounce-soft": "bounce-soft 3s ease-in-out infinite", // Nueva
				"fade-in-soft": "fade-in-soft 0.5s ease-out", // Nueva
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
