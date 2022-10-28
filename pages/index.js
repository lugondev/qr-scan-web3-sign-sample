import { Button, Container, Stack } from "@chakra-ui/react";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import { SignMessageComponent } from "../common/sign-message"

const SignMessage = () => {
    const { address, isConnected } = useAccount();
    const { connect, connectors, pendingConnector, isLoading } = useConnect();

    const { disconnect } = useDisconnect();

    return (
        <Container>
            <Stack direction="row" spacing={4} marginBottom="4rem"/>
            <Stack>
                {!isConnected ? <div>
                    {connectors.map((connector) => (
                        <Button
                            disabled={!connector.ready}
                            isLoading={isLoading}
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
                </div> : <div>
                    {address && <span style={{ marginTop: "2rem" }}>Account Address: {address}</span>}
                    <Button
                        onClick={() => disconnect()}
                        colorScheme="teal"
                        variant="outline"
                    >
                        Disconnect Wallet
                    </Button>
                </div>}
            </Stack>

            <SignMessageComponent isSignTypedData={true}/>
            <SignMessageComponent isSignTypedData={false}/>
        </Container>
    );
};

export default SignMessage;
