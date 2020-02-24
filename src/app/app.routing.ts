import { Routes } from '@angular/router';
import { IndexComponent } from './index/index.component';


export const AppRoutes: Routes = [
	{
		path: '',
		children: [
			{
				path: '',
				loadChildren: './index/index.module#IndexModule'
			},
			{
				path: 'products',
				loadChildren: './layouts/product/product.module#ProductModule'
			},
			{
				path: 'users',
				loadChildren: './layouts/user/user.module#UserModule'
			},
			{
				path: 'task-board',
				loadChildren: './layouts/task-board/task-board.module#TaskBoardModule'
			}
		]
	},

];
