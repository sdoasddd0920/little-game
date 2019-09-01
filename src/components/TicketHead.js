import React from 'react';
import bird from '../images/bird-detail.png';

function Head(props) {
  const { infos } = props;
  let price = null;
  if (props.price !== undefined) {
    price = <p className="price-line">
      { props.isBird && <img src={bird} alt="早鸟价" className="bird"/> }
      <span className="red-price">{props.price.toFixed(2)}</span>
      { props.oldPrice && <span className="old-price">￥{props.oldPrice.toFixed(2)}</span> }
    </p>
  }
  return(
    <div className='c-ticket-head'>
      {price}
      <p className="ticket-title">{props.title || '没有标题'}</p>
      <p className="ticket-info">比赛日期：<span>{infos[0]}</span></p>
      <p className="ticket-info">比赛地点：<span>{infos[1]}</span></p>
      <p className="ticket-info">截止报名：<span>{infos[2]}</span></p>
    </div>
  );
}

export default Head;
