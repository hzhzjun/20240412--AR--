/**
 * loading页demo 开发自行修改或替换
 */
"use strict";

import React from "react";
import { observer } from "mobx-react";
import store from "../../store/index";
import "./loadingDemo.less";
import { preloadAsset } from "@src/utils/preload1.3.js";
import assetList from "@src/assetList.json";
import { PAGE_MAP } from "@src/utils/constants";
@observer
class LoadingDemo extends React.Component {
  constructor(props) {
    super(props);
    this.curPercentage = 0;
    this.intervalId = "";
    this.isEvenLoad = true; // 是否匀速加载进度条
  }
  componentDidMount() {
    this.preloadAssetInit();
  }
  /**
   * 资源预加载
   */
  preloadAssetInit = async () => {
    const imageList = assetList.preLoadImg;
    preloadAsset(imageList, 3, (progress) => this.onLoadingProgress(progress)).then(() => {
      // 预加载资源完成
      // 异步加载默认关闭
      // setTimeout(() => {
      //   // 异步加载资源开始
      //   const asyncImageList = assetList.asyncLoadImg;
      //   preloadAsset(asyncImageList, 1)
      // }, 5000);
    });
  };
  /**
   * 资源加载进度回调
   * @param {*} index
   * @param {*} progress
   */
  onLoadingProgress = (progress) => {
    const percentage = Math.floor(progress * 100);
    console.log("progress", percentage);
    if (this.isEvenLoad) {
      this.setEvenProgress(percentage);
    } else {
      this.setProgress(percentage);
    }
  };
  /**
   * 非匀速加载进度
   * @param {*} percentage
   */
  setProgress = (percentage) => {
    this.progressBar.style.transform = `translateX(${percentage - 100}%)`;
    if (percentage == 100) {
      setTimeout(() => {
        store.changePage(PAGE_MAP.HOME_PAGE); // 跳转页面
      }, 500);
    }
  };

  /**
   * 以1%匀速加载进度
   * @param {*} percentage
   */
  setEvenProgress = (percentage) => {
    this.intervalId && clearInterval(this.intervalId);
    let curPercentage = this.curPercentage;
    this.intervalId = setInterval(() => {
      if (curPercentage >= percentage) {
        clearInterval(this.intervalId);
        percentage == 100 && store.changePage(PAGE_MAP.HOME_PAGE); // 跳转页面
        return;
      }
      curPercentage += 1;
      this.curPercentage = curPercentage;
      this.progressBar.style.transform = `translateX(${curPercentage - 100}%)`;
    }, 10);
  };

  render() {
    return (
      <div className="loadingDemo">
        <span className="bg174"></span>
        <div className="progressBar">
          <span className="atBottom"></span>
          <span className="loadingBg">
            <span className="above" ref={(el) => (this.progressBar = el)}></span>
          </span>
        </div>
        <span className="inLoad">加载中···</span>
      </div>
    );
  }
}

export default LoadingDemo;
