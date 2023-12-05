"use client";
import MilestoneModal from "@app/_components/Milestone";
import CustomTable from "@app/_components/Table";
import {
  useGetMilesStoneQuery,
  useRemoveMilestoneMutation
} from "@app/_stores/admin/persons/api";
import { User } from "@app/_types/user";
import { Button, Space, message } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useState } from "react";
import "./styles.scss";

export default function MileStone() {
  const [openModal, setOpenModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>();
  const { data, isLoading } = useGetMilesStoneQuery({});
  const [remove] = useRemoveMilestoneMutation({});
  const [loadingId, setLoadingId] = useState("");

  const columns: ColumnsType<User> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Score",
      dataIndex: "score",
      key: "score",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (text) => <div>{dayjs(text).format("DD/MM/YYYY")}</div>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record: any) => (
        <Space size="middle">
          <Button
            loading={record._id === loadingId}
            onClick={async () => {
              try {
                console.log("record", record._id);
                setLoadingId(record._id);
                await remove({
                  id: record._id,
                }).unwrap();
                message.success("Remove milestone successfully");
              } catch (error) {
                message.error("Failed to remove milestone");
              }
              setLoadingId("");
            }}
          >
            Remove
          </Button>
        </Space>
      ),
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
        <CustomTable loading={isLoading} dataSource={data?.data || []} columns={columns} />
      </div>
      <MilestoneModal
        data={selectedRecord}
        onCreatedSuccess={() => setOpenModal(false)}
        onCancel={() => setOpenModal(false)}
        title={selectedRecord ? "Edit User" : "Add User"}
        open={openModal}
      />
    </div>
  );
}
