
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("any.html tests", () => {
    it("any.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/any.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
