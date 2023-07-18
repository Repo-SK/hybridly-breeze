const plugin = require('tailwindcss/plugin');
const colors = require('tailwindcss/colors');
const Color = require('color');

// --------------------------------------------------------
// Extract RGB channels from a color
// --------------------------------------------------------

function getRgbChannels(color) {
    const col = Color(color);
    if (col.alpha() !== 1) {
        return color;
    }
    return col.rgb().array().join(' ');
}

// --------------------------------------------------------
// Helper function to convert variable to css color string
// --------------------------------------------------------

const c = (color, opacity = true) => {
    return `rgb(var(${color})${opacity ? ' / <alpha-value>' : ''})`;
};

// --------------------------------------------------------
// Themes definition
// --------------------------------------------------------

const themes = [
    {
        name: 'root',
        colors: {
            'bg-page': '#fbfbfc',
            'bg-card': colors.white,

            'text-base': '#0e0e0e',
            'text-light': '#4e5969',
            'text-lighter': '#86909c',
            'text-lightest': '#c9cdd4',

            accent: '#165dff',
            'accent-hover': '#4080ff',
            'accent-active': '#0e42d2',
            secondary: '#f2f3f5',
            'secondary-hover': '#e5e6eb',
            'secondary-active': '#c9cdd4',

            'bd-base': '#eaeaea',
        },
        vars: {
            'h-xs': '24px',
            'h-sm': '28px',
            'h-md': '32px',
            'h-lg': '36px',
            't-xs': '12px',
            't-sm': '14px',
            't-md': '14px',
            't-lg': '14px',
        },
    },
    {
        name: 'dark',
        colors: {
            'bg-page': '#101112',
            'bg-card': '#1a1c1e',

            'text-base': '#fdfdfb',
            'text-light': '#faf8f2',
            'text-lighter': '#f6f3ea',
            'text-lightest': '#f3efe2',

            accent: '#3c7eff',
            'accent-hover': '#306fff',
            'accent-active': '#689fff',
            secondary: '#323233',
            'secondary-hover': '#3d3d3e',
            'secondary-active': '#444',

            'bd-base': '#333',
        },
        vars: {},
    },
];

// --------------------------------------------------------
// Tailwind CSS plugin
// --------------------------------------------------------

module.exports = plugin(
    function ({ addBase, addComponents, addUtilities }) {
        addUtilities({
            '.flex-center': {
                '@apply flex items-center justify-center': {},
            },
            '.xsmall': {
                height: 'var(--h-xs)',
                'font-size': 'var(--t-xs)',
            },
            '.small': {
                height: 'var(--h-sm)',
                'font-size': 'var(--t-sm)',
            },
            '.medium': {
                height: 'var(--h-md)',
                'font-size': 'var(--t-md)',
            },
            '.large': {
                height: 'var(--h-lg)',
                'font-size': 'var(--t-lg)',
            },
            '.focus-base': {
                '@apply outline-none duration-100': {},
                '&:focus': {
                    '@apply transition-all': {},
                },
            },
            '.focus-ring': {
                '@apply focus-base': {},
                '&:focus': {
                    '@apply border-theme-accent': {},
                },
            },
            '.focus-ring-on-accent': {
                '&:focus': {
                    '@apply ring-2 ring-theme-accent ring-offset-2 ring-offset-theme-page border-transparent':
                        {},
                },
            },
        });

        addComponents({
            '.button': {
                '@apply focus-ring relative medium px-[15px] rounded-[2px] border border-transparent w-max flex-center space-x-2':
                    {},
                '@apply transition-all duration-75': {},
                '&.loading': {
                    '&:before': {
                        '@apply mr-2 h-4 w-4 rounded-full border-2 animate-spin':
                            {},
                        content: '""',
                        'border-top-color': 'transparent',
                        'border-left-color': 'transparent',
                        'border-bottom-color': 'currentColor',
                        'border-right-color': 'currentColor',
                    },
                },
                '&.loading-absolute': {
                    '&:before': {
                        '@apply absolute left-5 h-4 w-4 rounded-full border-2 animate-spin':
                            {},
                        content: '""',
                        'border-top-color': 'transparent',
                        'border-left-color': 'transparent',
                        'border-bottom-color': 'currentColor',
                        'border-right-color': 'currentColor',
                    },
                },
                svg: {
                    '@apply w-4 h-4': {},
                },
            },
            '.button-primary': {
                '@apply button focus-ring-on-accent': {},
                '@apply bg-theme-accent text-white hover:bg-theme-accent-hover active:bg-theme-accent-active':
                    {},
            },
            '.button-secondary': {
                '@apply button': {},
                '@apply bg-theme-secondary text-theme-light hover:bg-theme-secondary-hover active:bg-theme-secondary-active':
                    {},
            },
            '.button-outline': {
                '@apply button focus-ring-on-accent': {},
                '@apply bg-transparent border-theme-accent text-theme-accent':
                    {},
                '&:hover': {
                    '@apply border-theme-accent bg-theme-accent text-white': {},
                },
                '&:active': {
                    '@apply border-theme-accent-active bg-theme-accent-active text-white':
                        {},
                },
            },
            '.button-ghost': {
                '@apply button': {},
                '@apply text-theme-accent bg-transparent hover:bg-theme-secondary active:bg-theme-secondary-hover':
                    {},
            },
            '.button-link': {
                '@apply underline text-sm text-theme-light hover:text-theme-base':
                    {},
            },
            '.input': {
                '@apply relative medium px-[15px] rounded-[2px] border border-transparent w-max':
                    {},
                '@apply bg-theme-secondary': {},
                'box-shadow': 'none !important',
                '&:hover': {
                    '@apply bg-theme-secondary-hover': {},
                },
                '&:focus': {
                    '@apply bg-theme-card': {},
                    '@apply outline-none border-theme-accent': {},
                },
            },
            '.checkbox': {
                '@apply input': {},
                '@apply w-4 h-4 p-2 shrink-0 text-theme-accent': {},
                'box-shadow': 'none !important',
            },
        });

        themes.forEach((theme) => {
            const { colors, vars, name } = theme;
            const propertiesObj = {};

            Object.keys(colors).forEach((color) => {
                propertiesObj[`--${color}`] = getRgbChannels(colors[color]);
            });

            Object.keys(vars).forEach((v) => {
                propertiesObj[`--${v}`] = vars[v];
            });

            addBase({
                [name === 'root' ? ':root' : `.${name}`]: propertiesObj,
            });
        });

        addBase({
            ['body']: {
                'background-color': c('--bg-page', false),
                color: c('--text-base', false),
            },
        });
    },

    // --------------------------------------------------------
    // Add semantic color names to Tailwind's color palette
    // --------------------------------------------------------

    {
        theme: {
            extend: {
                colors: {
                    theme: {
                        accent: c('--accent'),
                        'accent-hover': c('--accent-hover'),
                        'accent-active': c('--accent-active'),
                        secondary: c('--secondary'),
                        'secondary-hover': c('--secondary-hover'),
                        'secondary-active': c('--secondary-active'),
                    },
                },
                textColor: {
                    theme: {
                        base: c('--text-base'),
                        light: c('--text-light'),
                        lighter: c('--text-lighter'),
                        lightest: c('--text-lightest'),
                    },
                },
                backgroundColor: {
                    theme: {
                        page: c('--bg-page'),
                        card: c('--bg-card'),
                    },
                },
                borderColor: {
                    theme: {
                        base: c('--bd-base'),
                        card: c('--bg-card'),
                    },
                },
                ringOffsetColor: {
                    theme: {
                        page: c('--bg-page'),
                    },
                },
            },
        },
    }
);
