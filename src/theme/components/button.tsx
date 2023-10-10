import { mode } from "@chakra-ui/theme-tools";
import { globalStyles } from "../styles";
export const buttonStyles = {
    components: {
        Button: {
            baseStyle: {
                borderRadius: "24",
                bgColor: globalStyles.colors.button.success,
                color: "white",

                width: "48",

                boxSizing: "border-box",
                fontWeight: "300"
            },
            variants: {
                success: (props: any) => ({
                    bgColor: globalStyles.colors.button.success,
                    fontSize: "xl",
                    h: "9"
                }),
                danger: (props: any) => ({
                    bgColor: globalStyles.colors.button.danger,
                    fontSize: "xl",
                    h: "9",
                    py: "2"
                }),
                lightGray: (props: any) => ({
                    bgColor: globalStyles.colors.button.lightGray,
                    fontSize: "xl",
                    h: "9",
                    py: "2"
                }),
                primary: (props: any) => ({
                    bgColor: globalStyles.colors.button.primary,
                    fontSize: "xl",
                    h: "9",
                    py: "2"
                }),
                darkBlack: (props: any) => ({
                    bgColor: globalStyles.colors.button.darkBlack,
                    fontSize: "xl",
                    h: "9"
                }),
                darkBlue: (props: any) => ({
                    bgColor: globalStyles.colors.button.darkBlack,
                    fontSize: "xl",
                    h: "9"
                }),
                addition: (props: any) => ({
                    bgColor: globalStyles.colors.button.primary,
                    fontSize: "20",
                    h: "12",
                    borderRadius: "14",
                    fontWeight: "bold",
                    w: "32"
                }),
                save: (props: any) => ({
                    bgColor: globalStyles.colors.button.primary,
                    fontSize: "xl",
                    h: "12",
                    w: "64",
                    fontWeight: "bold"

                    // py: "2"
                })
            }
        }
    }
};
