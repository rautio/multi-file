var mf = require('../src/index.js'),
    expect = require('expect');

describe('Verify that each function is added to the index', function(){
  it('Should have a read function',function(){
    expect(typeof mf.read).toEqual('function');
  });
});
