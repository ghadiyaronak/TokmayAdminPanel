import * as Yup from "yup";

// Inqury
export const LoginSchema = (t) =>
    Yup.object().shape({
        email: Yup.string().email(t("form_errors.invalid_email")).max(255).required(t("form_errors.required_email")),
        password: Yup.string()
            .min(8, "パスワードは8文字以上である必要があります")
            .max(255)
            .required(t("form_errors.required_password"))
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "パスワードの形式が無効です")
    });

export const ForgotPasswordSchema = (t) =>
    Yup.object().shape({
        email: Yup.string().email(t("form_errors.invalid_email")).max(255).required(t("form_errors.required_email"))
    });

export const SetProfileSchema = (t) =>
    Yup.object().shape({
        username: Yup.string().max(50).required(t("login.user_name_is_required")),
        password: Yup.string()
            .min(8, "パスワードは8文字以上である必要があります")
            .max(255)
            .required(t("login.password_is_required"))
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "パスワードの形式が無効です"),
        confirmPassword: Yup.string()
            .min(8, "パスワードは8文字以上である必要があります")
            .max(255)
            .required(t("login.confirm_password_is_required"))
            .oneOf([Yup.ref("password"), null], t("login.password_must_match"))
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "パスワードの形式が無効です")
    });

export const ResetPasswordSchema = (t) =>
    Yup.object().shape({
        password: Yup.string()
            .min(8, "パスワードは8文字以上である必要があります")
            .max(255)
            .required(t("login.password_is_required")),

        confirmPassword: Yup.string()
            .min(8, "パスワードは8文字以上である必要があります")
            .max(255)
            .required(t("login.confirm_password_is_required"))
            .oneOf([Yup.ref("password"), null], t("login.password_must_match"))

    });

export const ChangePasswordSchema = (t) =>
    Yup.object().shape({
        old_password: Yup.string()
            .min(8, "パスワードは8文字以上である必要があります")
            .max(255)
            .required("パスワード変更必要")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "パスワードの形式が無効です"),
        password: Yup.string()
            .min(8, "パスワードは8文字以上である必要があります")
            .max(255)
            .required("新しいパスワード必要")
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "パスワードの形式が無効です"),
        confirmPassword: Yup.string()
            .max(255)
            .required("パスワードを認証する必要")
            .oneOf([Yup.ref("password"), null], t("login.password_must_match"))
            .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "パスワードの形式が無効です")
    });

export const SetPasswordSchema = (t) =>
    Yup.object().shape({
        password: Yup.string()
            .min(8, "パスワードは8文字以上である必要があります")
            .max(255)
            .required("パスワード必要"),

        confirmPassword: Yup.string()
            .min(8, "パスワードは8文字以上である必要があります")
            .max(255)
            .required("パスワード(再入力)必要")
            .oneOf([Yup.ref("password"), null], "パスワード(再入力)必要")
        // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/, "パスワードの形式が無効です")
    });

export const ProfileSchema = (t) =>
    Yup.object().shape({
        userName: Yup.string().max(50).required("担当者名必要")
    });
