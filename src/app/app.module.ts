import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { taskReducer } from './+store/tasks/task.reducer';
import { TaskEffects } from './+store/tasks/task.effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeaturesModule } from './features/features.module';

import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    GraphQLModule,
    FeaturesModule,
    HttpClientModule,
    StoreModule.forRoot({ tasks: taskReducer }),
    EffectsModule,
    EffectsModule.forRoot([TaskEffects]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
    BrowserAnimationsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    FeaturesModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
