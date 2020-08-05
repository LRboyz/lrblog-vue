/* eslint-disable */
import { post, get, put, _delete } from '@/lin/plugin/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class CategoryApi {
  // constructor() {}
  async getCategorys(params) {
    const res = await get('blog/category/list', params)
    return res
  }
}

export default new CategoryApi()
