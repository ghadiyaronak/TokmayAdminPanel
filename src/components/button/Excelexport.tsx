import { Tooltip, Button, useToast } from "@chakra-ui/react";
import { useTranslation } from "react-i18next";
import { globalStyles } from "../../theme/styles";
import { DownloadIcon } from "@chakra-ui/icons";
import dayjs from "dayjs";
import * as FileServe from "file-saver";
import * as XLSX from "xlsx";

interface ExportBtnProps {
    fileName?: string;
    getExcelData?: any;
}

const ExportExcel = ({ fileName, getExcelData }: ExportBtnProps) => {
    const { t } = useTranslation();
    const toast = useToast();
    const today = new Date();
    const date = new Date(today.getFullYear(), today.getMonth(), 1);
    const formatedDate = dayjs(date).format("YYYY/MM/DD");
    const fileType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset-UTF-8";
    const fileExtension = ".xlsx";

    const exportToExcel = async () => {
        let excelData = await getExcelData();

        if (excelData.length === 0) {
            return toast({
                title: "no data found",
                status: "error",
                variant: "solid",
                duration: 2000,
                position: "top-right",
                isClosable: true
            });
        }
        const ws = XLSX.utils.json_to_sheet(excelData);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileServe.saveAs(data, fileName + "-" + formatedDate + fileExtension);
    };

    return (
        <Button
            leftIcon={<DownloadIcon />}
            bgColor={globalStyles.colors.mainColor}
            color={"white"}
            size={"sm"}
            rounded={"md"}
            w={"30"}
            _hover={{
                bgColor: globalStyles.colors.mainColor,
                opacity: 0.8
            }}
            onClick={() => exportToExcel()}
        >
            {t("エクスポート")}
        </Button>
    );
};

export default ExportExcel;
