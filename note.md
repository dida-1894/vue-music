##css问题
### position: fixed 实效
- Stacking Context -- 堆叠上下文的产生
  - transform 属性值不为none
   - 我使用了better-scroll这个插件，他使得class为content的父元素transform不为none
  任何非none的transform -> 产生Stacking Content -> 影响该元素的层叠关系和定位关系 -> 影响子元素的固定定位 fixed不再基于Viewport 而是基于该元素

  - 设置了transform-style: preserve-3d 的元素
  - perspective值不为none的元素
  - 在will-change中指定了任意css熟悉
- 不同浏览器的表现


- 字体图标与文字对齐 vertical-align:middle 无效

##vue问题
- v-bind:class="{active: isActive}" 实效
