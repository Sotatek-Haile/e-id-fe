import React from "react";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

type P = {
  fontSize?: number;
  address?: string;
};

const Avatar = (props: P) => {
  const { fontSize = 20, address } = props;
  const renderIcon = (address: string) => {
    return jsNumberForAddress(address);
  };
  return <div style={{
    display: 'flex',
    alignItems: 'center'
  }}>{address && <Jazzicon diameter={fontSize} seed={renderIcon(address)} />}</div>;
};

export default Avatar;
