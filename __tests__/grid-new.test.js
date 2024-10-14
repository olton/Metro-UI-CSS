
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("grid-new.html tests", () => {
    it("grid-new.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/grid-new.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
