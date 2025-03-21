import { getHint } from "../../lib/clients/gemini";

jest.mock("../../lib/clients/gemini", () => ({
  getHint: jest.fn(),
}));

describe("Gemini Client", () => {
  it("fetches a hint successfully", async () => {
    (getHint as jest.Mock).mockResolvedValue("Try using a hash map.");
    const hint = await getHint("Two Sum");
    expect(hint).toBe("Try using a hash map.");
  });

  it("handles errors", async () => {
    (getHint as jest.Mock).mockRejectedValue(new Error("API error"));
    await expect(getHint("Two Sum")).rejects.toThrow("API error");
  });
});