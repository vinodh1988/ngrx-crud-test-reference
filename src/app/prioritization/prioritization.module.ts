import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrioritizationRoutingModule } from './prioritization-routing.module';
import { PrioritizationComponent } from './prioritization.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import * as fromPrioritization from '../ngrx/reducers/priority.reducer'
import { PrioritizationEffects } from '../ngrx/effects/priority.effect';


@NgModule({
  declarations: [
    PrioritizationComponent
  ],
  imports: [
    CommonModule,
    PrioritizationRoutingModule,  
    StoreModule.forFeature(fromPrioritization.prioritizationFeatureKey, fromPrioritization.reducer),
    EffectsModule.forFeature([PrioritizationEffects])
  ]
})
export class PrioritizationModule { }
