import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './home.scss';
import header_bg from '../images/header.jpg';
import bird from '../images/bird.png';
import req from '../io/req';

function Home() {
  const [data, setData]=useState({});
  const [i, setI]=useState(0);
  useEffect(() => {
    async function getData() {
      const data = req('/h5/combos?category=1');
      setData(data);
    }
    getData();
  }, []);

  return(
    <div className='p-home'>
      <Head
        title={data.name}
        banner={data.banner}
        headers={data.matchs}
        chooseItem={setI}
      />
      <Body
        items={data.matchs[i].combos}
        dateAndPlace={data.matchs[i].actualTime+'  '+data.matchs[i].name}
      />
    </div>
  );
};

function Head({title,banner,headers,chooseItem}) {
  // const title = '2019企鹅跑-王者快跑';
  const [flag, setFlag] = useState(0);
  const [left, setLeft] = useState(0);
  const [active, setActive] = useState(0);
  // const headers = [0, 1, 2, 3, 4, 5, 6];

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
    chooseItem(num);
    const { left, right } = e.target.getBoundingClientRect();
    if (left < 0) {
      setLeft(-108 * num);
    }
    if (right > window.screen.availWidth) {
      setLeft(window.screen.availWidth - 8 -(num+1)*108);
    }
  }

  const item = (header, num) => <div
    key={num}
    onClick={e => activeItem(e, num)}
    className={`item ${ num === active ? 'activity' : ''}`}
  >
    <div className="item-content">
      <div className="pic">
        {/* <img className='city' src="" alt=""/> */}
        <div className="activity-content">
          <span>{header.name}</span>
        </div>
      </div>
      <div className='city-content city-name'>{header.name}</div>
      <div className="city-content city-time">{header.actualTime}</div>
    </div>
  </div>;
  const items = headers.map((header, index) => item(header, index));

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

function Body(props) {
  const { items } = props;

  const item = data => <li className="item" key={data.id}>
    {/* 早鸟价标签 */}
    {
      data.hasDiscount === 1 ? <div className="preview">
        <img src={bird} alt="早鸟价" className="bird"/>
      </div> : null
    }
    <div className="infos">
      <div className="ticket-title">{data.name}</div>
      <div className="ticket-intro">{props.dateAndPlace}</div>
      <p className="ticket-price">
        <span className="red-price">{data.discountPrice ? data.discountPrice : data.price}</span>
        {
          data.discountPrice ? <span className="old-price">¥{data.price}</span> : null
        }
      </p>
      <div className="btn">
        <Link to={'' + data.id}>
          查看
        </Link>
      </div>
      <div className="bottom-line"></div>
    </div>
  </li>;

  const itemList = items.map(item);

  return(
    <div className="c-body">
      <div className="content">
        <div className="title">选择套餐</div>
        <ul>
          {itemList}
        </ul>
      </div>
    </div>
  );
}

export default Home;
