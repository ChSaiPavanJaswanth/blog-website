// import { db } from './firebase';

const blogTitleField = document.querySelector('.title');
const articleField = document.querySelector('.article');
//banner
const bannerImage = document.querySelector('#banner-upload');
const banner = document.querySelector('.banner');
let bannerPath;

const publishBtn = document.querySelector('.publish-btn');
const uploadInput = document.querySelector('#image-upload');

let months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
];

bannerImage.addEventListener('change', () => {
  uploadImage(bannerImage, 'banner');
});

uploadInput.addEventListener('change', () => {
  uploadImage(uploadInput, 'image');
});

const uploadImage = (uploadFile, uploadType) => {
  try {
    const [file] = uploadFile.files;
    if (file && file.type.includes('image')) {
      const formdata = new FormData();
      formdata.append('image', file);

      fetch('/upload', {
        method: 'post',
        body: formdata,
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          // console.log(`${location.origin}`);
          if (uploadType == 'image') {
            addImage(data, file.name);
          } else {
            bannerPath = `${location.origin}/${data}`;
            banner.style.backgroundImage = `url("${bannerPath}")`;
          }
        });
    } else {
      alert('upload image only!');
    }
  } catch (error) {
    console.log(error);
  }
};

const addImage = (imagePath, alt) => {
  let cursorPos = articleField.selectionStart;
  let textToInsert = `\r![${alt}](${imagePath})\r`;
  articleField.value =
    articleField.value.slice(0, cursorPos) +
    textToInsert +
    articleField.value.slice(cursorPos);
};

publishBtn.addEventListener('click', () => {
  if (articleField.value.length && blogTitleField.value.length) {
    //generating id
    let letters = 'abcdefghijklmnopqrstuvwxyz';
    let blogtitle = blogTitleField.value.split(' ').join('-');
    let id = '';
    for (let i = 0; i < 4; i++) {
      id += letters[Math.floor(Math.random() * letters.length)];
    }

    //setting up document name
    let docName = `${blogtitle}-${id}`;
    let date = new Date(); //for published at information

    //access the firestore with db variable
    db.collection('vit-blogs')
      .doc(docName)
      .set({
        title: blogTitleField.value,
        article: articleField.value,
        bannerImage: bannerPath,
        publishDate: `${date.getDate()} ${
          months[date.getMonth()]
        } ${date.getFullYear()}`,
      })
      .then(() => {
        console.log('date entered');
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
