
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("chat.html tests", () => {
    it("chat.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/chat.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
