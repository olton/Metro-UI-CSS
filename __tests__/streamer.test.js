
import {beforeAll, afterAll, describe, it, expect, delay, getFileUrl, B} from "@olton/easytest";

beforeAll(async () => {
    await B.create()
})

afterAll(async () => {
    await B.bye()
})

describe("streamer.json tests", () => {
    it("streamer.json", async () => {
        await B.visit(`${getFileUrl(`./__html__/streamer.json`)}`)
        expect(B.error).toBeNull(B.error)
    })
})
