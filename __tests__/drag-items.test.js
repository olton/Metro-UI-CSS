
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("drag-items.html tests", () => {
    it("drag-items.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/drag-items.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
