import { useFormik } from "formik";
import React, { useCallback, useMemo } from "react";
import { View, Button } from "react-native";
import { useI18n } from "i18n/i18n";
import tailwind from "tailwind-rn";
import * as Yup from "yup";
import CustomTextInput from "components/CustomTextInput";

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*#?&]{8,}$/;

export type SignUpFormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

export type SignUpFormProps = {
  onSubmit: (values: SignUpFormValues) => void;
};

export default function SignUpForm(props: SignUpFormProps) {
  const { onSubmit } = props;

  const { t } = useI18n();
  const signUpValidationSchema = useMemo(
    () =>
      Yup.object({
        email: Yup.string()
          .email("Must be a valid email")
          .required(t("fieldRequired")),
        password: Yup.string()
          .matches(
            PASSWORD_REGEX,
            "A password must have at least 8 characters, including one uppercase letter, one lowercase letter and one digit"
          )
          .required(t("fieldRequired")),
        repeatPassword: Yup.string()
          .when("password", (password, schema) =>
            schema.oneOf([password], "Passwords don't match")
          )
          .required(t("fieldRequired")),
      }),
    [t]
  );

  const {
    errors,
    touched,
    handleChange,
    handleSubmit,
    values,
  } = useFormik<SignUpFormValues>({
    initialValues: { email: "", password: "", repeatPassword: "" },
    onSubmit,
    validationSchema: signUpValidationSchema,
  });

  const typeSafeHandleSubmit = useCallback(() => handleSubmit(), [
    handleSubmit,
  ]);

  return (
    <View style={tailwind("w-full flex-row")}>
      <View style={tailwind("flex-1 flex items-start")}>
        <CustomTextInput
          errorCaption={touched.email && errors.email}
          label={t("email")}
          onChangeText={handleChange("email")}
          value={values.email}
        />

        <CustomTextInput
          errorCaption={touched.password && errors.password}
          label="Password"
          onChangeText={handleChange("password")}
          secureTextEntry
          value={values.password}
        />

        <CustomTextInput
          errorCaption={touched.repeatPassword && errors.repeatPassword}
          label="Repeat password"
          onChangeText={handleChange("repeatPassword")}
          secureTextEntry
          value={values.repeatPassword}
        />

        <Button onPress={typeSafeHandleSubmit} title="Submit" />
      </View>
    </View>
  );
}
