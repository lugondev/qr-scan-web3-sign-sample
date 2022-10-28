import { Button, FormControl, Input, Stack } from "@chakra-ui/react";
import { useAccount, useSignMessage, useSignTypedData } from "wagmi";
import { useCallback, useMemo, useState } from "react"

export const SignMessageComponent = ({ isSignTypedData = false }) => {
    const { isConnected } = useAccount();
    const [ message, setMessage ] = useState("")

    //const EIP712_DOMAIN = [
    //   {
    //     type: 'uint256',
    //     name: 'chainId',
    //   },
    //   {
    //     type: 'address',
    //     name: 'verifyingContract',
    //   },
    // ]
    //
    // type Eip712MessageTypes = {
    //   EIP712Domain: {
    //     type: string
    //     name: string
    //   }[]
    //   SafeTx: {
    //     type: string
    //     name: string
    //   }[]
    // }
    const domain = {
        name: 'LugonAPT',
        version: '1',
        chainId: 97,
        verifyingContract: '0x116fe763a344b1d23dd35c638632d13c202a465c',
        // verifyingContract: '0xda9448F81611CCc27a37f3a9E8F4E3D72682706D',
    }

    const types = {
        // Person: [
        //     { name: 'name', type: 'string' },
        //     { name: 'wallet', type: 'address' },
        // ],
        Mail: [
            { name: 'to', type: 'address' },
            { name: 'contents', type: 'string' },
        ],
    }

    const [ value, setValue ] = useState({
        to: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
        contents: '',
    })

    const {
        signMessage,
        data: dataSignMessage,
        isError: isErrorSignMessage,
        isLoading: isLoadingSignMessage,
        isSuccess: isSuccessSignMessage,
        error: errorSignMessage,
    } = useSignMessage();
    const {
        signTypedData,
        data: dataSignTyped,
        isError: isErrorSignTyped,
        isLoading: isLoadingSignTyped,
        isSuccess: isSuccessSignTyped,
        error: errorSignTyped,
    } = useSignTypedData();

    const { data, isLoading, isError, isSuccess, error } = useMemo(() => {
        return {
            data: isSignTypedData ? dataSignTyped : dataSignMessage,
            isError: isSignTypedData ? isErrorSignTyped : isErrorSignMessage,
            isLoading: isSignTypedData ? isLoadingSignTyped : isLoadingSignMessage,
            isSuccess: isSignTypedData ? isSuccessSignTyped : isSuccessSignMessage,
            error: isSignTypedData ? errorSignTyped : errorSignMessage,
        }
    }, [ isSignTypedData, dataSignTyped, isErrorSignTyped, isLoadingSignTyped, isSuccessSignTyped, errorSignTyped, dataSignMessage, isErrorSignMessage, isLoadingSignMessage, isSuccessSignMessage, errorSignMessage ])

    const sign = useCallback(() => {
        isSignTypedData ? signTypedData({ domain, types, value }) : signMessage({ message })
    }, [ value, message ]);

    return isConnected && <div>
        <Stack
            direction="row"
            marginY="3rem"
            justifyContent="center"
            flexDirection="column"
        >
            <FormControl>
                <Input type="text" onChange={e => {
                    setMessage(e.target.value)
                    setValue({
                        ...value,
                        contents: e.target.value,
                    })
                }} value={message}/>
                <Button
                    mt={4}
                    colorScheme="teal"
                    type="button"
                    disabled={message === "" || isLoading}
                    isLoading={isLoading}
                    onClick={() => sign()}
                >
                    Sign {isSignTypedData ? "Typed Data" : "Message"}
                </Button>
            </FormControl>
        </Stack>

        <Stack
            direction="row"
            marginY="3rem"
            justifyContent="center"
            flexDirection="column"
        >
            <FormControl>
                {isSuccess && <code>Signature: {data}</code>}
                {isError && <code>Error: {error.message}</code>}
            </FormControl>
        </Stack>
    </div>
};
