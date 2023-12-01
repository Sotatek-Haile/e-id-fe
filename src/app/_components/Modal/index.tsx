import { Form, Input, Modal, ModalProps } from "antd";
import React from "react";
import "./styles.scss";
import { Gender, User } from "@lib/web3/types";
import { useForm } from "antd/es/form/Form";
import { createNewPerson } from "@lib/web3/contractInteract";
import { useWeb3React } from "@web3-react/core";
interface Props extends ModalProps {}

const CustomModal: React.FC<Props> = ({ children, title, ...props }) => {
  const { provider } = useWeb3React();

  const [form] = useForm();
  const handleCreateNewPerson = async (data: User) => {
    console.log('provider',provider)
    try {
      if (!provider) {
        return;
      }
      const signer = provider.getSigner();
      console.log('signer',signer)
      await createNewPerson({
        signer,
        user: {
          name: data.name,
          age: data.age,
          gender: data.gender,
          score: data.score,
          sensitiveInformation: "0x",
        },
      });
    } catch (e) {
      console.log(e)
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
      }}
      {...props}
    >
      <div className="modal__title">{title}</div>
      <div className="modal__body">
        <Form
          form={form}
          onFinish={handleCreateNewPerson}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item name={"name"} label="Name">
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item name={"age"} label="Age">
            <Input autoComplete="off" type="number" />
          </Form.Item>
          <Form.Item name={"gender"} label="Gender">
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item name={"score"} label="Score">
            <Input autoComplete="off" type="number" />
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default CustomModal;
