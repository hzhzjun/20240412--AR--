/**
 * 活动主入口
 */
import React, { Component } from "react";
import ReactDOM from "react-dom";
import { observer } from "mobx-react";
import "./app.less";
import store from "./store/index";
import Modal from "./modal/modal";
import "./utils/checkwebp"; // webp检查
import MD from "../MD"; // 埋点
MD();

// 此处为spark-cli动态生成
import LoadingDemo from "@src/pages/loadingDemo/loadingDemo";
import HomeDemo from "@src/pages/homeDemo/homeDemo";
import { PAGE_MAP } from "./utils/constants";

/**
 * 所有页面场景
 */
const pageMap = {
  [PAGE_MAP.LOADING_PAGE]: <LoadingDemo />,
  [PAGE_MAP.HOME_PAGE]: <HomeDemo />,
};

@observer
class App extends Component {
  async componentDidMount() {
    // 获取前端开发配置，依据项目需要，酌情添加 ！！！
    // await store.getFrontVariable();
  }

  render() {
    const { curPage, pageData } = store;
    return (
      <>
        {{ ...pageMap[curPage], props: { ...pageData } }}
        <Modal />
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
