
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("popover.html tests", () => {
    it("popover.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/popover.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
