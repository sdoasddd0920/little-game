import React, { useState, useEffect } from 'react';
import { List, InputItem, Picker, DatePicker } from 'antd-mobile';
import province from '../province.json';
import './playerInput.scss';

const single = [
  {
    label: 'a',
    value: 'A'
  }, {
    label: 'b',
    value: 'B'
  }
];

/**
 * @param {*} props
 * 这个组件真的是屎一样的组件！
 * type=5 时的处理真令人窒息！
 */
function Item(props) {
  // 0: 空行
  // 1: 普通填写
  // 2: 单选
  // 3: 日期
  // 4: 地址
  // 5: 证件
  const {
    type=0,
    label,
    placeholder,
    callback
  } = props;

  const [height, setHeight] = useState(0);
  const [state, setState] = useState('normal');
  const [value, setValue] = useState(props.value || '');
  const [firstTime, setFirstTime] = useState(true);
  const [data5, setData5] = useState([type === 5 ? {
    value: findReg(props.value[0])
  } : '']);

  let extraContent = null;
  let checkResult = null;
  let inputItem = null;
  let warn = null;
  let tip = null;
  let tipH = 0;
  let rule = props.rule;

  if (props.tips) {
    const tips = props.tips.trim();
    const tipArr = tips.split('\n');
    if (!tipArr[tipArr.length - 1]) {
      tipArr.pop();
    }
    tipH = 8 + 18 * tipArr.length;
    tip = tipArr.map(tip => <p key={tip}>{tip}</p>);
  }

  if (props.warn) {
    warn = <div
      className='error'
      style={{height: height}}
    >{props.warn}</div>;
  }

  if (extraContent || warn) {
    extraContent = <div>
      {warn}
      {tip}
    </div>;
  }

  function checkRule(deepProp) {
    console.log(state)
    if (deepProp && typeof deepProp !== 'string') {
      console.log('has deep prop, ', deepProp)
      return callback && callback({
        ...deepProp,
        value
      });
    }
    if (!rule) {
      return;
    }
    const reg = new RegExp(rule);
    const result = reg.test(value);
    if (result) {
      setState('normal');
      setHeight(0);
      // check pass
      checkResult = false;
    } else {
      setState('error');
      setHeight(18);
      checkResult = checkRule;
    }
    callback && callback({
      ...props,
      value,
      checkResult
    });
  }

  function handleResult(val) {
    setValue(val);
    callback && callback({
      ...props,
      checkResult: false,
      value: val
    });
  }

  useEffect(() => {
    callback && callback({
      ...props,
      checkResult: checkRule
    });
    if (!firstTime) {
      checkRule();
    } else {
      setFirstTime(false);
    }
  }, [props.rule]);

  if (type === 0) {
    // 空行
    inputItem = <div className='white-block'/>;
  }

  if (type === 1) {
    // 普通填写
    inputItem = <InputItem
      clear
      labelNumber={7}
      value={value}
      onChange={setValue}
      onBlur={checkRule}
      onFocus={() => {
        setState('normal');
        setHeight(0);
      }}
      placeholder={placeholder}
    >{label}</InputItem>;
  }

  if (type === 2) {
    // 单选菜单
    inputItem = <Picker
      data={props.items}
      cols={1}
      value={value}
      onOk={handleResult}
      extra={placeholder}
    >
      <List.Item arrow="horizontal">{label}</List.Item>
    </Picker>;
  }

  if (type === 3) {
    // 日期选择
    inputItem = <DatePicker
      mode='date'
      extra={placeholder}
      value={value}
      onChange={handleResult}
    >
      <List.Item arrow="horizontal">{label}</List.Item>
    </DatePicker>;
  }

  if (type === 4) {
    // 地址选择
    inputItem = <Picker
      data={province}
      cols={3}
      value={value}
      onOk={handleResult}
      extra='请选择地区'
    >
      <List.Item arrow="horizontal">地区</List.Item>
    </Picker>;
  }

  if (type === 5) {
    // 该死的复合组件，证件选择
    function setValue5(i) {
      return function(pro) {
        const arr = data5.concat();
        arr[i] = pro;
        setData5(arr);
        if (data5[1]) {
          callback({
            ...props,
            value: [findSfz(arr[0].value[0]), arr[1].value],
            checkResult: data5[1].checkResult
          }, false);
        }
      }
    }

    const Up = <Item
      type={2}
      label='证件类型'
      placeholder='请选择类型'
      value={findReg(value[0])}
      items={props.items}
      callback={setValue5(0)}
    />;

    const Down = <Item
      type={1}
      label='证件号'
      placeholder='请输入证件号'
      value={data5[1] || value[1] || ''}
      rule={data5[0].value[0]}
      callback={setValue5(1)}
    />;
    inputItem = <>{Up}{Down}</>;
  }

  function findReg(sfz) {
    const list = props.items;
    return [list.filter(obj => obj.label === sfz)[0].value];
  }
  function findSfz(reg) {
    const list = props.items;
    return list.filter(obj => obj.value === reg)[0].label;
  }

  const classes = `input-box ${state === 'error' ? 'input-error' : ''} ${state === 'warn' ? 'input-warn' : ''}`;
  const extra = extraContent ? <div className='input-extra'>{extraContent}</div> : null;

  return (
    <div className={classes}>
      {inputItem}
      {extra}
    </div>
  );
}

const sfz = [
  {
    label: '身份证',
    value: '^\\d{6}$'
  }, {
    label: '护照',
    value: '^\\d{3}$'
  }
];

function Entry() {
  const [v, setV] = useState([]);
  const [date, setDate] = useState('');
  const [h, setH] = useState(0);
  const [items, setItems] = useState([]);
  const tipStr= '请确保旅行结束日比证件有效期早6个月\nttttt';
  const itemData = {
    label: '姓名',
    // value: ['身份证', '123456'],
    value: [],
    placeholder: '请输入真实姓名',
    rule: '^\\d{5}$',
    type: 1,
    items: sfz,
    warn: '错误提示！',
    tips: '第一行tips测试\n第二行tips测试\n第三行的tips\n',
    index: 0
  };

  function cb(obj) {
    const newItems = items.concat();
    newItems[obj.index] = obj;
    setItems(newItems);
  }

  function handleV(value) {
    setV(value);
  }

  function handleH() {
    setH(h ? 0 : 54);
    console.log( items[0].value)
  }

  return(
    <div className='p-player-input'>
      <div className="yellow-title"
        onClick={handleH}
      >新增选手信息</div>

      <List>
        <InputItem
          clear
          labelNumber={7}
          placeholder="请输入真实姓名"
        >姓名</InputItem>
        <div className="tips" style={{height:h}}>
          <div className="tip-content">
            {tipStr.split('\n').map((str, i) => <p key={i}>{str}</p>)}
          </div>
        </div>

        <Picker
          data={single}
          cols={1}
          value={v}
          onOk={handleV}
          extra='请选择血型'
        >
          <List.Item arrow="horizontal">Single</List.Item>
        </Picker>
        <Item {...itemData} callback={cb} />

        <DatePicker
          mode='date'
          extra='请确保旅行结束'
          value={date}
          onChange={date => setDate(date)}
        >
          <List.Item arrow="horizontal">Date</List.Item>
        </DatePicker>
      </List>
      <div className="bottom-box">
        <div className="btn btn-disable">完成</div>
      </div>
    </div>
  );
}

export default Entry;
