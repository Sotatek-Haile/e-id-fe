"use client";
import CreatePersonModal from "@app/_components/Modal";
import CustomTable from "@app/_components/Table";
import { User } from "@app/_types/user";
import { Gender } from "@lib/web3/types";
import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useState } from "react";
import "./styles.scss";
import { useGetAllUserQuery } from "../../../../../_stores/admin/persons/api";
export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const { data, isLoading } = useGetAllUserQuery({});

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
      render: (_, { gender }) => {
        const genderText = gender === Gender.Female ? "Female" : "Male";
        let color = "blue";
        if (genderText === "Male") {
          color = "red";
        }
        return <Tag color={color}>{genderText}</Tag>;
      },
    },
    {
      title: "Score",
      key: "score",
      dataIndex: "score",
      render: (_, { score }) => {
        let color = "green";
        return <Tag color={color}>{score}</Tag>;
      },
    },
    {
      title: "DOB",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      render: (_, { dateOfBirth }) => {
        let color = "pink";
        return <Tag color={color}>{dayjs(dateOfBirth).format("MM/DD/YYYY")}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <a>Edit</a>
        </Space>
      ),
    },
  ];

  return (
    <div className="person-page">
      <div className="header">
        <Button onClick={() => setOpenModal(true)}>Add new</Button>
      </div>
      <div className="body">
        <CustomTable loading={isLoading} dataSource={data?.data || []} columns={columns} />
      </div>
      <CreatePersonModal
        onCreatedSuccess={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        title={"Add Person"}
        open={openModal}
      ></CreatePersonModal>
    </div>
  );
}
