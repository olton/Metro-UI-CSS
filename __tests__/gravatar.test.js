
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("gravatar.html tests", () => {
    it("gravatar.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/gravatar.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
