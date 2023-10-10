export type UserProps = {
    createdAt: string;
    email: string;
    status: boolean;
    _id: string;
    nickName?: string;
    message?: string;
};

export const USER_STATUS = (t: any) => {
    return [
        // { label: t("contract.all"), value: "" },
        { label: t("アクティブ"), value: "ACTIVE" },
        {
            label: t("ブロック"),
            value: "BLOCKED"
        }
    ];
};

export const USER_ROLE = (t: any) => {
    return [
        // { label: t("contract.all"), value: "" },
        { label: t("クライアント"), value: "SERVICE_RECEIVER" },
        {
            label: t("カウンセラー"),
            value: "SERVICE_PROVIDER"
        }
    ];
};

export const USER_GENDER = (t: any) => {
    return [
        // { label: t("contract.all"), value: "" },
        { label: t("common.male"), value: "MALE" },
        {
            label: t("common.female"),
            value: "FEMALE"
        }
    ];
};
