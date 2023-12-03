"use client";
import PersonModal from "@app/_components/UserModal";
import CustomTable from "@app/_components/Table";
import { User } from "@app/_types/user";
import { GENDER, Gender } from "@lib/web3/types";
import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useState } from "react";
import "./styles.scss";
import { useGetAllUserQuery } from "../../../../../_stores/admin/persons/api";
export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>();
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
          <Button
            onClick={() => {
              setSelectedRecord(record);
              setOpenModal(true);
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const fakeData = [
    {
      name: "123",
      age: "456",
      gender: Gender.Female.toString(),
      score: 100,
      dateOfBirth: dayjs(),
      tokenId: "3",
    },
  ];

  return (
    <div className="person-page">
      <div className="header">
        <Button
          onClick={() => {
            setSelectedRecord(undefined);
            setOpenModal(true);
          }}
        >
          Add new
        </Button>
      </div>
      <div className="body">
        <CustomTable loading={false} dataSource={data?.data || fakeData} columns={columns} />
      </div>
      <PersonModal
        data={selectedRecord}
        onCreatedSuccess={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        title={selectedRecord ? "Edit User" : "Add User"}
        open={openModal}
      />
    </div>
  );
}
