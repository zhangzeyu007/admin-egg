const routes = [
  {
    path: "/aiqiyi",
    name: "Aiqiyi",
    meta: {
      title: "爱奇艺",
      roles: [1, 2, 3],
    },
    component: () => import("@/views/video/Aiqiyi.vue"),
    children: [],
  },
  {
    path: "/video",
    name: "video",
    meta: {
      title: "视频上传",
      roles: [1, 2, 3],
    },
    component: () => import("@/views/video/Aiqiyi.vue"),
  },
];

export default {
  routes,
};
