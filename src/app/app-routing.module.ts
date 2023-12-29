import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { authGuard } from './auth/auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { HomePage } from './home/home.page';
import { CategoriesComponent } from './categories/categories.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { AddRecipeComponent } from './add-recipe/add-recipe.component';
import { DetailsComponent } from './details/details.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

const routes: Routes = [
  {
    path: 'home/edit/:sira',
    component: EditRecipeComponent
  },
  {
    path: 'home/details/:sira',
    component: DetailsComponent
  },
  {
    path: 'home/add',
    component: AddRecipeComponent
  },
  {
    path: 'home',
    component: HomePage,
    canActivate: [authGuard],
  },
  {
    path: 'kategoriler/add',
    component: AddCategoryComponent
  },
  {
    path: 'kategoriler',
    component: CategoriesComponent
  },
  { path: 'settings', component: SettingsComponent },
  { path: 'auth', component: AuthComponent },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
