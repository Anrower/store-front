import DotLoader from "react-spinners/DotLoader";
import { CSSProperties } from 'react';

const override: CSSProperties = {
  display: "block",
  margin: "35% auto",
};

const Loader = () => {
  return (
    <DotLoader
      color="#5ECE7B"
      size={65}
      speedMultiplier={1}
      cssOverride={override}
    />
  )
}

export default Loader