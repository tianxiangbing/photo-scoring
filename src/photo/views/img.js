import React from 'react';

const Img = ({ src, onPick }) => {
    if (src) {
        return (
            <div className="avatar" onClick={onPick}><img alt="照片" src={src} onLoad={computerImg} /></div>
        )
    } else {
        return (
            <div className="avatar" onClick={onPick}>选择相片</div>
        )
    }
}
const computerImg = (e) => {
    console.log(e)
    let img = e.target;
    let expectWidth = 100;
    let expectHeight = 100;
    if (img.naturalWidth > img.naturalHeight && img.naturalWidth > 100) {
        expectWidth = 100;
        expectHeight = expectWidth * img.naturalHeight / img.naturalWidth;
    } else if (img.naturalHeight > img.naturalWidth && img.naturalHeight > 100) {
        expectHeight = 100;
        expectWidth = expectHeight * img.naturalWidth / img.naturalHeight;
    }
    e.target.style.height = expectHeight +'px';
    e.target.style.width = expectWidth+'px';
}
export default Img;