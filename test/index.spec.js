import request from 'request';
import { expect } from "chai";

describe.skip("localhost connection test", () => {
    it('Main page content', function(done) {
        request('http://localhost:3000' , function(error, response, body) {
            expect(body).to.equal('Hello World');
            done();
        });
    });
});