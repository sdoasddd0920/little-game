import React, { useState } from 'react';
import { Toast, Modal } from 'antd-mobile';
import TicketHead from '../components/TicketHead';
import Players from '../components/Players';
import './signUp.scss';

const ticketHeadProps = {
  title: '上海站二人票',
  infos: [
    '2019-08-26',
    '杭州西湖',
    '2019-08-20'
  ],
  // price: 79,
  oldPrice: 150,
  isBird: true
}

const playerProps = {
  editable: true,
  hasChild: true,
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

function SignUp() {
  return(
    <div className='p-sign-up'>
      <div className="header">
        <div className="bg-layout">
          <img className='bg-img' src="https://raw.githubusercontent.com/sdoasddd0921/minigame/master/static/media/header.a5169ac8.jpg" alt=""/>
        </div>
        <div className="bg">
          <TicketHead {...ticketHeadProps} />
        </div>
      </div>
      <Players {...playerProps} />
      <div className="br"></div>
      <Payment />
    </div>
  );
}

function Payment() {
  const [promoCode, setPromoCode] = useState('');
  const prompt = Modal.prompt;

  function checkPromo(promo) {
    if (promo === '321') {
      setPromoCode(promo);
      return Toast.info('兑换成功', 0.618);
    }
    return Toast.info('优惠码错误', 1.618);
  }

  function inputPromo() {
    prompt('请输入优惠码', null, [
      { text: '取消' },
      {
        text: '确定',
        onPress: code => checkPromo(code)
      }
    ]);
  }

  return(
    <div className='payment'>
      <div className="line-item">
        <div className="label">优惠码</div>
        { promoCode
          ? <div className='label-content'>{ promoCode }</div>
          : <>
            <div
              className="preferential"
              onClick={inputPromo}
            >请输入优惠码</div>
            <div className="arrow"></div>
          </>
        }
      </div>
      <div className="line-item">
        <div className="label">支付方式</div>
        <div className="label-content">微信支付</div>
      </div>
      <div className="pay-bottom">
        <p className='pay-price'>
          <span className="pay-label">总价</span>
          <span className="red-price">79.00</span>
        </p>
        <div className="pay-btn" onClick={() => console.log('need to pay')}>去支付</div>
      </div>
    </div>
  );
}

export default SignUp;
