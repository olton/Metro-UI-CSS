
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("resizable.html tests", () => {
    it("resizable.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/resizable.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
