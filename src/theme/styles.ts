import { mode } from "@chakra-ui/theme-tools";
export const globalStyles = {
    colors: {
        lightGreen: "#417937",
        darkGreen: "#258673",
        mainColor: "#4299e1",

        button: {
            bgSuccess: "#b8e4cc",
            danger: "#EE5C50",
            success: "#01B573",
            dangerBg: "#ffcfd2",
            lightGray: "#A3A3A3",
            primary: "#4299E1",
            darkBlack: "#323232",
            darkBlue: "#082785",
            lightRed: "#f58569"
        },

        common: {
            rowPink: "#FFDEDE",
            white: "#FFFFFF",
            black: "#000000",
            success: "#01B573",

            lightBlue: "#62C2C2",

            yellow: "#E8C666",
            lightYellow: "#F0D467",

            gray: "#707070",
            lightGray: "#8C96AB",
            lightGray2: "#E6E6E5",
            textGray: "#9FA0A0",

            lightOrange: "#f09495",
            skyblue: "#2FC6BD",

            lightblack: "#F9FAFA",
            lightcyan: "#E6F2F2",

            green: "#63B230",
            blue: "#00A0E9"
        },
        brand: {
            100: "#E9E3FF",
            200: "#422AFB",
            300: "#422AFB",
            400: "#7551FF",
            500: "#422AFB",
            600: "#3311DB",
            700: "#02044A",
            800: "#190793",
            900: "#11047A"
        },
        brandScheme: {
            100: "#E9E3FF",
            200: "#7551FF",
            300: "#7551FF",
            400: "#7551FF",
            500: "#422AFB",
            600: "#3311DB",
            700: "#02044A",
            800: "#190793",
            900: "#02044A"
        },
        brandTabs: {
            100: "#E9E3FF",
            200: "#422AFB",
            300: "#422AFB",
            400: "#422AFB",
            500: "#422AFB",
            600: "#3311DB",
            700: "#02044A",
            800: "#190793",
            900: "#02044A"
        },
        secondaryGray: {
            100: "#E0E5F2",
            200: "#E1E9F8",
            300: "#F4F7FE",
            400: "#E9EDF7",
            500: "#8F9BBA",
            600: "#A3AED0",
            700: "#707EAE",
            800: "#707EAE",
            900: "#1B2559"
        },
        red: {
            100: "#FEEFEE",
            500: "#EE5D50",
            600: "#E31A1A"
        },
        blue: {
            50: "#EFF4FB",
            500: "#3965FF"
        },
        orange: {
            100: "#FFF6DA",
            500: "#FFB547"
        },
        green: {
            100: "#E6FAF5",
            500: "#01B574"
        },
        navy: {
            50: "#d0dcfb",
            100: "#aac0fe",
            200: "#a3b9f8",
            300: "#728fea",
            400: "#3652ba",
            500: "#1b3bbb",
            600: "#24388a",
            700: "#1B254B",
            800: "#111c44",
            900: "#0b1437"
        },
        gray: {
            100: "#FAFCFE"
        },
        carousel: {
            white: "#fff",
            orange: "#fd7f23"
        },
        text: {
            green: "#226522",
            black: "#000000",
            brown: "#4D1F03",
            lightOrange: "#FF8001",
            green2: "#809C16",
            lightGreen: "#42938B",
            darkYellow: "#A78339",
            orange: "#FD803F",
            red: "#FD1A16",
            blue: "#2E58A6",
            red2: "#FF0001",
            green3: "#237D26",
            gray: "#b0bec5",
            orange2: "#e85939"
        },
        border: {
            green: "#E0E0E0",
            lightGray: "#eaeaea",
            gray: "#d7dee2",
            black: "#607d8b"
        },
        background: {
            red: "#FF0001",
            brown: "#A0642F",
            lightGreen: "#DFE384",
            yellow: "#FFDE01",
            green: "#258673",
            gray: "#B3B3B3",
            blue: "#0580B7",
            lightGreen2: "#809C16",
            lightGray: "#999",
            pink: "#ff7373",
            offwhite: "#efefef"
        },
        btn: {
            lightPink: "#DE7CA7",
            lightGray: "#00000052",
            orange: "#fd7f23",
            red: "#E85939",
            gray: "#eff2f3",
            blue: "#2169f3",
            success: "#01B573"
        },
        footer: {
            brown: "#484848"
        }
    },
    styles: {
        global: (props: any) => ({
            body: {
                overflowX: "hidden",
                bg: "#f7f8f8",
                color: "#000000",
                fontFamily: `"Inter", sans-serif`,
                "&::-webkit-scrollbar": {
                    width: "4px"
                },
                "&::-webkit-scrollbar-track": {
                    width: "6px"
                },
                "&::-webkit-scrollbar-thumb": {
                    background: "#95a5a6",
                    borderRadius: "24px"
                }
            }
        })
    }
};
