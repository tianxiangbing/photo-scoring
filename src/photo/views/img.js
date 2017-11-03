import React from 'react';

const Img = ({src,onPick}) => {
    if (src) {
        return (
            <div className="avatar" onClick={onPick}><img alt="照片" src={src} /></div>
        )
    } else {
        return (
            <div className="avatar" onClick={onPick}>选择相片</div>
        )
    }
}
export default Img;