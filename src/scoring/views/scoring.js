import React, { Component } from 'react';
//import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from '../../lib/md5.js';
import './style.css';
import html2canvas from 'html2canvas';
class Scoring extends Component {
    constructor(props) {
        super(props);
        this.state = { img: null, isshoting: true };
        this.score = 0;
        this.onClick = this.onClick.bind(this);
    }
    onClick() {
        let canvas = document.createElement('canvas');
        let ctx = canvas.getContext('2d');
        canvas.width = document.body.clientWidth * 2;
        canvas.height = document.body.clientHeight * 2;
        ctx.scale(2, 2);
        this.setState({ isshoting: true });
        html2canvas(document.getElementById('root'), {
            onrendered: (canvas) => {
                canvas.globalCompositeOperation = 'source-atop';
                let url = canvas.toDataURL("image/png");
                this.setState({ img: url, isshoting: false });
            },
            background: "rgba(254, 254, 254, 0.50)",
            canvas: canvas
        });
    }
    componentWillReceiveProps(nextprops) {
        if (nextprops && nextprops.clearShot === true && this.state.img) {
            this.setState({ img: null });
        }
    }
    componentDidUpdate(nextprops) {
        if (this.props.score !== this.score) {
            setTimeout(() => {
                this.onClick();
            }, 500)
            this.score = this.props.score;
        }
    }
    render() {
        let m = getMsg();
        let { score } = this.props;
        return (
            <div>
                {this.state.img ? <img className="downImg" src={this.state.img} alt="长按保存" /> : undefined}
                <div className="scoreContent">
                    {score && !this.state.img ?
                        <div className="desc">
                            <div>你的颜值评分为</div>
                            <div className="score">{score} 分</div>
                            <div>{m}!</div>
                            <a className="tips" href={this.state.img} download="测试颜值">长按保存截图</a>
                        </div>
                        : undefined
                    }
                    <div>
                        <img src="url.png" className="url" alt="二维码" />
                    </div>
                </div>
            </div>
        )
    }
}
const msg = ['或许靠能力也是一种选择，不要放弃你', '你以为躲起来就找不到你了吗？没有用的你是那样拉风的人', '英俊这个词简直是为你而创造的', '高颜值才是硬道理', '本来可以靠实力，非要靠颜值', '地球很危险快回火星'];
const getMsg = () => {
    return msg[Math.floor(Math.random() * msg.length)];
}

const mapStateToProps = (state) => {
    let base64 = state.img;
    if (base64) {
        let score = '';
        let md5value = md5(base64);
        // let sublen = parseInt(md5value.substr(0, 1), 16);
        // sublen = Math.max(1, Math.min(9, sublen));
        // md5value = md5value.substr(0, sublen);
        // score = parseInt(md5value, 16) + 1;
        score = sum(md5value);
        return {
            // score: toThousands(score),
            score: score,
            clearShot: state.scoreborad.clearShot
        }
    } else {
        return {
            score: '',
            clearShot: state.scoreborad.clearShot
        }
    }
}
const sum = (str) => {
    let s = 0;
    for (let i = str.length - 1; i >= 0; i--) {
        s += parseInt(str[i],16);
    }
    if(s>100){
        s = s.toString().slice(1,3);
    }
    return s;
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
export default connect(mapStateToProps, null)(Scoring)