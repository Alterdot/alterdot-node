'use strict';

var should = require('chai').should();

describe('Index Exports', function() {
  it('will export alterdot-lib', function() {
    var alterdot = require('../');
    should.exist(alterdot.lib);
    should.exist(alterdot.lib.Transaction);
    should.exist(alterdot.lib.Block);
  });
});
