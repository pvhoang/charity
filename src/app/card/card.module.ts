import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { PinchZoomModule } from 'ngx-pinch-zoom';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { DynamicHooksModule, HookParserEntry } from 'ngx-dynamic-hooks';
import { CardPageRoutingModule } from './card-routing.module';

import { CardPage } from './card.page';

const componentParsers: Array<HookParserEntry> = [
  {component: CardPage},
  // ...
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PinchZoomModule,
    PdfViewerModule,
    CardPageRoutingModule,
    DynamicHooksModule.forRoot({
      globalParsers: componentParsers
    }),
  ],
  declarations: [CardPage]
})
export class CardPageModule {}
