import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map-component';
import { TestComponent } from './test/test.component';
import { IpInsertComponent } from './ip-insert/ip-insert.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: MapComponent
  },
  {
    path: 'main',
    component: TestComponent
  },
  {
    path: 'config',
    component: IpInsertComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/config'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
