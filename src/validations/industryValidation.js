import * as Yup from "yup";

export const AddProfessionSchema = (t) => Yup.object().shape({
    name: Yup.string()
        .required("メールアドレス必須"),
    status: Yup.boolean()
        .required("メールアドレス必須")
});