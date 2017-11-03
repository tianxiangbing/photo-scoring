import React from 'react';
import { view as Photo } from './photo/';
import { view as Scoring } from './scoring/';
import html2canvas from 'html2canvas';

function PhotoScoring() {
    return (
        <div onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
            <h1>人要有自信</h1>
            <div className="bg" />
            <div className="content">
                <Photo />
                <Scoring />
            </div>
        </div>
    )
}
let timer = undefined;
const onTouchStart = (e) => {
    timer = setTimeout(() => {
        //长按
        html2canvas(document.body, {
            onrendered: function (canvas) {
                document.body.appendChild(canvas);
            }
        });
    }, 1000)
}
const onTouchEnd = (e) => {
    timer && clearTimeout(timer);
}

export default PhotoScoring