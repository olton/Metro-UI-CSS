
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("select-options.html tests", () => {
    it("select-options.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/select-options.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
