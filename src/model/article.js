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
  async likeArticle(id) {
    const res = await post(`article/like/${id}`)
    return res
  }
  async getTagList(params) {
    const res = await get('blog/tag/list', params)
    return res
  }

  async getTagInfo(id) {
    const res = await get(`blog/tag/${id}`)
    return res
  }

  async clickTag(id) {
    const res = await post(`blog/tag/${id}`)
    return res
  }

  async getAllTagList(params) {
    const res = await get('blog/tag/all', params)
    return res
  }
}

export default new ArticleApi()
