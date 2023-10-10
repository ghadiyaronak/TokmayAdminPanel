import { Text } from "@chakra-ui/react";

interface MainHeadingProps {
    title: string;
}

const MainHeading = ({ title }: MainHeadingProps) => {
    return (
        <Text as="h1" fontWeight={"bold"} lineHeight="full" textAlign={"left"} fontSize={"2xl"} pt={"4"}>
            {title}
        </Text>
    );
};

export default MainHeading;
