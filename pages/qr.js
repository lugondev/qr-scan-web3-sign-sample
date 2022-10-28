import { Box, Button, Container, Stack } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { useAccount, useConnect, useContract, useDisconnect, useProvider, useSignMessage } from "wagmi";

import ERC721ABI from "../common/ERC-721.json";
import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import AppJdenticon from "../common/AppJdenticon";

const ShowQr = () => {
    const router = useRouter()
    const { address, isConnected } = useAccount()
    const [ tokenIds, setTokenIds ] = useState([])

    const [ tokenId, setTokenId ] = useState()
    const [ timeSign, setTimeSign ] = useState(0)

    const provider = useProvider()
    const contract = useContract({
        address: "0xfF646D99fB94bb20439429c8fe0EE2F58090FA14",
        abi: ERC721ABI,
        signerOrProvider: provider,
    });

    useEffect(() => {
        if (address) {
            contract.balanceOf(address).then((balanceOf) => {
                Promise.all(
                    Array.from({ length: balanceOf.toNumber() }, (_, i) => {
                        return contract.tokenOfOwnerByIndex(address, i);
                    }),
                ).then((tokenIds) => {
                    setTokenIds(tokenIds.map((tokenId) => tokenId.toNumber()));
                });
            });
        }
    }, [ address ]);

    const { connect, connectors, error, pendingConnector } = useConnect();

    const { disconnect } = useDisconnect();

    const { data, isError, isLoading, isSuccess, signMessage } = useSignMessage();

    const SignMessage = async (id) => {
        const timestamp = Math.floor(Date.now() / 1000);
        setTimeSign(timestamp);
        setTokenId(id);

        signMessage({ message: `${id.toString()}::${timestamp.toString()}` });
    };

    return (
        <Container>
            <Stack direction="row" spacing={4} marginY="2rem">
                <Button
                    leftIcon={<ArrowBackIcon/>}
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => router.push("/")}
                >
                    Back
                </Button>
            </Stack>
            <Stack>
                {!isConnected ? <>
                    {connectors.map((connector) => (
                        <Button
                            disabled={!connector.ready}
                            key={connector.id}
                            onClick={() => connect({ connector })}
                            colorScheme="teal"
                            variant="outline"
                        >
                            {connector.name}
                            {!connector.ready && " (unsupported)"}
                            {isLoading &&
                                connector.id === pendingConnector?.id &&
                                " (connecting)"}
                        </Button>
                    ))}
                </> : <>
                    {address && (
                        <p style={{ marginTop: "2rem" }}>Account Address: {address}</p>
                    )}
                    <Button
                        onClick={() => disconnect()}
                        colorScheme="teal"
                        variant="outline"
                    >
                        Disconnect Wallet
                    </Button>
                    <div>
                        {tokenIds.map((tokenId) => (
                            <Box
                                flexDirection="column"
                                marginY="2rem"
                                justifyContent="center"
                                key={tokenId}
                            >
                                Token ID: {tokenId}
                                <AppJdenticon size={150} value={tokenId}/>
                                <Button marginY="1rem" onClick={() => SignMessage(tokenId)}>
                                    Check In
                                </Button>
                            </Box>
                        ))}
                    </div>
                </>}
            </Stack>

            <Stack
                direction="row"
                marginY="3rem"
                justifyContent="center"
                flexDirection="column"
            >
                {data && (
                    <>
                        <div
                            style={{
                                background: "white",
                                padding: "16px",
                            }}
                        >
                            <QRCode value={`${address}::${tokenId}::${data}::${timeSign}`}/>
                        </div>
                        <div style={{ width: "50%" }}>
                            <code>{`${address}::${tokenId}::${data}::${timeSign}`}</code>
                        </div>
                    </>
                )}
            </Stack>
        </Container>
    );
};

export default ShowQr;
