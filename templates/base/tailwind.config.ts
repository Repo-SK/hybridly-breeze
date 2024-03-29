import { type Config } from 'tailwindcss';

export default {
    content: ['./resources/**/*.{js,ts,vue,blade.php}'],
    safelist: ['dark'],
    darkMode: 'class',
    theme: {
        extend: {},
    },
    plugins: [require('@tailwindcss/forms')],
} satisfies Config;
