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
              <Title className="mb-15 !text-red-600">Welcome</Title>
              <Title className="font-regular text-muted !text-yellow-600" level={5}>
                E-ID Citizen Information Service Gateway
              </Title>
              <Form onFinish={onSignIn} layout="vertical" className="row-col">
                <div className="py-5">
                  <p className="!text-yellow-600">Use the login method with MetaMask wallet</p>

                  <p className="!text-yellow-600">
                    In case you haven't installed an electronic wallet, please search and install it
                    on your browser's app store!
                  </p>
                </div>

                <Form.Item>
                  <Button
                    type="primary"
                    className="!bg-[#042869]"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Sign In
                  </Button>
                </Form.Item>
                <p className="font-semibold text-muted">
                  Are you experiencing issues with your account?&nbsp;
                  <Link href="/sign-up" className="text-dark font-bold">
                    Contact
                  </Link>
                </p>
              </Form>
            </Col>
            <Col className=" bg-[#042869] " xs={{ span: 12 }}>
              <div className=" w-full h-full justify-center items-center flex">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Greater_coat_of_arms_of_the_United_States.svg/220px-Greater_coat_of_arms_of_the_United_States.svg.png"
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
