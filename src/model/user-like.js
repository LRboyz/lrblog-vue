import { post } from '@/lin/plugin/axios'

class UserLike {
  // constructor() {}

  async likeOrCancel(info) {
    const res = await post('blog/comment/user-like', info)
    return res
  }
}

export default new UserLike()
