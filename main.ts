import { grantPermission, cwebp } from "./src/index"

grantPermission()

const converter = async () => {
    try {
        const result = await cwebp("./images/ts-logo-256.png", "./images/ts-logo-256.webp", "-q 80");
        console.log(result);
    } catch (error) {
        console.error(error)
    }
}

converter()

