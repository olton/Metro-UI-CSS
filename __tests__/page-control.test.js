
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("page-control.html tests", () => {
    it("page-control.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/page-control.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
