import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { RegistrationComponent } from './pages/auth/registration/registration.component';
import { SetsListComponent } from './pages/sets-list/sets-list.component';
import { FlashcardsListComponent } from './pages/flashcards-list/flashcards-list.component';
import { LearnComponent } from './pages/learn/learn.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegistrationComponent },
    { path: 'sets', component: SetsListComponent },
    { path: 'sets/:setId/flashcards', component: FlashcardsListComponent },
    { path: 'sets/:setId/learn', component: LearnComponent },
    { path: '', component: HomeComponent },
    { path: '**', component: PageNotFoundComponent }
];
