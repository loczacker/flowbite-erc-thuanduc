import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './resources/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './resources/js/pages/**/*.{js,ts,jsx,tsx}',
    './node_modules/@shadcn/ui/dist/**/*.js'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};  

export default config;
