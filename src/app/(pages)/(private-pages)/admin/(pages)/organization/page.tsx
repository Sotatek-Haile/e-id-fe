"use client";
import OrganizationModal from "@app/_components/OrganizationModal";
import CustomTable from "@app/_components/Table";
import { User } from "@app/_types/user";
import { Button, Space, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import "./styles.scss";

export default function Organization() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>();
  // const { data, isLoading } = useGetAllUserQuery({});

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Tax",
      dataIndex: "tax",
      key: "tax",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
      name: "Sotatek",
      tax: "123456",
      tokenId: "1",
    },
  ];

  return (
    <div className="organization-page">
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
        <CustomTable loading={false} dataSource={fakeData} columns={columns} />
      </div>
      <OrganizationModal
        data={selectedRecord}
        onCreatedSuccess={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        title={selectedRecord ? "Edit User" : "Add User"}
        open={openModal}
      />
    </div>
  );
}
