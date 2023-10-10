export type AdminProps = {
    createdAt: string;
    email: string;
    status: boolean;
    _id: string;
    userName?: string;
};

export const MANAGER_STATUS = (t: any) => {
    return [
        // { label: t("contract.all"), value: "" },
        { label: t("common.ACTIVE"), value: "true" },
        {
            label: t("common.BLOCKED"),
            value: "false"
        }
    ];
};
