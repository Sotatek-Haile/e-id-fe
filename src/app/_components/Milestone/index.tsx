import { createOrganization, editOrganization } from "@lib/web3/contractInteract";
import { Organization } from "@lib/web3/types";
import { useWeb3React } from "@web3-react/core";
import { Form, Input, Modal, ModalProps, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import CustomFormItem from "../FormItem";
import "./styles.scss";
import {
  useCreateMilestoneMutation,
  useGetAllOrganizationQuery,
} from "@app/_stores/admin/persons/api";
export const REGEX_NUMBER_WITH_DECIMAL = (decimal?: string, isInt?: boolean) => {
  let regexString;
  if (decimal) {
    if (isInt) {
      regexString = `^-{0,1}$|^-{0,1}([0-9]+\\.{0,1}[0-9]{0,${decimal}})$|^([0-9])*$`;
    } else {
      regexString = `^([0-9]+\\.{0,1}[0-9]{0,${decimal}})$|^([0-9])*$`;
    }
  } else {
    regexString = `^([0-9]+\\.{0,1}[0-9]*)$|^([0-9])*$;`;
  }
  return new RegExp(regexString);
};
interface Props extends ModalProps {
  onCreatedSuccess: () => void;
  data?: Organization;
}
type FormData = {
  name: string;
  score: string;
};

const MilestoneModal: React.FC<Props> = ({ children, title, onCreatedSuccess, data, ...props }) => {
  const { provider } = useWeb3React();
  const [loading, setLoading] = useState(false);
  const [create] = useCreateMilestoneMutation();

  const [form] = useForm();
  const handleCreateNewOrganization = async (data: FormData) => {
    try {
      console.log('data',data)
      setLoading(true);
      await create({
        name: data.name,
        score: Number(data.score),
      }).unwrap();
      message.success("Create Successfully");
      onCreatedSuccess();
    } catch (e) {
      console.log(e);
      message.error("Fail to create Milestone");
    }
    setLoading(false);
  };

  // const handleEditOrganization = async (editData: FormData) => {
  //   try {
  //     setLoading(true);
  //     if (!provider) {
  //       return;
  //     }
  //     const signer = provider.getSigner();
  //     await editOrganization({
  //       tokenId: data?.tokenId || "",
  //       signer,
  //       data: {
  //         name: editData.name,
  //         tax: editData.tax,
  //         tokenId: data?.tokenId,
  //       },
  //     });
  //     message.success("Edit Successfully");
  //     onCreatedSuccess();
  //   } catch (e) {
  //     console.log(e);
  //     message.error("Failed to edit organization");
  //   }
  //   setLoading(false);
  // };

  useEffect(() => {
    form.setFieldsValue({
      walletAddress: data?.ownerAddress,
      name: data?.name,
      tax: data?.taxCode,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  const handleSubmit = (newData: FormData) => {
    handleCreateNewOrganization(newData);

    // if (data) {
    //   // handleEditOrganization(newData);
    // } else {
    //   handleCreateNewOrganization(newData);
    // }
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
            walletAddress: data?.ownerAddress,
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
            name={"name"}
            label="Name"
          >
            <Input disabled={!!data} autoComplete="off" />
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
            regexOnChange={REGEX_NUMBER_WITH_DECIMAL("0", true)}
          />
        </Form>
      </div>
    </Modal>
  );
};

export default MilestoneModal;
