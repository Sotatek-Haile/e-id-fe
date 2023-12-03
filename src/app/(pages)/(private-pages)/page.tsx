"use client";
import {
  Row,
  Col,
  Card,
  Button,
  List,
  Descriptions,
  Avatar,
  Radio,
  Switch,
  Upload,
  message,
} from "antd";
const { Meta } = Card;
export default function page() {
  return (
    <div className="p-10">
      <div
        className="profile-nav-bg"
        style={{
          backgroundImage:
            "url(https://png.pngtree.com/thumb_back/fh260/background/20220804/pngtree-vietnam-dong-son-bronze-drum-pattern-light-effect-background-image_1440068.jpg)",
          backgroundSize: "contain",
        }}
      ></div>

      <div className="flex flex-row mx-20 mt-5 justify-between">
        <div className="gap-5 w-[18%]">
          <Card
            hoverable
            className="!w-full pb-5"
            cover={
              <img
                alt="example"
                src="https://toigingiuvedep.vn/wp-content/uploads/2021/07/mau-anh-the-dep-than-thai.jpg"
              />
            }
          >
            <Meta title="TRẦN NGUYỄN THỊ NHI" description="09878776724-HANOI" />
          </Card>
        </div>
        <div className="w-[78%]">
          <Card title="Card title" bordered={false} style={{ width: "100%" }}>
            <p>Card content</p>
            <p>Card content</p>
            <p>Card content</p>
          </Card>
        </div>
      </div>
    </div>
  );
}
