/** 
 * 活动首页demo 开发自行修改或替换
 */

'use strict';
import React from 'react';
import { observer } from 'mobx-react';
import './homeDemo.less';

@observer
class HomeDemo extends React.Component {  
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="homeDemo">
        当前为活动首页
      </div>
    );
  }
}

export default HomeDemo;
