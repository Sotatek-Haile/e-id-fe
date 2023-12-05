import { useGetMilesStoneQuery } from "@app/_stores/admin/persons/api";
import { User } from "@app/_types/user";
import { addScore, subtractScore } from "@lib/web3/contractInteract";
import { Gender } from "@lib/web3/types";
import { useWeb3React } from "@web3-react/core";
import { Form, Modal, ModalProps, Select, message } from "antd";
import { useForm } from "antd/es/form/Form";
import React, { useEffect, useState } from "react";
import "./styles.scss";

enum EventType {
  Add = "Add",
  Subtract = "Subtract",
}


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

  const { data: milestoneData } = useGetMilesStoneQuery({});

  const [form] = useForm();
  const handleAddScore = async ({ eventId }: FormData) => {
    const foundEvent = (milestoneData?.data || []).find((item: any) => item.id === eventId);
    console.log(foundEvent);
    try {
      setLoading(true);
      if (!provider) {
        return;
      }
      const signer = provider.getSigner();
      await addScore({
        signer,
        data: {
          tokenId: data?.tokenId || "",
          score: foundEvent?.score.toString() || "",
          sId: foundEvent.id,
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
    const foundEvent = (milestoneData?.data || []).find((item: any) => item.id === eventId);

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
          sId: foundEvent.id,
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
    const foundEvent = (milestoneData?.data || []).find(
      (item: any) => item.id === newData.eventId,
    );

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
                {(milestoneData?.data || []).map((item: any) => {
                  return (
                    <Select.Option key={item.id} value={item.id}>
                      {item.name}
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
