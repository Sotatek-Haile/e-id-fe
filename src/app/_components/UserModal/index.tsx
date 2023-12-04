import { User } from "@app/_types/user";
import { createNewPerson, editPerson } from "@lib/web3/contractInteract";
import { Gender } from "@lib/web3/types";
import { useWeb3React } from "@web3-react/core";
import { DatePicker, Form, Input, Modal, ModalProps, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import CustomFormItem from "../FormItem";
import "./styles.scss";
import { ethers } from "ethers";
import dayjs from "dayjs";
import VoteeAutoComplete from "../AutoComplete";
interface Props extends ModalProps {
  onCreatedSuccess: () => void;
  data?: User;
}
type FormData = {
  name: string;
  gender: Gender;
  age: number;
  score: number;
  walletAddress: string;
  id: string;
  bod: string;
  address: string;
  organization: string;
};

const CreateUserModal: React.FC<Props> = ({
  children,
  title,
  onCreatedSuccess,
  data,
  ...props
}) => {
  const { provider } = useWeb3React();
  const [loading, setLoading] = useState(false);

  const [form] = useForm();
  const handleCreateNewPerson = async (data: FormData) => {
    try {
      setLoading(true);
      if (!provider) {
        return;
      }
      const signer = provider.getSigner();
      const abi = [
        "string", // UID (cccd)
        "string", // bod
        "string", // user address
        "string", // company id
      ];
      const encodedData = ethers.utils.defaultAbiCoder.encode(abi, [
        data.id,
        dayjs(data.bod).toISOString(),
        data.address,
        data?.organization || "0x",
      ]);

      await createNewPerson({
        walletAddress: data.walletAddress,
        signer,
        user: {
          name: data.name,
          age: data.age,
          gender: data.gender,
          score: data.score,
          sensitiveInformation: encodedData,
        },
      });
      message.success("Create Successfully");
      onCreatedSuccess();
    } catch (e) {
      console.log(e);
      message.error("Fail to create user");
    }
    setLoading(false);
  };

  const handleEditPerson = async (editData: FormData) => {
    try {
      setLoading(true);
      if (!provider) {
        return;
      }
      const signer = provider.getSigner();
      const abi = [
        "string", // UID (cccd)
        "string", // bod
      ];
      const encodedData = ethers.utils.defaultAbiCoder.encode(abi, [
        editData.id,
        dayjs(editData.bod).toISOString(),
      ]);
      await editPerson({
        tokenId: data?.tokenId || "",
        signer,
        user: {
          name: editData.name,
          age: editData.age,
          gender: editData.gender,
          score: editData.score,
          sensitiveInformation: encodedData,
        },
      });
      message.success("Edit Successfully");
      onCreatedSuccess();
    } catch (e) {
      console.log(e);
      message.error("Fail to edit user");
    }
    setLoading(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      walletAddress: "",
      name: data?.name,
      age: data?.age,
      gender: data?.gender ? (data.gender as Gender) : Gender.Female.toString(),
      score: data?.score,
      id: data?.uid,
      bod: data?.dateOfBirth,
      address: data?.address,
      organization: data?.organization,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  const handleSubmit = (newData: FormData) => {
    if (data) {
      handleEditPerson(newData);
    } else {
      handleCreateNewPerson(newData);
    }
  };

  return (
    <Modal
      onOk={() => form.submit()}
      className="modal"
      okButtonProps={{
        type: "primary",
        style: {
          backgroundColor: "#327cc8",
        },
        loading,
      }}
      {...props}
    >
      <div className="modal__title">{title}</div>
      <div className="modal__body">
        <Form
          initialValues={{
            walletAddress: "",
            name: data?.name,
            age: data?.age,
            gender: data?.gender ? (data.gender as Gender) : Gender.Female.toString(),
            score: data?.score,
            id: data?.tokenId,
            bod: data?.dateOfBirth,
            address: data?.address,
            organization: data?.organization,
          }}
          form={form}
          onFinish={handleSubmit}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 16 }}
          layout="horizontal"
        >
          <Form.Item
            rules={[
              {
                required: true,
                message: "Wallet address is required field",
              },
            ]}
            name={"walletAddress"}
            label="Wallet"
          >
            <Input disabled={!!data} autoComplete="off" />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Name is required field",
              },
            ]}
            name={"name"}
            label="Name"
          >
            <Input autoComplete="off" />
          </Form.Item>
          <CustomFormItem
            form={form}
            rules={[
              {
                required: true,
                message: "Age is required field",
              },
            ]}
            name={"age"}
            label="Age"
            regexOnChange={new RegExp(/\d+/)}
          />
          <Form.Item
            rules={[
              {
                required: true,
                message: "Gender is required field",
              },
            ]}
            name={"gender"}
            label="Gender"
          >
            <Select placeholder="Select a option and change input text above" allowClear>
              <Select.Option value="1">Male</Select.Option>
              <Select.Option value="2">Female</Select.Option>
            </Select>
          </Form.Item>
          <CustomFormItem
            form={form}
            rules={[
              {
                required: true,
                message: "Score is required field",
              },
            ]}
            name={"score"}
            label="Score"
            regexOnChange={new RegExp(/\d+/)}
          />
          <CustomFormItem
            form={form}
            rules={[
              {
                required: true,
                message: "ID is required field",
              },
            ]}
            name={"id"}
            label="ID"
            regexOnChange={new RegExp(/\d+/)}
          />

          <Form.Item
            rules={[
              {
                required: true,
                message: "BOD is required field",
              },
            ]}
            name={"bod"}
            label="BOD"
          >
            <DatePicker disabledDate={(date) => date.isAfter()} />
          </Form.Item>
          <Form.Item
            rules={[
              {
                required: true,
                message: "Address is required field",
              },
            ]}
            name={"address"}
            label="Address"
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item rules={[]} name={"organization"} label="Organization">
            <VoteeAutoComplete
              value={form.getFieldValue("organization")}
              onSelect={(value) => {
                form.setFieldValue("organization", value);
              }}
            />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CreateUserModal;
