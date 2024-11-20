module.exports = {
    content: [
        './src/**/*.html',
        './src/**/*.js',
        './src/**/*.{js,jsx,ts,tsx}',
        './index.html',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: 'hsl(222.2 47.4% 11.2%)',
                    foreground: 'hsl(210 40% 98%)',
                },
                destructive: {
                    DEFAULT: 'hsl(0 63% 31%)',
                    foreground: 'hsl(210 40% 98%)',
                },
                secondary: {
                    DEFAULT: 'hsl(210 40% 96.1%)',
                    foreground: 'hsl(222.2 47.4% 11.2%)',
                },
                accent: {
                    DEFAULT: 'hsl(210 40% 96.1%)',
                    foreground: 'hsl(222.2 47.4% 11.2%)',
                },
            },
        },
    },
    plugins: [require('tailwindcss'), require('autoprefixer')],
};
