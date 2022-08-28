/* eslint-disable @typescript-eslint/no-var-requires */
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import Index from '@/sites/docs_vue/views/Index.vue';
import Main from '@/sites/docs_vue/views/Main.vue';
import Guide from '@/sites/docs_vue/views/Guide.vue';
import Component from '@/sites/docs_vue/views/Component.vue';
const pagesRouter: Array<RouteRecordRaw> = [];
const pagesEnRouter: Array<RouteRecordRaw> = [];
const guideRouters: Array<RouteRecordRaw> = [];
const guideEnRouters: Array<RouteRecordRaw> = [];

/** vite */

const modulesPage = (import.meta as any).glob('/src/sites/docs_vue/docs/**/doc.md');
for (const path in modulesPage) {
  let name = (/docs_vue\/docs\/(.*)\/doc.md/.exec(path) as any[])[1];
  pagesRouter.push({
    path: `/zh-CN/component/${name}`,
    component: modulesPage[path],
    name: `zh-CN/component/${name}`
  });
}

const modulesEnPage = (import.meta as any).glob('/src/sites/docs_vue/docs/**/doc.en-US.md');
for (const path in modulesEnPage) {
  let name = (/docs_vue\/docs\/(.*)\/doc.en-US.md/.exec(path) as any[])[1];
  pagesEnRouter.push({
    path: `/en-US/component/${name}`,
    component: modulesEnPage[path],
    name: `en-US/component/${name}`
  });
}

/** vite-taro **/
const modulesPageTaro = (import.meta as any).glob('/src/sites/docs_vue/docs/**/*.taro.md');
for (const path in modulesPageTaro) {
  let name = (/docs_vue\/docs\/(.*)\/doc.taro.md/.exec(path) as any[])[1];
  pagesRouter.push({
    path: `/zh-CN/component/${name}-taro`,
    component: modulesPageTaro[path],
    name: `zh-CN/component/${name}-taro`
  });
  pagesEnRouter.push({
    path: `/en-US/component/${name}-taro`,
    component: modulesPageTaro[path],
    name: `en-US/component/${name}-taro`
  });
}

/** vite */
const modulesDocs = (import.meta as any).glob('/src/sites/docs/*.md');
for (const path in modulesDocs) {
  let name = (/docs\/(.*).md/.exec(path) as any[])[1];
  guideRouters.push({
    path: `/zh-CN/guide/${name}`,
    component: modulesDocs[path],
    name
  });
}
const modulesEnDocs = (import.meta as any).glob('/src/sites/docs/*.en-US.md');
for (const path in modulesEnDocs) {
  let name = (/docs\/(.*).en-US.md/.exec(path) as any[])[1];
  guideEnRouters.push({
    path: `/en-US/guide/${name}`,
    component: modulesEnDocs[path],
    name: `en-${name}`
  });
}

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: '/',
    component: Main
    // children: pagesRouter
  },
  {
    path: '/index',
    name: 'index',
    component: Index,
    children: [
      {
        path: '/zh-CN/guide',
        name: 'guide',
        component: Guide,
        children: guideRouters
      },
      {
        path: '/en-US/guide',
        name: 'enGuide',
        component: Guide,
        children: guideEnRouters
      },
      {
        path: '/zh-CN/component',
        name: 'component',
        component: Component,
        children: pagesRouter
      },
      {
        path: '/en-US/component',
        name: 'enComponent',
        component: Component,
        children: pagesEnRouter
      }
    ]
  }
];
routes.push({
  name: 'notFound',
  path: '/:path(.*)+',
  redirect: {
    name: '/'
  }
});

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(to) {
    if (to.hash) {
      const id = to.hash.split('#')[1];
      const ele = document.getElementById(id);
      setTimeout(() => {
        ele && ele.scrollIntoView(true);
      });
    }
  }
});
router.afterEach((to, from) => {
  window.scrollTo(0, 0);
});
export default router;
