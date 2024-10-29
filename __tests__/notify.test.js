
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("notify.html tests", () => {
    it("notify.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/notify.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
