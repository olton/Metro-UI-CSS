
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("storage.html tests", () => {
    it("storage.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/storage.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
