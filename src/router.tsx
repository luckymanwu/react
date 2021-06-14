import * as React from "react";
import { RouteConfig } from "react-router-config";
import * as pages from "./pages";
import { Redirect } from "react-router-dom";

export const Config:RouteConfig[] = [
  {
    path: "/",
    component:pages.Layout,
    routes: [
        {
            path: "/",
            exact: true,
            component: () => <Redirect to="/DiscussPost"></Redirect>,
          },
          {
            title: "DiscussPost",
            path: "/DiscussPost",
            id: "DiscussPost",
            component: React.lazy(() =>
              import("./pages/DiscussPost").then(
                ({ DiscussPostPage }) => ({
                  default: DiscussPostPage
                })
              )
            ),
          },
          {
            title: "Register",
            path: "/Register",
            id: "Register",
            component: React.lazy(() =>
              import("./pages/Register").then(
                ({ RegisterPage }) => ({
                  default: RegisterPage
                })
              )
            ),
          } ,
          {
            title: "Login",
            path: "/Login",
            id: "Login",
            component: React.lazy(() =>
              import("./pages/Login").then(
                ({ LoginPage }) => ({
                  default: LoginPage
                })
              )
            ),
          } ,
          {
            title: "OperateResult",
            path: "/OperateResult",
            id: "OperateResult",
            component: React.lazy(() =>
              import("./pages/OperateResult").then(
                ({ OperateResultPage }) => ({
                  default: OperateResultPage
                })
              )
            ),
          } ,
          {
            title: "Setting",
            path: "/Setting",
            id: "Setting",
            component: React.lazy(() =>
              import("./pages/Setting").then(
                ({ SettingPage }) => ({
                  default: SettingPage
                })
              )
            ),
          },
          {
            title: "Profile",
            path: "/Profile",
            id: "Profile",
            component: React.lazy(() =>
              import("./pages/Profile").then(
                ({ ProfilePage }) => ({
                  default: ProfilePage
                })
              )
            ),
          } ,
          {
            title: "DiscussPostDetail",
            path: "/DiscussPostDetail",
            id: "DiscussPostDetail",
            component: React.lazy(() =>
              import("./pages/DiscussPostDetail").then(
                ({ DiscussPostDetailPage }) => ({
                  default: DiscussPostDetailPage
                })
              )
            ),
          } ,
          {
            title: "Letter",
            path: "/Letter",
            id: "Letter",
            component: React.lazy(() =>
              import("./pages/Letter").then(
                ({ LetterPage }) => ({
                  default: LetterPage
                })
              )
            ),
          } ,
          {
            title: "LetterDetail",
            path: "/LetterDetail",
            id: "LetterDetail",
            component: React.lazy(() =>
              import("./pages/LetterDetail").then(
                ({ LetterDetailPage }) => ({
                  default: LetterDetailPage
                })
              )
            ),
          } ,
          {
            title: "ChatWidget",
            path: "/ChatWidget",
            id: "ChatWidget",
            component: React.lazy(() =>
              import("./pages/ChatWidget").then(
                ({ ChatWidgetPage }) => ({
                  default: ChatWidgetPage
                })
              )
            ),
          } ,
          {
            title: "Fans",
            path: "/Fans",
            id: "Fans",
            component: React.lazy(() =>
              import("./pages/Fans").then(
                ({ FansPage }) => ({
                  default: FansPage
                })
              )
            ),
          } ,
          {
            title: "Follower",
            path: "/Follower",
            id: "Follower",
            component: React.lazy(() =>
              import("./pages/Follower").then(
                ({ FollowerPage }) => ({
                  default: FollowerPage
                })
              )
            ),
          } ,
          {
            title: "NoticeDetail",
            path: "/NoticeDetail",
            id: "NoticeDetail",
            component: React.lazy(() =>
              import("./pages/NoticeDetail").then(
                ({ NoticeDetailPage }) => ({
                  default: NoticeDetailPage
                })
              )
            ),
          } ,
           {
            title: "Notice",
            path: "/Notice",
            id: "Notice",
            component: React.lazy(() =>
              import("./pages/Notice").then(
                ({ NoticePage }) => ({
                  default: NoticePage
                })
              )
            ),
          } ,
          {
            title: "Search",
            path: "/Search",
            id: "Search",
            component: React.lazy(() =>
              import("./pages/Search").then(
                ({ SearchPage }) => ({
                  default: SearchPage
                })
              )
            ),
          } ,
          {
            title: "MyPost",
            path: "/MyPost",
            id: "MyPost",
            component: React.lazy(() =>
              import("./pages/MyPost").then(
                ({ MyPostPage }) => ({
                  default: MyPostPage
                })
              )
            ),
          } ,
          {
            title: "MyReply",
            path: "/MyReply",
            id: "MyReply",
            component: React.lazy(() =>
              import("./pages/MyReply").then(
                ({ MyReplyPage }) => ({
                  default: MyReplyPage
                })
              )
            ),
          } ,
          {
            title: "Statistics",
            path: "/Statistics",
            id: "Statistics",
            component: React.lazy(() =>
              import("./pages/Statistics").then(
                ({ StatisticsPage }) => ({
                  default: StatisticsPage
                })
              )
            ),
          } ,
     ]
    
  }
 ]

