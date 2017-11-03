import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { share } from '../actions.js';
import md5 from '../../lib/md5.js';
import './style.css';

const Scoring = ({ score, onShare }) => {
    return (
        <div className="scoreContent">
            {score ?
                <p className="desc">
                    <div>你的容颜在全球所有人和动物中排名</div>
                    <div className="score">{score} 名</div>
                    <div>或许靠能力也是一种选择，不要放弃你.</div>
                </p>
                : undefined
            }
            <div>
                <img src="url.png" className="url" alt="二维码" onTouchStart={onShare} />
            </div>
        </div>
    )
}

Scoring.propTypes = {
    onShare: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    let base64 = state.img;
    if (base64) {
        let score = '';
        let md5value = md5(base64);
        let sublen = parseInt(md5value.substr(0, 1), 16);
        sublen = Math.max(1, Math.min(8, sublen));
        md5value = md5value.substr(0,sublen);
        score = parseInt(md5value, 16);
        return {
            score: toThousands(score)
        }
    } else {
        return {
            score: ''
        }
    }
}
const toThousands = (num) => {
    num = (num || 0).toString();
    let result = '';
    while (num.length > 3) {
        result = ',' + num.slice(-3) + result;
        num = num.slice(0, num.length - 3);
    }
    if (num) { result = num + result; }
    return result;
}
const mapDispatchToProps = (dispatch, ownerProps) => {
    return {
        onShare: () => {
            dispatch(share())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Scoring)