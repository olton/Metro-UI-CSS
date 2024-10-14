
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("slider.html tests", () => {
    it("slider.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/slider.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
