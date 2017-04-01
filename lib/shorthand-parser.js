function generateDeclaration (property, value, position) {
  return {
    type: 'declaration',
    property,
    value,
    position
  }
}
function transition (declaration) {
  let CHUNK_REGEXP = /^(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?\s*(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?$/
  const match = declaration.value.match(CHUNK_REGEXP)
  let result = []
  const position = declaration.position
  match[1] && result.push(generateDeclaration('transition-property', match[1], position))
  match[2] && result.push(generateDeclaration('transition-duration', match[2], position))
  match[3] && result.push(generateDeclaration('transition-timing-function', match[3], position))
  match[4] && result.push(generateDeclaration('transition-delay', match[4], position))
  return result
}

function margin (declaration) {
  const position = declaration.position
  const splitResult = declaration.value.split(/\s+/)
  let result = []
  switch (splitResult.length) {
    case 1:
      splitResult.push(splitResult[0], splitResult[0], splitResult[0])
      break
    case 2:
      splitResult.push(splitResult[0], splitResult[1])
      break
    case 3:
      splitResult.push(splitResult[1])
      break
  }
  result.push(
    generateDeclaration('margin-top', splitResult[0], position),
    generateDeclaration('margin-right', splitResult[1], position),
    generateDeclaration('margin-bottom', splitResult[2], position),
    generateDeclaration('margin-left', splitResult[3], position)
  )
  return result
}

const parserCollection = {
  transition,
  margin
}

module.exports = function (declarations) {
  return declarations.reduce((result, declaration) => {
    const parser = parserCollection[declaration.property]
    if (parser) {
      return result.concat(parser(declaration))
    } else {
      result.push(declaration)
      return result
    }
  }, [])
}