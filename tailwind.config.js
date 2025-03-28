// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       width: {
//         'custom': '350px', 
//         'xl': '48rem',     // Adds a class w-xl for 48rem
//       },
//     },
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBg: '#477082', // Adds a class bg-customBg for this color
      },
      width: {
        'custom': '350px', 
        'xl': '46rem',     // Adds a class w-xl for 48rem
      },
    },
  },
  plugins: [],
}
