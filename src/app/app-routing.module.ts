import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'tab/:id',
    loadChildren: () => import('./tab/tab.module').then( m => m.TabPageModule)
  },
  {
    path: 'card/:id',
    loadChildren: () => import('./card/card.module').then( m => m.CardPageModule)
  },
  {
    path: 'setting/:id',
    loadChildren: () => import('./setting/setting.module').then( m => m.SettingPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
