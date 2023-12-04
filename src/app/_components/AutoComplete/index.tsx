import { AutoComplete, AutoCompleteProps, Input, InputProps, Select } from "antd";
import React from "react";
import { useGetAllOrganizationQuery, useGetAllUserQuery } from "@app/_stores/admin/persons/api";

export interface IAutoComplete extends AutoCompleteProps {
  inputProps?: InputProps;
  onSelect?: (val: string) => void;
}

const VoteeAutoComplete: React.FC<IAutoComplete> = ({
  className,
  popupClassName,
  inputProps,
  value,
  onSelect,
}) => {
  const { data, isLoading } = useGetAllOrganizationQuery({});
  return (
    <Select
      defaultValue={value}
      onChange={(data) => {
        console.log(data);
        onSelect && onSelect(data);
      }}
    >
      {(data?.data || []).map((item: any) => {
        return (
          <Select.Option key={item.tokenId} value={item.tokenId}>
            {item.name}
          </Select.Option>
        );
      })}
    </Select>
  );
};

export default VoteeAutoComplete;
