
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("form.html tests", () => {
    it("form.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/form.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
