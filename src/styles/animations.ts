export const keyframes = {
  'accordion-down': {
    from: { height: '0' },
    to: { height: 'var(--radix-accordion-content-height)' },
  },
  'accordion-up': {
    from: { height: 'var(--radix-accordion-content-height)' },
    to: { height: '0' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0)' },
    '50%': { transform: 'translateY(-20px)' },
  },
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '0.7' },
  },
  scale: {
    '0%': { transform: 'scale(0.95)' },
    '100%': { transform: 'scale(1)' },
  },
  fadeIn: {
    from: { opacity: '0', transform: 'translateY(10px)' },
    to: { opacity: '1', transform: 'translateY(0)' },
  },
};

export const animation = {
  'accordion-down': 'accordion-down 0.2s ease-out',
  'accordion-up': 'accordion-up 0.2s ease-out',
  'float': 'float 6s ease-in-out infinite',
  'pulse': 'pulse 3s ease-in-out infinite',
  'scale': 'scale 0.3s ease-out forwards',
  'fade-in': 'fadeIn 0.5s ease-out forwards',
};