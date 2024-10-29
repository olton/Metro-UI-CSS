
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("sidebar.html tests", () => {
    it("sidebar.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/sidebar.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
