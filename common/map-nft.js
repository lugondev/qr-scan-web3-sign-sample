import { ListName } from "./map-name";
import { ListPhone } from "./map-phone";

export function GenerateUseTicker(tokenId) {
    return {
        seat: tokenId + "A",
        name: ListName[tokenId],
        phone: ListPhone[tokenId],
    };
}
