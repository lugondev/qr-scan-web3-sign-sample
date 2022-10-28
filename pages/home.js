import { Heading, LinkBox, SimpleGrid } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
    return (
        <SimpleGrid justifyContent="center" marginTop="8rem">
            <LinkBox
                as="article"
                maxW="md"
                p="5"
                borderWidth="1px"
                rounded="xl"
                marginBottom="30%"
            >
                <Heading size="xl" my="2">
                    <Link href="/qr">Show QR</Link>
                </Heading>
            </LinkBox>
            <LinkBox as="article" maxW="sm" p="5" borderWidth="1px" rounded="xl">
                <Heading size="xl" my="2">
                    <Link href="/scan-qr">Scan QR</Link>
                </Heading>
            </LinkBox>
        </SimpleGrid>
    );
}
