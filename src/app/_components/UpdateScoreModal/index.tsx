import { User } from "@app/_types/user";
import { addScore, createNewPerson, editPerson, subtractScore } from "@lib/web3/contractInteract";
import { GENDER, Gender } from "@lib/web3/types";
import { useWeb3React } from "@web3-react/core";
import { DatePicker, Form, Input, Modal, ModalProps, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import CustomFormItem from "../FormItem";
import "./styles.scss";

enum EventType {
  Add = "Add",
  Subtract = "Subtract",
}

const EventMap = [
  {
    id: "1",
    label: "Drunk",
    value: 10,
    type: EventType.Subtract,
  },
  {
    id: "2",
    label: "Granduate highschool",
    value: 10,
    type: EventType.Add,
  },
];

interface Props extends ModalProps {
  onCreatedSuccess: () => void;
  data?: User;
}
type FormData = {
  eventId: string;
};

const UpdateScoreModal: React.FC<Props> = ({
  children,
  title,
  onCreatedSuccess,
  data,
  ...props
}) => {
  const { provider } = useWeb3React();
  const [loading, setLoading] = useState(false);

  const [form] = useForm();
  const handleAddScore = async ({ eventId }: FormData) => {
    console.log('eventId',eventId)
    const foundEvent = EventMap.find((item) => item.id === eventId);
    console.log(foundEvent)
    try {
      setLoading(true);
      console.log('provider',provider)
      if (!provider) {
        return;
      }
      const signer = provider.getSigner();
      await addScore({
        signer,
        data: {
          tokenId: data?.tokenId || "",
          score: foundEvent?.value.toString() || "",
        },
      });
      message.success("Update Successfully");
      onCreatedSuccess();
    } catch (e) {
      console.log(e);
      message.error("Failed to update user");
    }
    setLoading(false);
  };

  const handleSubtractScore = async ({ eventId }: FormData) => {
    const foundEvent = EventMap.find((item) => item.id === eventId);

    try {
      setLoading(true);
      if (!provider) {
        return;
      }
      const signer = provider.getSigner();
      await subtractScore({
        signer,
        data: {
          tokenId: data?.tokenId || "",
          score: foundEvent?.value.toString() || "",
        },
      });
      message.success("Update Successfully");
      onCreatedSuccess();
    } catch (e) {
      console.log(e);
      message.error("Failed to update user");
    }
    setLoading(false);
  };

  useEffect(() => {
    form.setFieldsValue([]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.open]);

  const handleSubmit = (newData: FormData) => {
    const foundEvent = EventMap.find((item) => item.id === newData.eventId);
    console.log('newData',newData)
    if (foundEvent?.type === EventType.Subtract) {
      handleSubtractScore(newData);
    } else {
      handleAddScore(newData);
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
                message: "event is required field",
              },
            ]}
            name={"eventId"}
            label="Event"
          >
            {
              <Select placeholder="Select event" allowClear>
                {EventMap.map((item) => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.label}
                    </Select.Option>
                  );
                })}
              </Select>
            }
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default UpdateScoreModal;
