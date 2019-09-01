import React, { useState } from 'react';
import { Toast, Modal } from 'antd-mobile';

const prompt = Modal.prompt;

function Payment(props) {
  const [promoCode, setPromoCode] = useState('');

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
    <div className='c-payment'>
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
        <div className="pay-btn" onClick={null}>去支付</div>
      </div>
    </div>
  );
}

export default Payment;
