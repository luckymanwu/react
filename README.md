# NEWCODER COMMUNITY
本项目为仿牛客社区的前端工程,实现注册登录，帖子按照热度时间排序，评论发帖，私信系统通知，点赞关注，个人信息设置等功能
后端代码路径：https://github.com/luckymanwu/community
代码架构清晰，可扩展性很好，适合前端新手学习！！！
## 技术栈
前端：
React + TS
UI: AntDesign + bootstrap
后端：
Springboot + mysql + redis + es + kafka 
当下最热门的主流开发技术栈，适合后端新手快速入门学习
## 架构思路：

### 整体开发逻辑：
推崇stateless component，所有数据尽量用redux管理，在actions中将逻辑抽象出来，写成纯函数，放在utils中，便于单元测试，同时数据集中管理，出问题只需去看处理数据的纯函数，大幅降低出错风险，便于快速定位问题（大多数bug会出在前端数据逻辑处理上，将这块抽象成纯函数非常必要）

##### 关于页面：
 - 每个页面 仅有路由的页面连接redux，子页面均通过 {...this.props} 的形式传值，保证数据流向单一
 - 页面中的模块，若有复用可能，放在app文件夹中，否则放在页面index.tsx同级
 - 每个页面/模块可以通过 import { {$pageName}Actions } from 'actions/$pageName' 的形式获得action 然后进行dispatch

##### 关于redux：
 - 每个页面是自己的一个小的store，所以每个页面只需要维护自己的小store，大多数情况只需要一个更新操作来更新这个小store
    更新操作如下：
       ```
        updateProps: (payload) => (dispatch) => {
          return dispatch({
            type: UPDATE_template_PROPS,
            payload: payload,
          });
        }
       ```

    对应只需要一个reducer：
       ```
        templateProps: (
          state = {
            demo: 1,
          },
          { payload, type }
        ) => {
          if (type !== UPDATE_template_PROPS) return state;
          return { ...state, ...payload };
        },
       ```

##### 开发建议：
 - 由component自己生成，并只给自己使用的数据，用 react state 管理，其余全部去store
 - 由于 store 为统一的merge更新操作，要求数据扁平，无法扁平化的数据需要增加reducer（偏平数据能覆盖大于80%的场景）
