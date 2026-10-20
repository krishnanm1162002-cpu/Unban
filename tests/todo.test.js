import { describe, expect, it } from "vitest";
import { TestDriver } from "testdriverai/vitest/hooks";

describe("TodoMVC App", () => {
  it("should create, complete, and clear a todo item", async (context) => {
    const testdriver = TestDriver(context);

    await testdriver.provision.chrome({ url: "https://todomvc.com/examples/react/dist/" });

    await testdriver.find("\"What needs to be done?\" text input field").click();
    await testdriver.type("Buy milk");
    await testdriver.pressKeys(["enter"]);

    const assertAdded = await testdriver.assert("The todo item 'Buy milk' is visible in the list");
    expect(assertAdded).toBeTruthy();

    await testdriver.find("circular toggle checkbox next to 'Buy milk'").click();

    const assertCompleted = await testdriver.assert("The todo item 'Buy milk' is completed and struck through, with '0 items left!' in the footer");
    expect(assertCompleted).toBeTruthy();

    await testdriver.find("\"Clear completed\" button").click();

    const assertCleared = await testdriver.assert("The todo list is empty and no items are listed");
    expect(assertCleared).toBeTruthy();
  });
});
