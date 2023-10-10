export type ProfessionProps = {
    professionStatus: boolean;
    _id: string;
    professionName?: string;
    selectedData?: string;
};

export const PROFESSION_STATUS = (t: any) => {
    return [
        // { label: t("contract.all"), value: "" },
        { label: t("common.ACTIVE"), value: "true" },
        {
            label: t("common.BLOCKED"),
            value: "false"
        }
    ];
};
