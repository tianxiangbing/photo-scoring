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
            this.onClick();
            this.score = this.props.score;
        }
    }
    render() {
        let m = getMsg();
        let { score } = this.props;
        return (
            <div>
                {/* {this.state.img ? <img className="downImg" src={this.state.img} alt="长按保存" /> : undefined} */}
                <div className="scoreContent">
                    {score ?
                        <div className="desc">
                            <div>你的容颜在全球所有人和动物中排名</div>
                            <div className="score">{score}名</div>
                            <div>{m}!</div>
                            {!this.state.isshoting ? <a className="tips" href={this.state.img} download="测试颜值">点此下载页面截图</a> : undefined}
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
const msg = ['或许靠能力也是一种选择，不要放弃你', '你以为躲起来就找不到你了吗？没有用的你是那样拉风的人', '那么丑你还是别出来见人了', '高颜值才是硬道理', '把你丢在猪群里 都找不到你了', '本来可以靠实力，非要靠颜值', '地球很危险快回火星'];
const getMsg = () => {
    return msg[Math.floor(Math.random() * msg.length)];
}

const mapStateToProps = (state) => {
    let base64 = state.img;
    if (base64) {
        let score = '';
        let md5value = md5(base64);
        let sublen = parseInt(md5value.substr(0, 1), 16);
        sublen = Math.max(1, Math.min(8, sublen));
        md5value = md5value.substr(0, sublen);
        score = parseInt(md5value, 16) + 1;
        return {
            score: toThousands(score),
            clearShot: state.scoreborad.clearShot
        }
    } else {
        return {
            score: '',
            clearShot: state.scoreborad.clearShot
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
export default connect(mapStateToProps, null)(Scoring)