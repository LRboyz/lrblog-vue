/* eslint-disable */
import { post, get, put, _delete } from '@/lin/plugin/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class ArticleApi {
  // constructor() {}
  async getArticleList(params) {
    const res = await get('blog/article/list', params)
    return res
  }
  async gethotArticleList(params) {
    const res = await get('blog/hot/list', params)
    return res
  }
  async getTagList(params) {
    const res = await get('blog/tag/list', params)
    return res
  }
}

export default new ArticleApi()
