import { useEffect, useState } from "react";

import RootStore from "../stores/index.store";
import { autorun } from "mobx";

export default function useMapStoreStateToComponent(
  store: RootStore,
  selectProps: (store: any) => Record<string, any>
) {
  const [props, setProps] = useState(selectProps(store));

  useEffect(
    () =>
      autorun(() => {
        setProps(store ? selectProps(store) : {});
      }),
    []
  );

  return props;
}
