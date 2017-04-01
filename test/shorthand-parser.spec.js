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

  it('parse padding', function () {
    const declarations = [
      {
        type: 'declaration',
        property: 'padding',
        value: '1px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'padding',
        value: '21px 22px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'padding',
        value: '31px 32px 33px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'padding',
        value: '41px 42px 43px 44px',
        position: {}
      }
    ]
    const result = shorthandParser(declarations)
    expect(result).eql([
      {
        type: 'declaration',
        property: 'padding-top',
        value: '1px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'padding-right',
        value: '1px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'padding-bottom',
        value: '1px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'padding-left',
        value: '1px',
        position: {}
      },

      {
        type: 'declaration',
        property: 'padding-top',
        value: '21px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'padding-right',
        value: '22px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'padding-bottom',
        value: '21px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'padding-left',
        value: '22px',
        position: {}
      },

      {
        type: 'declaration',
        property: 'padding-top',
        value: '31px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'padding-right',
        value: '32px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'padding-bottom',
        value: '33px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'padding-left',
        value: '32px',
        position: {}
      },

      {
        type: 'declaration',
        property: 'padding-top',
        value: '41px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'padding-right',
        value: '42px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'padding-bottom',
        value: '43px',
        position: {}
      },
      {
        type: 'declaration',
        property: 'padding-left',
        value: '44px',
        position: {}
      }
    ])
  })
})