import { border, Box, Flex } from "@chakra-ui/react";
import ReactDatePicker from "react-datepicker";
import { useTranslation } from "react-i18next";
import SmallFormLabel from "../customInput/SmallFormLabel";

interface DateSelectProps {
    label: string;
    startDate: any;
    endDate: any;
    setStartDate: any;
    setEndDate: any;
    selected?: any;
    dates?: any;
    setFieldValue?: any;
    name?: string;
}

const DateSelect = ({
    label,
    startDate,
    endDate,
    setStartDate,
    setEndDate,
    selected,
    dates,
    setFieldValue,
    name
}: DateSelectProps) => {
    const { t } = useTranslation();
    return (
        <Flex flex={1} fontSize={"sm"} alignItems={{ base: "flex-start", md: "center" }}>
            <SmallFormLabel title={label} />
            <ReactDatePicker
                dateFormat="yyyy/MM/dd"
                wrapperClassName="dateSelectPicker"
                selected={startDate}
                // placeholderText={label}
                onChange={(dates: any) => {
                    const [start, end] = dates;
                    setStartDate(start);
                    setEndDate(end);
                    setFieldValue && setFieldValue(name, true);
                }}
                startDate={startDate}
                endDate={endDate}
                selectsRange
                className="custom"
                popperClassName="popper-class"
                popperPlacement="bottom-start"
                todayButton={t("common.today")}
                showPopperArrow={false}
                // maxDate={new Date()}
                locale={"ja"}
                popperModifiers={[
                    {
                        name: "offset",
                        options: {
                            offset: [0, 0]
                        }
                    },
                    {
                        name: "preventOverflow",
                        options: {
                            rootBoundary: "viewport",
                            tether: false,
                            altAxis: true
                        }
                    }
                ]}
            />
        </Flex>
    );
};

export default DateSelect;
