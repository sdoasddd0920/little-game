import React, { useState, useEffect } from 'react';

// const props = {
//   editable: true,
//   hasChild: true,
//   adults: [
//     {
//       name: '陈梦圆',
//       id: '110108123456135724',
//       place: '自提地点A'
//     }, {
//       name: '李宇宸',
//       id: '110108123456135725',
//       place: '配送'
//     }
//   ],
//   children: [
//     {
//       name: '谭培',
//       id: '110108123456135724',
//       place: '自提地点A'
//     }
//   ]
// };

function idProtect(id='') {
  const reg = /(\d{6})\d{6}(\d{6})/;
  return id.replace(reg, '$1******$2');
}

function handlePlayer(id) {
  console.log(id);
}

function showPlayers(players) {
  const playersLists = players.map(
    (player, i) => <div
      className="line-item player-info"
      key={i}
    >
      <div className="label">选手{i + 1}</div>
      <div
        className="player-body"
        onClick={handlePlayer.bind(null, player.id)}
      >
        <div className="player-name">{player.name}</div>
        <div className="player-id">{idProtect(player.id)} {player.place}</div>
      </div>
      <div className="arrow" />
    </div>
  );
  return playersLists;
}

function label(tag) {
  return(
    <div className="line-item">
      <div className="label">{tag}选手</div>
    </div>
  );
}

function Players(props) {
  const { adults=[], children, hasChild, editable } = props;
  const [child, setChild] = useState(children);
  const [show, setShow] = useState(false);
  const [childArr, setChildArr] = useState([]);
  const [adultArr, setAdultArr] = useState([]);

  useEffect(() => {
    // 修复滑动穿透的问题
    document.querySelector('.pop').addEventListener("touchmove", (e) => {
      // 执行滚动回调
      e.preventDefault();
      e.stopPropagation();
    }, {
      passive: false //  禁止 passive 效果
    })
  }, []);

  function handleChild() {
    console.log('handle')
    setChild(child.concat({
      name: '丁一',
      id: '110108123456135725',
      place: '配送'
    }));
  }

  function addPlayer(type, players) {
    // 剩余人数
    const last = 2 - players.length;
    const btnAdd = <div
      className='add-player'
      onClick={handleChild}
    >添加</div>;

    const btnEdit = <div
      className='add-player'
      onClick={handleClick}
    >编辑</div>;

    const editLine = <div className="players line-item">
      还需添加
      <span className={last === 0 ? '' : 'player-num'}>{last}个</span>
      {type}
      <div className="btn-box">
        {last === 0 ? btnEdit : btnAdd}
      </div>
    </div>;

    function handleClick() {
      if (type === '成人') {
        console.log('add adult')
        openPop();
      }
    }

    return(
      <>
        {editable && editLine}
        {showPlayers(players)}
      </>
    );
  }

  function openPop() {
    setShow(true);
  }

  function closePop(e) {
    e.preventDefault();
    console.log('prevent')
    setShow(false);
  }

  return(
    <div className='c-players'>
      <div className="yellow-title">选手信息</div>
      {hasChild && label('成人')}
      {addPlayer('成人', adults)}
      {hasChild && label('儿童')}
      {hasChild && addPlayer('儿童', child)}
      <div className={`pop ${show ? 'show-pop' : ''}`}>
        <div className="pop-box">
          <div className="pop-content">
            <div className="pop-title">
              添加选手信息
              <div
                className="close-btn"
                onClick={closePop}
              />
            </div>
            <div className="pop-add">
              新增选手
              <div className="arrow"/>
            </div>
            <div className="pop-player">
              <div className="pop-edit"/>
              <div className="pop-player-info">
                <p className="pop-name">刘天一</p>
                <p className="pop-info">110108******135724</p>
              </div>
              <div className="pop-check checked"/>
            </div>
            <div className="pop-player">
              <div className="pop-edit"/>
              <div className="pop-player-info">
                <p className="pop-name">刘天一</p>
                <p className="pop-info should-add">110108******135724</p>
              </div>
              <div className="pop-check"/>
            </div>
          </div>
          <div className="pop-btn bottom-box">
            <div className="btn btn-disable">还需添加2个选手</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Players;
