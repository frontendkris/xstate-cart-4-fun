import type {Config} from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  plugins: [require("@tailwindcss/forms"), require("daisyui")],
  theme: {
    container: {
      center: true,
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
};
export default config;
