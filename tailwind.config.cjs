/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./src/**/*.{astro,html,js,jsx,ts,tsx}'],
	theme: {
		extend: {
		  padding: {
			"1/2": "50%",
			full: "100%",
		  },
		},
	  },
	  extend: {
		colors: {
		  ni: {
			panel: {
			  100: "#FFFFFF",
			  200: "#fbfbfb",
			  300: "#E2E2E2",
			  400: "#CFD8DC",
			},
			legend: {
			  "light-blue": "#E0EDF3",
			},
			brand: {
			  "light-blue": "#EEFAFF",
			  blue: "#03a9f4",
			},
		  },
		  primary: {
			100: "#91C4D7",
			200: "#65ACC8",
			300: "#4FA0C0",
			400: "#4091B1",
			500: "#387F9B",
			600: "#306D85",
			700: "#285B6F",
			800: "#204959",
			900: "#183642",
		  },
		},
	  },
	  plugins: [],
}
