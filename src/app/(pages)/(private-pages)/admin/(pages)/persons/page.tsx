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
import UpdateScoreModal from "@app/_components/UpdateScoreModal";
import { ellipseAddress } from "@helpers";
export default function Page() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>();
  const { data, isLoading } = useGetAllUserQuery({});
  const [openScoreModal, setOpenScoreModal] = useState(false);
  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Wallet address",
      dataIndex: "ownerAddress",
      key: "ownerAddress",
      render: (text) => (
        <a target="__blank" href={"https://mumbai.polygonscan.com/address/" + text}>
          {ellipseAddress(text)}
        </a>
      ),
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
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Organization",
      dataIndex: "organization",
      key: "organization",
      render: (item: any) => <div>{item?.name}</div>,
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
          <Button
            onClick={() => {
              setSelectedRecord(record);
              setOpenScoreModal(true);
            }}
          >
            Update Score
          </Button>
        </Space>
      ),
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
        <CustomTable loading={isLoading} dataSource={data?.data || []} columns={columns} />
      </div>
      {openModal && (
        <PersonModal
          data={selectedRecord}
          onCreatedSuccess={() => setOpenModal(false)}
          onCancel={() => setOpenModal(false)}
          title={selectedRecord ? "Edit User" : "Add User"}
          open={openModal}
        />
      )}
      <UpdateScoreModal
        data={selectedRecord}
        onCreatedSuccess={() => setOpenScoreModal(false)}
        onCancel={() => setOpenScoreModal(false)}
        title={selectedRecord ? "Edit User" : "Add User"}
        open={openScoreModal}
      />
    </div>
  );
}
