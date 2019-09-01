import React from 'react';
import QRCode from 'qrcode.react';
import Players from '../components/Players';
import './success.scss';

const playerProps = {
  editable: false,
  hasChild: false,
  adults: [
    {
      name: '陈梦圆',
      id: '110108123456135724',
      place: '自提地点A'
    }, {
      name: '李宇宸',
      id: '110108123456135725',
      place: '配送'
    }
  ],
  children: [
    {
      name: '谭培',
      id: '110108123456135724',
      place: '自提地点A'
    }
  ]
};

function Success() {
  return(
    <div className='p-success'>
      <div className="content">
        <div className="title">报名成功</div>
        <div className="card">
          <div className="head">
            <div className="line-1">
              2019企鹅跑-王者快跑
              <div className="arrow"/>
            </div>
            <div className="line-2">上海站二人票</div>
            <div className="line-3">
              比赛日期：
              <span>2019-08-26</span>
            </div>
            <div className="line-3">
              比赛地点：
              <span>上海XXX</span>
            </div>
          </div>
          <div className="qr-code">
            <QRCode
              value='https://mail.qq.com/'
              size={140}
            />
          </div>
          <div className="price">
            订单总额
            <div className="red-price">79.00</div>
          </div>
        </div>
      </div>
      <Players {...playerProps} />
      <div className="br"></div>
      <div className="game-info">
        <div className="yellow-title">赛事包详情</div>
        <div className="game-item">
          <div className="game-item-left">自提时间</div>
          <div className="game-item-right">
            <p>8月22日-8月24日 10:00-20:00</p>
          </div>
        </div>
        <div className="game-item">
          <div className="game-item-left">自提地点</div>
          <div className="game-item-right">
            <p>地点A：地址地址地址地址</p>
            <p>地点B：地址地址地址地址</p>
          </div>
        </div>
      </div>
      <div className="bottom-box">
        <div className="btn">关注公众号，接收比赛通知</div>
      </div>
    </div>
  );
}

export default Success;
