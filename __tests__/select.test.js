
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("select.html tests", () => {
    it("select.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/select.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
