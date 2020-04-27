// components/Tabs/Tabs.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabs:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    itemIndex(e){
      console.log(e)
      let {index} = e.currentTarget.dataset;
      console.log(index);
      // 定义一个自定义事件传递参数给父组件
      this.triggerEvent("postIndex",{index})
    }
  },
  
})
