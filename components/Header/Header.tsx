import { Button, Container, Flex, Input } from "@chakra-ui/react";

import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "./../../public/logo.svg";
import RootStore from "../../stores/index.store";
import _includes from "lodash/includes";
import { useHeaderState } from "../../hooks/useHeaderState.hook";
import { useRouter } from "next/router";

const Header: FC<{ store: RootStore }> = ({ store }) => {
  const { promptWalletSignIn, isConnected, currentAccount } =
    useHeaderState(store);
  const router = useRouter();
  const isAddCitizenPage = _includes(router.asPath, "add-citizen");
  return (
    <Flex as="header" shadow="base" alignItems="center" height={70}>
      <Container maxW="container.lg">
        <Flex
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Link href={"/"}>
            <a>
              <Image src={Logo} width={150} />
            </a>
          </Link>
          <Flex
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center"
          >
            {!isConnected ? (
              <Button onClick={promptWalletSignIn}>connect</Button>
            ) : (
              <>
                {!isAddCitizenPage && (
                  <Link href={"/add-citizen"}>
                    <a>
                      <Button
                        onClick={promptWalletSignIn}
                        me={2}
                        ps={2}
                        pe={2}
                        w="150px"
                        maxW="150px"
                      >
                        add citizen
                      </Button>
                    </a>
                  </Link>
                )}
                <Input readOnly type="text" value={currentAccount} />
              </>
            )}
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
};
export default Header;
