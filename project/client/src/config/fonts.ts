import localFont from "next/font/local";

export const fontSans = localFont({
    src: "../../public/fonts/Inter-VariableFont_slnt_wght.ttf",
    variable: "--font-sans",
})

export const fontMono = localFont({
    src: "../../public/fonts/FiraCode-VariableFont_wght.ttf",
    variable: "--font-mono",
})
