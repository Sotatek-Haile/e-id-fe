import { AutoComplete, DatePicker, Form, Input, Modal, ModalProps, Select, message } from "antd";
import React, { useEffect, useState } from "react";
import "./styles.scss";
import { Gender, User } from "@lib/web3/types";
import { useForm } from "antd/es/form/Form";
import { createNewPerson } from "@lib/web3/contractInteract";
import { useWeb3React } from "@web3-react/core";
import CustomFormItem from "../FormItem";
interface Props extends ModalProps {
  onCreatedSuccess: () => void;
}
type FormData = {
  name: string;
  gender: Gender;
  age: number;
  score: number;
  walletAddress: string;
};

const CustomModal: React.FC<Props> = ({ children, title, onCreatedSuccess, ...props }) => {
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
      await createNewPerson({
        walletAddress: data.walletAddress,
        signer,
        user: {
          name: data.name,
          age: data.age,
          gender: data.gender,
          score: data.score,
          sensitiveInformation: "0x",
        },
      });
      message.success("Create Successfully");
      onCreatedSuccess();
    } catch (e) {
      console.log(e);
      message.error("Fail to create person");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (!props.open) {
      form.resetFields();
    }
  }, [props.open]);

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
          form={form}
          onFinish={handleCreateNewPerson}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 18 }}
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
            <Input autoComplete="off" />
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
        </Form>
      </div>
    </Modal>
  );
};

export default CustomModal;
