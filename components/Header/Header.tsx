import { Button, Input } from "@chakra-ui/react";

import { FC } from "react";
import RootStore from "../../stores/index.store";
import { useHeaderState } from "../../hooks/useHeaderState.hook";

const Header: FC<{ store: RootStore }> = ({ store }) => {
  const { promptWalletSignIn, isConnected, currentAccount } =
    useHeaderState(store);
  return (
    <header>
      {!isConnected ? (
        <Button onClick={promptWalletSignIn}>connect</Button>
      ) : (
        <Input readOnly type="text" value={currentAccount} />
      )}
    </header>
  );
};
export default Header;
