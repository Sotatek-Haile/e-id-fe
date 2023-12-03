import { User } from "@app/_types/user";
import { createOrganization, editOrganization } from "@lib/web3/contractInteract";
import { GENDER, Gender, Organization } from "@lib/web3/types";
import { useWeb3React } from "@web3-react/core";
import { Form, Input, Modal, ModalProps, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import CustomFormItem from "../FormItem";
import "./styles.scss";
interface Props extends ModalProps {
  onCreatedSuccess: () => void;
  data?: Organization;
}
type FormData = {
  name: string;
  tax: string;
  walletAddress: string;
};

const OrganizationModal: React.FC<Props> = ({
  children,
  title,
  onCreatedSuccess,
  data,
  ...props
}) => {
  const { provider } = useWeb3React();
  const [loading, setLoading] = useState(false);

  const [form] = useForm();
  const handleCreateNewOrganization = async (data: FormData) => {
    try {
      setLoading(true);
      if (!provider) {
        return;
      }
      console.log("data", data);
      const signer = provider.getSigner();
      await createOrganization({
        walletAddress: data.walletAddress,
        signer,
        data: {
          name: data.name,
          tax: data.tax,
        },
      });
      message.success("Create Successfully");
      onCreatedSuccess();
    } catch (e) {
      console.log(e);
      message.error("Fail to create organization");
    }
    setLoading(false);
  };

  const handleEditOrganization = async (editData: FormData) => {
    try {
      setLoading(true);
      if (!provider) {
        return;
      }
      const signer = provider.getSigner();
      await editOrganization({
        tokenId: data?.tokenId || "",
        signer,
        data: {
          name: editData.name,
          tax: editData.tax,
          tokenId: data?.tokenId,
        },
      });
      message.success("Edit Successfully");
      onCreatedSuccess();
    } catch (e) {
      console.log(e);
      message.error("Fail to edit organization");
    }
    setLoading(false);
  };

  useEffect(() => {
    form.setFieldsValue({
      walletAddress: "12",
      name: data?.name,
      tax: data?.tax,
    });
  }, [props.open]);

  const handleSubmit = (newData: FormData) => {
    if (data) {
      handleEditOrganization(newData);
    } else {
      handleCreateNewOrganization(newData);
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
            tax: data?.tax,
          }}
          form={form}
          onFinish={handleSubmit}
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
                message: "Tax number is required field",
              },
            ]}
            name={"tax"}
            label="Tax code"
            regexOnChange={new RegExp(/\d+/)}
          />
        </Form>
      </div>
    </Modal>
  );
};

export default OrganizationModal;
