
function actionTypeName(name: string): string {
    
    type typesType = {
        [key: string] : string
    }

    let types: typesType = {
        resize: 'Resize',
        toFile: 'Save file',
        extract: 'Crop',
        toFormat: 'Change Image format',
    }

    return types[name]
}

export {
    actionTypeName
}