"use client";
import CustomTable from "@app/_components/Table";
import React, { useState } from "react";
import "./styles.scss";
import { Button, Form, Input } from "antd";
import CreatePersonModal from "@app/_components/Modal";
import { User } from "@lib/web3/types";
export default function Page() {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="person-page">
      <div className="header">
        <Button onClick={() => setOpenModal(true)}>Add new</Button>
      </div>
      <div className="body">
        <CustomTable />
      </div>
      <CreatePersonModal
        onCancel={() => setOpenModal(false)}
        title={"Add Person"}
        open={openModal}
      ></CreatePersonModal>
    </div>
  );
}
