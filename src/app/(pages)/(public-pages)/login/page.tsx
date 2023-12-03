/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/jsx-key */
"use client";
import { PATHS } from "@app/_constants/path";
import { setUser } from "@app/_stores/user";
import { ConnectorKey } from "@lib/web3/connectors";
import { useConnectWallet } from "@lib/web3/hooks/useConnectWallet";
import { Button, Col, Form, Input, Layout, Row, Switch, Typography } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import "./styles.scss";
function onChange(checked: any) {
  console.log(`switch to ${checked}`);
}
const { Title } = Typography;
const { Footer, Content } = Layout;

const Login = () => {
  const router = useRouter();
  const { connectWalletAndSignMessage } = useConnectWallet();
  const dispatch = useDispatch();

  async function onSignIn() {
    const data: any = await connectWalletAndSignMessage(ConnectorKey.metaMask);
    dispatch(setUser(data));
    return router.push(PATHS.home());
  }
  return (
    <>
      <Layout className="h-[100vh] overflow-hidden">
        <Content className="h-full">
          <Row gutter={[24, 0]} className="h-full" justify="space-around">
            <Col md={{ span: 12 }} className="!p-[200px]">
              <Title className="mb-15 !text-red-600">Đăng nhập</Title>
              <Title className="font-regular text-muted !text-yellow-600" level={5}>
                Cổng dịch vụ e-id thông tin người dân
              </Title>
              <Form onFinish={onSignIn} layout="vertical" className="row-col">
                <div className="py-5">
                  <p className="!text-yellow-600">Sử dụng phương thức đăng nhập bằng ví metamask</p>

                  <p className="!text-yellow-600">
                    Trường hợp chưa cài ví điện tử vu lòng tìm kiếm và cài đặt trên chợ ứng dụng của
                    trình duyệt của bạn!
                  </p>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    className="!bg-yellow-600"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Đăng nhập
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Bạn đang có sự cố về tài khoản?&nbsp;
                  <Link href="/sign-up" className="text-dark font-bold">
                    Liên hệ
                  </Link>
                </p>
              </Form>
            </Col>
            <Col className=" bg-red-600 " xs={{ span: 12 }}>
              <div className=" w-full h-full justify-center items-center flex">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a3/Emblem_of_Vietnam.svg/250px-Emblem_of_Vietnam.svg.png"
                  alt=""
                />
              </div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </>
  );
};

export default Login;
