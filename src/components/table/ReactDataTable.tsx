import { Text } from "@chakra-ui/react";
import DataTable from "react-data-table-component";
import { useTranslation } from "react-i18next";
import MainLoader from "../loader/MainLoader";
import "./rdtc.scss";
interface IProps {
    column: any[];
    data: any[];
    progressPending?: boolean;
    onSelectedRowsChange?: any;
    isSelector?: boolean;
    page?: number;
    handleSubmit?: any;
}

const ReactDataTableComponent = ({
    column,
    data,
    handleSubmit,
    progressPending,
    onSelectedRowsChange,
    isSelector,
    page
}: IProps) => {
    const { t } = useTranslation();

    const paginationComponentOptions = {
        rowsPerPageText: t("rows_per_page")
    };

    return (
        <DataTable
            columns={column}
            data={data}
            pagination
            paginationPerPage={page ? page : 10}
            paginationRowsPerPageOptions={[10, 50, 100, 200, 300, 500]}
            persistTableHead
            responsive
            selectableRows={isSelector ? isSelector : false}
            dense
            onSelectedRowsChange={onSelectedRowsChange}
            progressComponent={<MainLoader />}
            progressPending={progressPending}
            onRowClicked={handleSubmit}
            selectableRowsHighlight
            highlightOnHover
            paginationComponentOptions={paginationComponentOptions}
            noDataComponent={<Text my={4}>{t("there_are_no_records_to_display")}</Text>}
        />
    );
};
export default ReactDataTableComponent;
