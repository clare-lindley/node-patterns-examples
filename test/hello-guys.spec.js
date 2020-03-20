import { expect } from "chai";
import sayHello from "../src/hello-guys";

describe("sayHello test", () => {
    describe("sayHello function", () => {
        it("should say Hello guys!", () => {

            const str = sayHello();
            expect(str).to.equal("Hello guys!");
        })
    })
});