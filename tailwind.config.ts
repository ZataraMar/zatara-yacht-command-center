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
			padding: {
				DEFAULT: '1.5rem',
				sm: '2rem',
				lg: '3rem',
				xl: '4rem',
			},
			screens: {
				'2xl': '1400px'
			}
		},
		screens: {
			'xs': '375px',
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		extend: {
			fontFamily: {
				'tw-cen': ['Tw Cen MT', 'sans-serif'],
				'playfair': ['Playfair Display', 'serif'],
				'script': ['Playfair Display', 'serif'],
				'sans': ['Tw Cen MT', 'sans-serif'],
				'serif': ['Playfair Display', 'serif'],
			},
			fontSize: {
				'luxury-xs': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
				'luxury-sm': ['1.25rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
				'luxury-base': ['1.375rem', { lineHeight: '1.6', letterSpacing: '0.01em' }],
				'luxury-lg': ['1.625rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
				'luxury-xl': ['2rem', { lineHeight: '1.4', letterSpacing: '0.01em' }],
				'luxury-2xl': ['2.5rem', { lineHeight: '1.3', letterSpacing: '0.01em' }],
				'luxury-3xl': ['3.25rem', { lineHeight: '1.2', letterSpacing: '0.01em' }],
				'luxury-4xl': ['4rem', { lineHeight: '1.1', letterSpacing: '0.01em' }],
				'luxury-5xl': ['5rem', { lineHeight: '1.1', letterSpacing: '0.01em' }],
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
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// Zatara Luxury Brand Colors
				zatara: {
					blue: 'hsl(var(--zatara-blue))',
					'blue-dark': 'hsl(var(--zatara-blue-dark))',
					'blue-light': 'hsl(var(--zatara-blue-light))',
					gold: 'hsl(var(--zatara-gold))',
					'gold-dark': 'hsl(var(--zatara-gold-dark))',
					'gold-light': 'hsl(var(--zatara-gold-light))',
					navy: 'hsl(var(--zatara-navy))',
					cream: 'hsl(var(--zatara-cream))',
					pearl: 'hsl(var(--zatara-pearl))',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
				'luxury': '1.5rem',
			},
			spacing: {
				'luxury-xs': '0.75rem',
				'luxury-sm': '1.5rem',
				'luxury-md': '3rem',
				'luxury-lg': '4.5rem',
				'luxury-xl': '6rem',
				'safe-top': 'env(safe-area-inset-top)',
				'safe-bottom': 'env(safe-area-inset-bottom)',
				'safe-left': 'env(safe-area-inset-left)',
				'safe-right': 'env(safe-area-inset-right)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'luxury-float': {
					'0%, 100%': {
						transform: 'translateY(0px)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'shimmer': {
					'0%': {
						backgroundPosition: '-200% 0'
					},
					'100%': {
						backgroundPosition: '200% 0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'slide-up': 'slide-up 0.8s ease-out',
				'luxury-float': 'luxury-float 3s ease-in-out infinite',
				'shimmer': 'shimmer 2s linear infinite',
			},
			boxShadow: {
				'luxury': '0 10px 40px -10px rgba(0, 163, 228, 0.3), 0 4px 25px -5px rgba(0, 163, 228, 0.1)',
				'gold': '0 10px 40px -10px rgba(204, 204, 51, 0.3), 0 4px 25px -5px rgba(204, 204, 51, 0.1)',
				'elegant': '0 20px 50px -10px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.04)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
