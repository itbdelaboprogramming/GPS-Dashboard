import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './map/map-component';
import { TestComponent } from './test/test.component';

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
    path: '',
    pathMatch: 'full',
    redirectTo: '/main'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
