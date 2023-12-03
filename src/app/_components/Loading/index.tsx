import { Spin } from "antd";
import "./styles.scss";
const Loading = () => {
  return (
    <div className="loading">
      <Spin size="large" />
    </div>
  );
};

export default Loading;
