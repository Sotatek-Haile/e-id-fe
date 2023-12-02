import { AutoCompleteProps, Form, Input } from "antd";
import { FormInstance } from "antd/es/form";
import { FormItemProps } from "antd/lib/form";
import { InputProps } from "antd/lib/input";
import React, { useMemo, useRef } from "react";
import { TextAreaProps } from "antd/es/input";
interface Props extends FormItemProps<any> {
  form?: FormInstance<any>;
  regexOnChange?: RegExp;
  isRequired?: boolean;
  inputProps?: InputProps;
  autocompleteProps?: AutoCompleteProps;
  inputRefValue?: string;
  textAreaProps?: TextAreaProps;
}

const CustomFormItem: React.FC<Props> = ({
  form,
  regexOnChange,
  children,
  label,
  isRequired,
  inputProps,
  textAreaProps,
  autocompleteProps,
  inputRefValue = "",
  ...props
}) => {
  const inputRef = useRef(inputRefValue);
  const { name } = props;

  const renderChildren = useMemo(() => {
    const handleCheckValue = (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (regexOnChange) {
        if (regexOnChange?.test(value)) {
          inputRef.current = value;
          form?.setFieldValue(name ?? "", value);
        } else {
          if (value === "") {
            inputRef.current = value;
            form?.setFieldValue(name ?? "", value);
            return;
          }
          if (value.length === 1) inputRef.current = "";
          form?.setFieldValue(name ?? "", inputRef.current);
        }
      }
    };

    if (children) {
      return children;
    }

    if (textAreaProps) {
      return (
        <Input.TextArea
          className="input-message"
          placeholder="Would you like to send a message with this offer?"
          autoSize={{ minRows: 5, maxRows: 5 }}
          onChange={handleCheckValue as any}
          {...textAreaProps}
        />
      );
    }

    return <Input {...inputProps} onChange={handleCheckValue} />;
  }, [children, textAreaProps, inputProps, regexOnChange, form, name]);

  return (
    <Form.Item
      className="form-item"
      label={
        label ? (
          <p className="title">
            {label} {isRequired ? <span>*</span> : ""}
          </p>
        ) : undefined
      }
      {...props}
    >
      {renderChildren}
    </Form.Item>
  );
};

export default CustomFormItem;
