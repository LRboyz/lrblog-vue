<template>
  <div class="about-container">
    <el-row :gutter="24" style="margin-left: 0px; margin-right: 0px;">
      <el-col :span="24">
        <div class="header-info">
          <div class="welcome">
            <div class="subtitle">
              <h2 class="fw-bold logo-title"><span class="fw-bold">LR</span>Blog</h2>
              <p class="logo-desc fs-sm">A blog to share technology and life</p>
              <p class="logo-desc fs-sm">Author : <span class="theme ml-10">LRboy</span></p>
              <div class="link"><a href="https://www.talelin.com" target="_blank">http://blog.lrboy.live</a></div>
            </div>
          </div>
          <img class="welcome-bg" src="../../assets/image/blog/header-bg.png" alt="" />
        </div>
        <div class="content">
          <div class="cont-left">
            <el-card>
              <el-tabs value="about">
                <el-tab-pane label="ABOUT ME" name="about">
                  <div class="about fs-sm">
                    <p><strong style="font-weight: bold;">LRboy</strong></p>
                    <p class="mt-10">
                      Web自由开发者，目前大三在读,曾就职于两家互联网公司任前端开发工程师，前端采用过Vue 、React,
                      后端为Nodejs、Python
                      Flask。本人热情随和，良好的协调沟通能力，适应力强。对新技术有敏锐的感觉和浓厚的兴趣，目前从事基于
                      Linux/Python/Golang 的运维开发工作.
                    </p>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-card>
            <el-card class="mt-20">
              <el-tabs value="introduce" class="mt-20">
                <el-tab-pane label="BlOG INTRODUCE" name="introduce">
                  <h4 v-for="(int, index) in introduces" :key="index" class="introduce">
                    <i class="right el-icon-caret-right"></i>
                    <span class="fs-sm">{{ int }}</span>
                  </h4>
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </div>
          <div class="cont-right">
            <el-card>
              <el-tabs value="skill">
                <el-tab-pane label="MY SKILL" name="skill">
                  <div class="info" v-for="(item, index) in skills" :key="index">
                    <h3>{{ item.skill }}</h3>
                    <div class="progress">
                      <!-- {{ item.degree }} -->
                      <div
                        class="degree"
                        :style="{
                          backgroundColor:
                            '#' +
                            Math.random()
                              .toString(16)
                              .slice(2, 8),
                          width: item.degree + '%',
                        }"
                      ></div>
                    </div>
                  </div>
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'about',
  data() {
    return {
      introduces: [
        '本套博客系统分为两端, 一套客户端博客系统、一套CMS管理端，两端均采用Vue.js开发，前后端分离模式',
        '前端采用林间有风团队作品“LinCmsVue”二次开发, 前端主要技术为Vue、axios、LocalStorage、UI库为Element UI、',
        '支持本地用户注册登录、后期再考虑开发OAuth2第三方登录（Github/Weibo）（待开发）',
        '后端技术主要采用技术为：Python3、Flask、数据库采用非关系型数据库MongoDB，实现Restful API, ORM 组件为 MongoEngine（使用 Flask-MongoEngine 插件）',
        '部署方案主要采用阿里云服务器、Docker，Nginx',
        '发布文章的内容支持普通文章、HTML、 Markdown（支持代码片段、代码高亮等功能）',
        '支持文章评论、点赞等功能（ 如果以后用户量多再考虑增加文章收藏、用户关注喜欢等功能，敬请期待～ ）',
        '后台管理系统采用技术同上，实现文章的增删改查功能和用户的管理功能，以及日志的收集功能',
      ],
      skills: [
        {
          skill: 'Linux / Shell -  熟悉',
          degree: 40,
        },
        {
          skill: 'Python / Flask / 爬虫 - 熟悉',
          degree: 40,
        },
        {
          skill: 'Java / Spring / SpringBoot - 熟悉',
          degree: 20,
        },
        {
          skill: 'HTML5 / CSS3 / JavaScript ES6 - 熟练',
          degree: 60,
        },
        {
          skill: 'Bootstrap / jQuery / Vue.js / React - 熟练',
          degree: 60,
        },
        {
          skill: 'MySQL / Redis / MongoDB - 熟悉',
          degree: 45,
        },
        {
          skill: 'Docker - 熟悉',
          degree: 25,
        },
        {
          skill: 'Git - 熟悉',
          degree: 35,
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.about-container {
  margin-right: auto;
  margin-left: auto;
  width: 100%;
  min-height: calc(90vh - 200px);
  .header-info {
    // max-width: 1140px;
    padding: 20px 0;
    position: relative;
    width: 97%;
    height: 100%;
    background: #d6eaf7;
    box-shadow: 0px 2px 14px 0px rgba(243, 243, 243, 1);
    border-radius: 8px;
    .welcome {
      margin: 28px 0 0 30px;
      .welcome-title {
        margin-bottom: 30px;
        color: #fff;
        font-weight: bold;
        font-size: 24px;
      }
      .subtitle {
        display: flex;
        flex-direction: column;
        margin-top: 16px;
        color: #fff;
        .logo-title {
          font-size: 24px;
          font-family: 'Courier New', Courier, monospace 'Helvetica Neue', sans-serif;
          text-align: left;
          color: #000;
          span {
            color: #2554ba;
          }
        }
        .logo-desc {
          font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
          text-align: left;
          margin-top: 10px;
          color: #989a97;
          span {
            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
          }
        }
        .link {
          font-size: 14px;
          padding: 2px 0px;
          margin-top: 15px;
          width: 200px;
          height: 22px;
          background: rgb(88, 126, 231);
          border-radius: 11px;
          text-align: center;
          line-height: 20px;
          color: rgba(255, 255, 255, 1);
        }
      }
    }
    .welcome-bg {
      margin: 0 auto;
      position: absolute;
      bottom: 0;
      right: 10px;
      width: 400px;
      height: 120px;
    }
  }
  .content {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin-right: -15px;
    margin-left: -15px;
    .cont-left {
      // width: 48%;
      flex: 0 0 50%;
      // background: turquoise;
      padding: 20px;
      // flex-basis: 50%;
      .about {
        font-weight: bold;
        text-align: left;
        line-height: 20px;
      }
      .introduce {
        font-weight: bold;
        // font-style: italic;
        display: flex;
        margin-top: 10px;
        text-align: left;
        line-height: 20px;
        .right {
          margin-top: 3px;
          color: #ccc;
          display: inline-block;
          font-size: inherit;
          text-rendering: auto;
          margin-right: 5px;
        }
        span {
          color: rgb(75, 74, 74);
        }
      }
    }
    .cont-right {
      flex: 1;
      padding: 20px;
      .skill {
        text-align: left;
      }
      .info {
        margin-top: 20px;
        text-align: left;
        h3 {
          font-size: 14px;
          margin-top: 20px;
        }
        .progress {
          position: relative;
          margin-top: 10px;
          width: 100%;
          border-radius: 20px;
          height: 25px;
          background: #eeeeee;
          .degree {
            position: absolute;
            border-radius: 20px;
            height: 100%;
            left: 0;
            top: 0;
            // width: 70%;
            // background: red;
          }
        }
      }
    }
  }
  @media (max-width: 680px) {
    .welcome-bg {
      display: none;
    }
    .content {
      .cont-left {
        flex-basis: 100%;
      }
      .cont-right {
        flex-basis: 100%;
      }
    }
  }
}
</style>
