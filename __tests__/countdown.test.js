
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("countdown.html tests", () => {
    it("countdown.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/countdown.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
