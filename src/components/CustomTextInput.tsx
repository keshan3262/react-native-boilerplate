import classNames from "clsx";
import React, { useRef } from "react";
import {
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
  View,
} from "react-native";
import tailwind from "tailwind-rn";

type NarrowedStyle = Record<string, string | number>;

export type CustomTextInputProps = TextInputProps & {
  extraInner?: React.ReactNode;
  extraSection?: React.ReactNode;
  label?: React.ReactNode;
  labelDescription?: React.ReactNode;
  errorCaption?: React.ReactNode;
  containerTailwindClassName?: string;
  containerStyle?: NarrowedStyle;
  fieldWrapperBottomMargin?: boolean;
  labelPaddingTailwindClass?: string;
  onChange?: (e: NativeSyntheticEvent<TextInputChangeEventData>) => void;
  tailwindClassName?: string;
};

const CustomTextInput = React.forwardRef<TextInput, CustomTextInputProps>(
  (props, ref) => {
    const {
      extraInner,
      extraSection,
      label,
      labelDescription,
      errorCaption,
      containerTailwindClassName,
      containerStyle,
      multiline,
      value,
      defaultValue,
      onChange,
      onFocus,
      onBlur,
      tailwindClassName,
      style,
      spellCheck = false,
      fieldWrapperBottomMargin = true,
      labelPaddingTailwindClass = "mb-4",
      ...rest
    } = props;

    const rootRef = useRef<View>();

    const [localValue, setLocalValue] = React.useState(
      value ?? defaultValue ?? ""
    );
    const [focused, setFocused] = React.useState(false);

    const handleChange = React.useCallback(
      (evt) => {
        if (onChange) {
          onChange(evt);
          if (evt.defaultPrevented) {
            return;
          }
        }

        setLocalValue(evt.target.value);
      },
      [onChange, setLocalValue]
    );

    const handleFocus = React.useCallback(
      (evt) => {
        if (onFocus) {
          onFocus(evt);
          if (evt.defaultPrevented) {
            return;
          }
        }

        setFocused(true);
      },
      [onFocus, setFocused]
    );

    const handleBlur = React.useCallback(
      (evt) => {
        if (onBlur) {
          onBlur(evt);
          if (evt.defaultPrevented) {
            return;
          }
        }

        setFocused(false);
      },
      [onBlur, setFocused]
    );

    return (
      <View
        ref={rootRef}
        style={[
          tailwind(
            classNames("w-full flex flex-col", containerTailwindClassName)
          ),
          containerStyle,
        ]}
      >
        {label ? (
          <View
            style={tailwind(
              classNames(labelPaddingTailwindClass, "leading-5 flex flex-col")
            )}
          >
            <Text style={tailwind("text-base font-semibold text-gray-700")}>
              {label}
            </Text>

            {labelDescription && (
              <Text
                style={[
                  stylesheet.labelDescription,
                  tailwind(
                    classNames(
                      labelPaddingTailwindClass,
                      "leading-5 flex flex-col"
                    )
                  ),
                ]}
              >
                {labelDescription}
              </Text>
            )}
          </View>
        ) : null}

        {extraSection}

        <View
          style={tailwind(
            classNames(
              "relative",
              fieldWrapperBottomMargin && "mb-2",
              "flex items-stretch"
            )
          )}
        >
          <TextInput
            {...rest}
            ref={ref}
            style={[
              tailwind(
                classNames(
                  "w-full py-3 pl-4",
                  extraInner ? "pr-20" : "pr-4",
                  "bg-gray-100 rounded-md text-gray-700 text-lg leading-5",
                  tailwindClassName
                )
              ),
              style,
            ]}
            value={value}
            defaultValue={defaultValue}
            spellCheck={spellCheck}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />

          {extraInner && (
            <View
              style={tailwind(
                classNames(
                  "overflow-hidden absolute inset-y-0 right-0 w-20",
                  "flex items-center justify-end opacity-50"
                )
              )}
            >
              <Text style={tailwind("mx-4 text-lg font-light text-gray-900")}>
                {extraInner}
              </Text>
            </View>
          )}
        </View>

        {errorCaption ? (
          <Text style={tailwind("text-xs text-red-500")}>{errorCaption}</Text>
        ) : null}
      </View>
    );
  }
);

export default CustomTextInput;

const stylesheet = StyleSheet.create({
  labelDescription: {
    maxWidth: "90%",
  },
});
