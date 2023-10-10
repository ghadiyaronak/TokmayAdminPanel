export type SettingProps = {
    email: string;
    matching: string;
    data: string;
    _id: string;
};

export const MATCHING_ROLE = [
    { label: "新規登録者", value: "新規登録者" },
    {
        label: "マッチングが少ない",
        value: "マッチングが少ない"
    },
    {
        label: "４０代以上",
        value: "４０代以上"
    }
];
