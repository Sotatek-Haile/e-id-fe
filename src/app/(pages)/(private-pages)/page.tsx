/* eslint-disable react/no-unescaped-entities */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";
import { PATHS } from "@app/_constants/path";
import { removeUser } from "@app/_stores/user";
import { useGetUserQuery } from "@app/_stores/user/api";
import { getAccount } from "@app/_stores/user/selectors";
import { useConnectWallet } from "@lib/web3/hooks/useConnectWallet";
import {
  Avatar,
  Button,
  Card,
  Collapse,
  CollapseProps,
  Empty,
  Layout,
  Menu,
  QRCode,
  Spin,
  Statistic,
  Timeline,
} from "antd";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
const { Meta } = Card;
const { Header } = Layout;

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Information about point addition",
    children: (
      <p>
        The awarding of points will be regulated by the state based on events in an individual's
        life. Please visit the Government's information portal for details.
      </p>
    ),
  },
  {
    key: "2",
    label: "Information about point deduction",
    children: (
      <p>
        The deduction of points will be regulated by the state based on events in an individual's
        life. Please visit the Government's information portal for details.
      </p>
    ),
  },
  {
    key: "3",
    label: "Information about sanctions and rewards",
    children: (
      <p>
        The application of sanctions will be informed by the nearest relevant authority, and the
        approval of the higher-level authority will be determined by the state based on events in an
        individual's life. Please visit the Government's information portal for details.
      </p>
    ),
  },
];

export default function Home() {
  const address = useSelector(getAccount) as string;
  const { data, isLoading } = useGetUserQuery(address) as any;
  const formatter: any = (value: number) => (
    <CountUp
      end={data?.data?.history[data?.data?.history?.length - 1]?.score || data?.data?.score}
      separator=","
    />
  );
  // const router = useRouter();
  const dispatch = useDispatch();
  const router = useRouter();

  const { disconnectWallet } = useConnectWallet();

  const onLogout = () => {
    dispatch(removeUser());
    disconnectWallet();
  };

  return (
    <div className="pb-10">
      <Header className="flex bg-[#042869]">
        <div className="header-col header-brand flex">
          <div className="w-[50px] justify-center items-center flex">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Greater_coat_of_arms_of_the_United_States.svg/220px-Greater_coat_of_arms_of_the_United_States.svg.png"
              alt=""
            />
          </div>
          <h1 className="pl-10 text-[20px] text-[#fff] bold">E-ID (National Service Portal)</h1>
        </div>
        <div className="header-col header-nav">
          {address === process.env.NEXT_PUBLIC_ADMIN_ADDRESS && (
            <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
              <Menu.Item key="1">
                <Link href="/">
                  <span>Home</span>
                </Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link href={PATHS.PersonManagement()}>
                  <span>Admin</span>
                </Link>
              </Menu.Item>
            </Menu>
          )}
        </div>
        <div className="header-col header-btn">
          <Button type="primary" onClick={onLogout} className="bg-yellow-600">
            Sign out
          </Button>
        </div>
      </Header>
      <div className="flex flex-row mx-20 mt-5 justify-between">
        {data ? (
          <>
            <div className="gap-5 w-[18%]">
              <Card
                hoverable
                className="!w-full pb-5"
                cover={
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt="example"
                    src={`https://i.pravatar.cc/150?img=${data?.data?._id.slice(1, 2)}`}
                  />
                }
              >
                <Meta title={data?.data?.name} description={data?.data?._id} />
                <Statistic title="Active" value={112893} formatter={formatter} />
              </Card>
            </div>
            <div className="w-[78%]">
              <div className="pb-5 flex justify-between">
                <div className="w-[48%] ]">
                  <Card title="Detail Info" bordered={false} style={{ width: "100%", height: 350 }}>
                    <div className="flex justify-between">
                      <b>Number ID:</b> <p> {data?.data?.uid} </p>
                    </div>
                    <div className="flex justify-between">
                      <b>Name:</b> <p>{data?.data?.name}</p>
                    </div>
                    <div className="flex justify-between">
                      <b>Birth Day:</b> <p>{dayjs(data?.data?.dateOfBirth).format("DD/MM/YYYY")}</p>
                    </div>
                    <div className="flex justify-between">
                      <b>Phone number:</b> <p> 0987654321</p>
                    </div>
                    <div className="flex justify-between">
                      <b>Hometown:</b> <p> {data?.data?.address}</p>
                    </div>
                    <div className="flex justify-between">
                      <b>Place of permanent residence:</b>
                      <p>{data?.data?.address}</p>
                    </div>
                    <div className="flex justify-between">
                      <b>Age:</b> <p> {data?.data?.age}</p>
                    </div>
                    <div className="flex justify-between">
                      <b>Created At:</b> <p> {dayjs(data?.data?.updatedAt).format("DD/MM/YYYY")}</p>
                    </div>
                  </Card>
                </div>
                <div className="w-[48%]">
                  <div className="flex justify-between">
                    <div className="w-[48%]">
                      <Card title="QR ID" bordered={false} style={{ width: "100%", height: 350 }}>
                        <QRCode
                          value={data?.data?._id}
                          className="w-full"
                          color={"#eaa621"}
                          bgColor={"#042869"}
                        />
                      </Card>
                    </div>
                    <div className=" w-[48%]">
                      <Card
                        title="Fingerprint"
                        bordered={false}
                        style={{ width: "100%", height: 350 }}
                      >
                        <div className="rounded-lg">
                          <img
                            // className="mix-blend-color-burn"
                            src="https://kenh14cdn.com/2018/7/22/co-so-nao-ma-phan-tich-van-tay-co-the-giup-pha-an-15322381176211191407383.jpg"
                          />
                        </div>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Card title={`Events in life`} bordered={false} style={{ width: "100%" }}>
                  <div className="flex">
                    <div className="w-[48%]">
                      {data?.data?.history?.length > 0 ? (
                        <Timeline
                          mode="left"
                          items={data?.data?.history.map((x: any) => ({
                            children: (
                              <div className="flex">
                                <b className="text-yellow-600 pr-5">{x?.createdAt}: </b>
                                <p>{x?.milestone?.name}</p>............... &nbsp;&nbsp;
                                <Avatar
                                  style={{
                                    paddingLeft: "20px",
                                    backgroundColor: x.amount > 0 ? "green" : "red",
                                    color: "#fff",
                                  }}
                                >
                                  {x.amount}
                                </Avatar>
                              </div>
                            ),
                          }))}
                        />
                      ) : (
                        <div className="flex justify-center items-center">
                          <Empty
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{ height: 80 }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="w-[48%]">
                      <Collapse items={items} defaultActiveKey={["1", "2", "3"]} />
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </>
        ) : (
          <div className="flex w-[100vw] h-[100vh] justify-center">
            {isLoading ? (
              <Spin />
            ) : (
              <div className="flex justify-center items-center">
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{}}
                  description="Account has not been identified!"
                  className="justify-center items-center"
                />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
