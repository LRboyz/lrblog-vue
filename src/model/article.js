/* eslint-disable */
import { post, get, put, _delete } from '@/lin/plugin/axios'

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
  async getArticleDetail(id) {
    // id 是 article_id
    const res = await get(`article/detail/${id}`)
    return res
  }
  async getArticleArchive() {
    const res = await get('article/archive')
    return res
  }
  async getTagList(params) {
    const res = await get('blog/tag/list', params)
    return res
  }
}

export default new ArticleApi()
