
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("clock.html tests", () => {
    it("clock.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/clock.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
