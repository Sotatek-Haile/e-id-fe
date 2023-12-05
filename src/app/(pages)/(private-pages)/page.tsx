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
import Link from "next/link";
import { useRouter } from "next/navigation";
import CountUp from "react-countup";
import { useDispatch, useSelector } from "react-redux";
const { Meta } = Card;
const { Header } = Layout;

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Thông tin về việc cộng điểm",
    children: (
      <p>
        Việc công điểm sẽ được nhà nước quy định dựa vào các sự kiện trong đời của một người dân.
        Vui lòng truy cập cổng thông tin chỉnh phủ để xem chi tiết
      </p>
    ),
  },
  {
    key: "2",
    label: "Thông tin về việc trừ điểm",
    children: (
      <p>
        Việc trừ điểm sẽ được nhà nước quy định dựa vào các sự kiện trong đời của một người dân. Vui
        lòng truy cập cổng thông tin chỉnh phủ để xem chi tiết
      </p>
    ),
  },
  {
    key: "3",
    label: "Thông tin chế tài và khen thưởng",
    children: (
      <p>
        Việc áp dụng chế tài sẽ được cơ quan chức năng quản lý gần nhất đưa ra thông tin quyết định
        và sự đồng tình của cơ quan cấp trên sẽ được nhà nước quy định dựa vào các sự kiện trong đời
        của một người dân. Vui lòng truy cập cổng thông tin chỉnh phủ để xem chi tiết
      </p>
    ),
  },
];

export default function Home() {
  const address = useSelector(getAccount) as string;
  const { data, isLoading } = useGetUserQuery(address) as any;
  const formatter: any = (value: number) => <CountUp end={data?.data?.score || 0} separator="," />;
  // const router = useRouter();
  const dispatch = useDispatch();
  const router = useRouter();

  const { disconnectWallet } = useConnectWallet();

  const onLogout = () => {
    dispatch(removeUser());
    disconnectWallet();
  };

  return (
    <div
      className="pb-10"
      style={{
        backgroundImage:
          "url(https://meliawedding.com.vn/wp-content/uploads/2022/11/AX51-vector-corel-trong-dong.jpg)",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <Header className="flex bg-[red]">
        <div className="header-col header-brand flex">
          <div className="w-[50px] justify-center items-center flex">
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Emblem_of_Vietnam.svg/250px-Emblem_of_Vietnam.svg.png"
              alt=""
            />
          </div>
          <h1 className="pl-10 text-[20px] text-[#fff] bold">E-ID (Cổng dịch vụ quốc gia)</h1>
        </div>
        <div className="header-col header-nav">
          <Menu mode="horizontal" defaultSelectedKeys={["1"]}>
            <Menu.Item key="1">
              <Link href="/">
                <span> Dashboard</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link href={PATHS.PersonManagement()}>
                <span>Admin</span>
              </Link>
            </Menu.Item>
          </Menu>
        </div>
        <div className="header-col header-btn">
          <Button type="primary" onClick={onLogout} className="bg-yellow-600">
            Đăng Xuất
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
                    src="https://toigingiuvedep.vn/wp-content/uploads/2021/07/mau-anh-the-dep-than-thai.jpg"
                  />
                }
              >
                <Meta title="TRẦN NGUYỄN THỊ NHI" description="09878776724-HANOI" />
                <Statistic title="Active Users" value={112893} formatter={formatter} />
              </Card>
            </div>
            <div className="w-[78%]">
              <div className="pb-5 flex justify-between">
                <div className="w-[48%] ]">
                  <Card
                    title="Thông tin chi tiết"
                    bordered={false}
                    style={{ width: "100%", height: 350 }}
                  >
                    <div className="flex justify-between">
                      <b>Căn Cước Công Dân:</b> <p> {data?.data?._id}</p>
                    </div>
                    <div className="flex justify-between">
                      <b>Tên:</b> <p> {data?.data?.name}</p>
                    </div>
                    <div className="flex justify-between">
                      <b>Số Điện Thoại:</b> <p> 0987654321</p>
                    </div>
                    <div className="flex justify-between">
                      <b>Quê Quán:</b> <p> Sô nhà 11, ngõ 22, Xuân Thuỷ, Bắc Từ Liêm, Hà Nội</p>
                    </div>
                    <div className="flex justify-between">
                      <b>Nơi thường trú::</b>
                      <p> Sô nhà 11, ngõ 22, Xuân Thuỷ, Bắc Từ Liêm, Hà Nội</p>
                    </div>
                    <div className="flex justify-between">
                      <b>Nơi cấp:</b> <p> Bắc Từ Liêm, Hà Nội</p>
                    </div>
                    <div className="flex justify-between">
                      <b>Ngày cấp:</b> <p> 22/10/1990</p>
                    </div>
                  </Card>
                </div>
                <div className="w-[48%]">
                  <div className="flex justify-between">
                    <div className="w-[48%]">
                      <Card
                        title="QR Đinh danh"
                        bordered={false}
                        style={{ width: "100%", height: 350 }}
                      >
                        <QRCode value={data?.data?._id} color={"yellow"} bgColor={"red"} />
                      </Card>
                    </div>
                    <div className=" w-[48%]">
                      <Card title="Vân tay" bordered={false} style={{ width: "100%", height: 350 }}>
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
                <Card title="Events in life" bordered={false} style={{ width: "100%" }}>
                  <div className="flex">
                    <div className="w-[48%]">
                      <Timeline
                        mode="left"
                        items={data.data.history.map((x: any) => ({
                          children: (
                            <div className="flex">
                              <b className="text-yellow-600 pr-5">{x?.createdAt}: </b>
                              <p>Khai sinh.</p>............... &nbsp;&nbsp;
                              <Avatar
                                style={{
                                  paddingLeft: "20px",
                                  backgroundColor: "#fde3cf",
                                  color: "#fff",
                                }}
                              >
                                100
                              </Avatar>
                            </div>
                          ),
                        }))}
                      />
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
              <Empty
                image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                imageStyle={{ height: 80 }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
