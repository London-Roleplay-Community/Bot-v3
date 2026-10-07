import { describe, expect, jest, test } from "@jest/globals";

jest.unstable_mockModule('../utils/translate.ts', () => ({
  translate: jest.fn(),
  translateLang: jest.fn()
}));

describe("Translate sub", () => {
  test("replies with translation", async () => {
    const { translate } = await import("../utils/translate.ts");
    const mock = translate as jest.MockedFunction<typeof translate>;

    mock.mockResolvedValue({
      text: "Hello",
      lang: "es"
    });

    const { chatInput } = await import("../src/app/commands/(utility)/[utility]/translate.subcommand.tsx");

    const mockInteraction = {
      options: { getString: jest.fn((name: string) => name === "text" ? "Hola" : null) },
      user: { avatarURL: jest.fn().mockReturnValue("https://pravatar.cc") },
      reply: jest.fn(() => Promise.resolve({})) };

    await chatInput({ interaction: mockInteraction } as unknown as any);

    expect(mock).toHaveBeenCalledWith("Hola");
    expect(mockInteraction.reply).toHaveBeenCalled();
  });
});
