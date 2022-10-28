import { QrReader } from "react-qr-reader";
import { useEffect, useState } from "react";
import { Button, Center, Container, Stack } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import axios from "axios";
import { GenerateUseTicker } from "../common/map-nft";

const ScanQr = () => {
    const [ data, setData ] = useState("");
    const [ message, setMessage ] = useState("");

    const router = useRouter();

    useEffect(() => {
        if (data) {
            axios
                .post("https://go-cloud-run-sample-7o2q7pfurq-as.a.run.app/check-in", {
                    data: data,
                })
                .then((res) => {
                    const { data } = res;
                    console.log(data);
                    setMessage(
                        "Checked successfully:" +
                        JSON.stringify(GenerateUseTicker(data.token_id), "", 2),
                    );
                })
                .catch((err) => {
                    console.log(err);
                    setMessage("Checked failed:" + err.message);
                });
        }
    }, [ data ]);

    return (
        <Container>
            <Stack direction="row" spacing={4} margin="1rem">
                <Button
                    leftIcon={<ArrowBackIcon/>}
                    colorScheme="teal"
                    variant="outline"
                    onClick={() => router.push("/")}
                >
                    Back
                </Button>
            </Stack>
            <QrReader
                delay={1000}
                onResult={(result, error) => {
                    if (!!result) {
                        setData(result?.text);
                    }
                    if (!!error) {
                        console.info(error);
                    }
                }}
                constraints={{ facingMode: "environment" }}
                containerStyle={{
                    width: "100%",
                    padding: "5%",
                    background: "gray",
                }}
            />
            <Center>{message !== "" && <p>{message}</p>}</Center>
        </Container>
    );
};

export default ScanQr;
