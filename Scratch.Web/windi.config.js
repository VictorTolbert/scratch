import { defineConfig } from 'windicss/helpers';
// import { colors as hancockColors } from './public/tokens'

// import colors from 'windicss/colors';
import plugin from 'windicss/plugin';
import { colors } from './public/tokens';

const typography = require('windicss/plugin/typography')({
  modifiers: ['DEFAULT', 'sm', 'lg', 'red'],
});
const filters = require('windicss/plugin/filters');
const forms = require('windicss/plugin/forms');
const aspectRatio = require('windicss/plugin/aspect-ratio');
const lineClamp = require('windicss/plugin/line-clamp');

export default defineConfig({
    // preflight: false,
    extract: {
        include: [
            'src/**/*.{vue,jsx,tsx,svelte}',
            'shared/**/*.{vue,ts}',
        ],
    },
    safelist: ['prose', 'prose-sm', 'm-auto'],
    darkMode: 'class',
    plugins: [
        typography,
        filters,
        forms,
        aspectRatio,
        lineClamp,
        plugin(({ addUtilities }) => {
            const newUtilities = {
                '.skew-10deg': {
                    transform: 'skewY(-10deg)',
                },
                '.skew-15deg': {
                    transform: 'skewY(-15deg)',
                },
            }
            addUtilities(newUtilities)
        }),
        plugin(({ addComponents }) => {
            const buttons = {
                '.btn': {
                    padding: '.5rem 1rem',
                    borderRadius: '.25rem',
                    fontWeight: '600',
                },

                '.btn-blue': {
                    'backgroundColor': '#3490dc',
                    'color': '#fff',
                    '&:hover': {
                        backgroundColor: '#2779bd',
                    },
                },

                '.btn-red': {
                    'backgroundColor': '#e3342f',
                    'color': '#fff',
                    '&:hover': {
                        backgroundColor: '#cc1f1a',
                    },
                },
            }
            addComponents(buttons)
        }),
        plugin(({ addDynamic, variants }) => {
            addDynamic('skew', ({ Utility, Style }) => {
                return Utility.handler
                    .handleStatic(Style('skew'))
                    .handleNumber(0, 360, 'int', number => `skewY(-${number}deg)`)
                    .createProperty('transform')
            }, variants('skew'))
        }),
    ],
    theme: {
        extend: {
            colors: {
                primary: colors['torea-bay'],
            },
        }
    },
});
