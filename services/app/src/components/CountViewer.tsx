import React from "react";
import { useAppSelector } from "../app/hooks";

type Props = {};

const CountViewer = (props: Props) => {

  const count = useAppSelector(state => state.counter.value)

  return <div>
    Count: {count}
  </div>;
};

export default CountViewer;
