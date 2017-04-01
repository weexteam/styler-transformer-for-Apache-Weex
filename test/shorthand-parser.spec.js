var chai = require('chai')
var sinon = require('sinon')
var sinonChai = require('sinon-chai')
var expect = chai.expect
chai.use(sinonChai)

var shorthandParser = require('../lib/shorthand-parser')

describe('shorthand-parser', function () {
  it('parse transition', function () {
    const declarations = [
      {
        type: 'declaration',
        property: 'transition',
        value: 'margin-top 500ms ease-in-out 1s',
        position: {}
      }
    ]
    const result = shorthandParser(declarations)
    expect(result).eql([
      {
        type: 'declaration',
        property: 'transition-property',
        value: 'margin-top',
        position: {}
      },
      {
        type: 'declaration',
        property: 'transition-duration',
        value: '500ms',
        position: {}
      },
      {
        type: 'declaration',
        property: 'transition-timing-function',
        value: 'ease-in-out',
        position: {}
      },
      {
        type: 'declaration',
        property: 'transition-delay',
        value: '1s',
        position: {}
      }
    ])
  })
})