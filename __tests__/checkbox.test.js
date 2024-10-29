
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("checkbox.html tests", () => {
    it("checkbox.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/checkbox.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
