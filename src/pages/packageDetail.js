import React from 'react';
import TicketHead from '../components/TicketHead';
import './packageDetail.scss';
import header from '../images/header.jpg';

const ticketHeadProps = {
  title: '行上海站二人票',
  infos: [
    '2019-08-26',
    '杭州西湖',
    '2019-08-20'
  ],
  price: 79,
  oldPrice: 150,
  isBird: true
}

function Detail() {
  return(
    <div className='p-package-detail'>
      <img src={header} alt="标题图片" className="header"/>
      <div className="content">
        <TicketHead {...ticketHeadProps} />
        <div className="imgs">
          <img src={header} alt="内容图片" className="image"/>
          <img src={header} alt="内容图片" className="image"/>
          <img src={header} alt="内容图片" className="image"/>
        </div>
      </div>
      <div className="btn">
        <div className="btn-content">我要报名</div>
      </div>
    </div>
  );
}

export default Detail;
