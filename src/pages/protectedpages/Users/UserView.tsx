import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import CustomCard from "../../../components/card/CustomCard";
import UserViewcard from "../../../components/card/UserViewcard";
import { globalStyles } from "../../../components/theme/styles";

const tabs = ["one", "two"];
const UserView = () => {
    return (
        <>
            <Box mt={5} width={"full"}>
                <Tabs width={"full"} isFitted variant="enclosed">
                    <TabList>
                        {tabs.map((tab: any, index: number) => {
                            return (
                                <Tab
                                    key={index}
                                    fontSize={{ base: "xs", md: "sm", lg: "md" }}
                                    _selected={{
                                        background: globalStyles.colors.mainColor,
                                        color: "gray.100"
                                    }}
                                >
                                    {tab}
                                </Tab>
                            );
                        })}
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <UserViewcard />
                        </TabPanel>
                        <TabPanel>
                            <CustomCard />
                        </TabPanel>
                    </TabPanels>
                </Tabs>
            </Box>
        </>
    );
};

export default UserView;
