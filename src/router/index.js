import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import menu from '@/components/menu/menu'
import A_page from '@/components/page/A_page'
import B_page from '@/components/page/B_page'
import C_page from '@/components/page/C_page'
import D_page from '@/components/page/D_page'
Vue.use(Router)

export default new Router({
	routes: [{
		path: '/',
		name: 'HelloWorld',
		component: HelloWorld
	}, {
		path: '/menu',
		name: 'menu',
		component: menu,
		children: [{
			path: 'A_page',
			component: A_page,
		}, {
			path: 'B_page',
			component: B_page,
		}, {
			path: 'C_page',
			component: C_page,
		}, {
			path: 'D_page',
			component: D_page,
		}]
	}]
})