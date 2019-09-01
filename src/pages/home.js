import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './home.scss';
import header_bg from '../images/header.jpg';
import bird from '../images/bird.png';

function Home() {
  return(
    <div className='p-home'>
      <Head />
      <Body />
    </div>
  );
};

function Head() {
  const title = '2019企鹅跑-王者快跑';
  const [flag, setFlag] = useState(0);
  const [left, setLeft] = useState(0);
  const [active, setActive] = useState(0);
  const headers = [0, 1, 2, 3, 4, 5, 6];

  function touchStart(e) {
    setFlag(e.touches[0].clientX);
  }
  function change(e) {
    setFlag(e.touches[0].clientX);
    let move = e.touches[0].clientX - flag;
    if (move + left > 0) {
      return setLeft(0);
    }
    if (move + left < window.screen.availWidth-(headers.length * 108 + 16)) {
      return setLeft(window.screen.availWidth-(headers.length * 108 + 16));
    }
    return setLeft(move + left);
  }

  function activeItem(e, num) {
    setActive(num);
    const { left, right } = e.target.getBoundingClientRect();
    if (left < 0) {
      setLeft(-108 * num);
    }
    if (right > window.screen.availWidth) {
      setLeft(window.screen.availWidth - 16 -(num+1)*108);
    }
  }

  const item = (num) => <div
    key={num}
    onClick={e => activeItem(e, num)}
    className={`item ${ num === active ? 'activity' : ''}`}
  >
    <div className="item-content">
      <div className="pic">
        {/* <img className='city' src="" alt=""/> */}
        <div className="activity-content">
          <span>上海站</span>
        </div>
      </div>
      <div className='city-content city-name'>上海站</div>
      <div className="city-content city-time">8月25日</div>
    </div>
  </div>;
  const items = headers.map(header => item(header));

  return(
    <div className='c-head'>
      <div className="bg">
        <img className='bg_img' src={header_bg} alt="banner_bg"/>
      </div>
      <div className="content">
        <div className="title">{title}</div>

        <div className="chain-box">
          <div
            className="chains"
            style={{
              transform: `translateX(${left}px)`,
              width: (headers.length * 108 + 16) + 'px'
            }}
            onTouchStart={touchStart}
            onTouchMove={change}
          >
            {items}
          </div>
        </div>
      </div>
    </div>
  );
}

function Body() {
  const id = '1';
  const item = <li className="item">
    <div className="preview">
      <img src={bird} alt="早鸟价" className="bird"/>
    </div>
    <div className="infos">
      <div className="ticket-title">上海站+运动玩乐园单人套票</div>
      <div className="ticket-intro">2019-08-25  上海市</div>
      <p className="ticket-price">
        <span className="red-price">79.00</span>
        <span className="old-price">¥158.00</span>
      </p>
      <div className="btn">
        <Link to={'/signup/'+id}>
          查看
        </Link>
      </div>
      <div className="bottom-line"></div>
    </div>
  </li>;

  return(
    <div className="c-body">
      <div className="content">
        <div className="title">选择套餐</div>
        <ul>
          {item}
          {item}
          {item}
        </ul>
      </div>
    </div>
  );
}

export default Home;
