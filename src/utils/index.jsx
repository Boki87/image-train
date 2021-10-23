function actionTypeName(name) {
  let types = {
    resize: 'Resize',
    toFile: 'Save file',
    extract: 'Crop',
    extend: 'Expand Canvas',
    toFormat: 'Change Image format',
    flatten: 'BG color'
  }

  return types[name]
}

export { actionTypeName }
