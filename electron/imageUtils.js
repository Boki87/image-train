import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function doActions(actions, images) {
  try {
    //loop trough all the images
    for (let i = 0; i < images.length; i++) {
      //Duplicate image to work with
      let image = images[i];
      let imageExtension = path.extname(image);
      let imageName = path.basename(image).split(imageExtension)[0];
      // console.log(imageName, imageExtension);

      let duplicateImagePath = path.join(__dirname, 'temp', imageName + i + '0' + imageExtension);
      fs.copyFileSync(image, duplicateImagePath);
      console.log(1, duplicateImagePath);
      // console.log("doing image " + imageName + imageExtension);

      for (let a = 0; a < actions.length; a++) {
        let tempIncrementImage = path.join(__dirname, 'temp', imageName + i.toString() + a.toString() + imageExtension);

        console.log(2, tempIncrementImage);
        let tempIncrementedImage = path.join(
          __dirname,
          'temp',
          imageName + i.toString() + (a + 1).toString() + imageExtension
        );
        let action = actions[a];

        // console.log("doing action " + action.type);

        switch (action.type) {
          case 'resize':
            await sharp(tempIncrementImage).resize(action.params).toFile(tempIncrementedImage);

            break;
          case 'extract':
            await sharp(tempIncrementImage).extract(action.params).toFile(tempIncrementedImage);
            break;
          case 'toFormat':
            //add . at beginning if missing
            imageExtension = action.params.format.charAt(0) != '.' ? '.' + action.params.format : action.params.format;

            await sharp(tempIncrementImage)
              .toFormat(action.params.format)
              .toFile(path.join(__dirname, 'temp', imageName + i.toString() + (a + 1).toString() + imageExtension));
            break;
          case 'toFile':
            if (!fs.existsSync(action.params.destination)) {
              fs.mkdirSync(action.params.destination, { recursive: true });
            }
            await sharp(tempIncrementImage).toFile(tempIncrementedImage);

            await sharp(tempIncrementImage).toFile(
              path.join(
                action.params.destination,
                action.params.name == '' ? imageName + imageExtension : action.params.name
              )
            );
            break;
        }

        // console.log(actions[a]);
      }
      //delete all temp images
      fs.readdirSync(path.join(__dirname, 'temp')).forEach((file, i) => {
        console.log('delete file ' + file);
        fs.unlinkSync(path.join(__dirname, 'temp', file));
      });
      // console.log(images[i]);
    }
  } catch (err) {
    console.log('some error happened', err);
  }
}

export { doActions };
