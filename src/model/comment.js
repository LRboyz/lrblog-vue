import { post, get, put, _delete } from '@/lin/plugin/axios'

class Comment {
  // constructor() {}

  async addComment(info) {
    const res = await post('blog/comment', info)
    return res
  }

  async addReplyComment(id, params) {
    const res = await post(`blog/comment/${id}`, params)
    return res
  }

  async getComment(id) {
    const res = await get(`blog/comment/${id}`)
    return res
  }

  async editComment(id, info) {
    const res = await put(`blog/comment/${id}`, info)
    return res
  }

  async delectComment(id) {
    const res = await _delete(`blog/comment/${id}`)
    return res
  }

  async getPublicComments(pagesParmas) {
    const res = await get('blog/comment/public', pagesParmas)
    return res
  }
}

export default new Comment()
