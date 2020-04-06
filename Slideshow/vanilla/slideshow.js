const el = id => document.getElementById(id)
const newEl = (tag) => document.createElement(tag);

const ImageContiner = (id, src, txt) => {
  let ctr = newEl('div')
  let img = newEl('img')
  let txtSpan = newEl('span')

  ctr.id = id;

  ctr.classList.add('frame', 'hide')

  img.src = src;
  img.classList.add('image')

  txtSpan.innerText = txt;
  txtSpan.classList.add('text')

  ctr.append(img)
  ctr.append(txtSpan)
  return ctr;
}

const actionbtn = (txt, action) => {
  let btn = newEl('button')
  btn.innerText = txt

  btn.addEventListener('click', action)
  return btn;
}

const slideshow = (id, data) => {

  const root = el(id)
  const len = data.length;
  let current = 0;

  data.forEach((frame, id) => {
    ({ src, txt } = frame);
    let imgCtr = ImageContiner(id, src, txt);
    root.append(imgCtr)
  });

  imgslt = el(current);
  imgslt.classList.remove('hide')

  // Next and prev btn
  let actionctr = newEl('div')
  actionctr.classList.add('actionctr')

  let prev = actionbtn('👈', () => {
    if (current === 0) {
      imgslt.classList.add('hide')

      current = len - 1
      imgslt = el(current);
      imgslt.classList.remove('hide')
    } else {

      imgslt.classList.add('hide')

      current = current - 1
      imgslt = el(current);


      imgslt.classList.remove('hide')
    }
  });
  let next = actionbtn('👉', () => {
    if (current === len - 1) {
      imgslt.classList.add('hide')

      current = 0
      imgslt = el(current);
      imgslt.classList.remove('hide')
    } else {

      imgslt.classList.add('hide')

      current = current + 1
      imgslt = el(current);


      imgslt.classList.remove('hide')
    }
  });
  // let next = actionbtn('next');
  actionctr.append(prev, next)

  root.append(actionctr)
}