import * as Yup from "yup";

export const AddAdminSchema = (t) => Yup.object().shape({
    email: Yup.string()
        .matches(
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            t("form_errors.invalid_email")
        )
        .max(255)
        .required("メールアドレス必須"),

    // freeMatch: yup
    //     .number()
    //     .min(1, t("messages.enter_priority_between_1_to_100"))
    //     .max(100, t("messages.enter_priority_between_1_to_100"))
    //     .required(t("form_errors.required_fields"))

});