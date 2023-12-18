import * as assert from "node:assert/strict";
import { describe, it } from "node:test";

import { idleTaskScheduler } from "../index.js";

await describe("foobar()", async () => {
  await describe("given two positive integers", async () => {
    await describe("when called", async () => {
      // check if the function can be called
      await it("should not throw", () => {
        assert.doesNotThrow(() => {
          idleTaskScheduler(() => Promise.resolve());
        });
      });
    });
  });
});
