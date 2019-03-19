/**
 * @author lsz
 * @type {Object}
 * @desc 路由表:
 * -------------------------------------------------------
 *   desc ---说明
 *     |
 *   children --子集
 *     |_______
 *             |
 *             path:路由名(具有唯一性)
 *             |
 *             vue:vue名(当 vue==path  可不定义此属性 )
 *             |
 *             desc:说明
 *---------------------------------------------------------
 *eg:
 *toLnk: /weather/${path}
 */
export const router = {
  'desc': '用户管理',
  'children': [{
    'path': 'demo',
    'vue': 'Demo',
    'desc': 'demo'
  }]
}
