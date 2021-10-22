function actionTypeName(name) {
  let types = {
    resize: 'Resize',
    toFile: 'Save file',
    extract: 'Crop',
    toFormat: 'Change Image format'
  };

  return types[name];
}

export { actionTypeName };
