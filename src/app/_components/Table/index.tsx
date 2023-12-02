import { Table } from "antd";
import { TableProps } from "antd/lib";
import React from "react";

interface Props extends TableProps<any> {}

const CustomTable: React.FC<Props> = ({ ...props }: Props) => <Table {...props} />;

export default CustomTable;
