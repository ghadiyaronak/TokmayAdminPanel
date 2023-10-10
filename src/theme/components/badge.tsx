import { mode } from "@chakra-ui/theme-tools";
import { globalStyles } from "../styles";
export const badgeStyles = {
    components: {
        Badge: {
            baseStyle: {
                borderRadius: "24",
                // bgColor: globalStyles.colors.button.bgSuccess,
                color: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: "0",
                size: "md",
                width: "28",
                boxSizing: "border-box",
                fontWeight: "300"
            },
            variants: {
                success: (props: any) => ({
                    // bgColor: globalStyles.colors.button.bgSuccess,
                    border: "1px solid ",
                    color: globalStyles.colors.button.success,
                    fontSize: "md",
                    rounded: "md",
                    h: "7"
                    // py: "2"
                }),
                blue: (props: any) => ({
                    // bgColor: globalStyles.colors.button.bgSuccess,
                    border: "1px solid ",
                    color: globalStyles.colors.mainColor,
                    fontSize: "md",
                    rounded: "md",
                    h: "7"
                    // py: "2"
                }),
                danger: (props: any) => ({
                    // bgColor: globalStyles.colors.button.dangerBg,
                    border: "1px solid ",
                    color: globalStyles.colors.button.danger,
                    fontSize: "sm",
                    fontWeight: "500",
                    rounded: "md",
                    textalign: "center",
                    h: "7"
                }),
                lightGray2: (props: any) => ({
                    // bgColor: globalStyles.colors.button.dangerBg,
                    border: "1px solid ",
                    color: globalStyles.colors.button.lightGray,
                    fontSize: "sm",
                    fontWeight: "500",
                    rounded: "md",
                    textalign: "center",
                    h: "7"
                }),
                lightGray: (props: any) => ({
                    bgColor: globalStyles.colors.button.lightGray,
                    fontSize: "md",
                    h: "9",
                    py: "2"
                }),
                primary: (props: any) => ({
                    bgColor: globalStyles.colors.button.primary,
                    fontSize: "md",
                    h: "9",
                    py: "2"
                }),
                darkBlue: (props: any) => ({
                    bgColor: globalStyles.colors.button.darkBlue,
                    fontSize: "md",
                    h: "9",
                    py: "2"
                }),
                lightRed: (props: any) => ({
                    bgColor: globalStyles.colors.button.lightRed,
                    fontSize: "md",
                    h: "9",
                    py: "2"
                }),
                darkBlack: (props: any) => ({
                    border: "1px solid ",
                    color: globalStyles.colors.button.darkBlack,
                    fontSize: "md",
                    rounded: "md",
                    h: "7"
                    // bgColor: globalStyles.colors.button.darkBlack,
                    // fontSize: "md",
                    // rounded: "md",
                    // h: "9",
                    // py: "2"
                })
            }
        }
    }
};
