
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("listview.html tests", () => {
    it("listview.html", async () => {
        await B.visit(`${getFileUrl(`./__html__/listview.html`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
