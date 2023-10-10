// export default CustomCard;
import { Box, useStyleConfig } from "@chakra-ui/react";

const CustomCard = ({ variant, children, ...rest }: any) => {
    const styles = useStyleConfig("Card", { variant });

    return (
        <Box __css={styles} {...rest} shadow="sm">
            {children}
        </Box>
    );
};

export default CustomCard;
