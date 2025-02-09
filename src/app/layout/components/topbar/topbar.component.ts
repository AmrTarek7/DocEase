import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleClassModule } from 'primeng/styleclass';
import { AppConfigurator } from '../configurator/app.configurator.component';
import { LayoutService } from '../../../service/layout.service';

@Component({
  selector: 'app-topbar',
  imports: [RouterModule, CommonModule, StyleClassModule, AppConfigurator],
  templateUrl: './topbar.component.html',
})
export class AppTopbar {
  items!: MenuItem[];

  constructor(public layoutService: LayoutService) {}

  toggleDarkMode() {
    this.layoutService.layoutConfig.update((state) => {
      const newState = { ...state, darkTheme: !state.darkTheme };

      // تخزين القيمة الجديدة في localStorage
      localStorage.setItem('darkTheme', JSON.stringify(newState.darkTheme));
      let storedTheme: any = localStorage.getItem('darkTheme');

      if (storedTheme !== null) {
        //? boolean value تحويل القيمة المخزنة إلى
        storedTheme == 'false'
          ? (storedTheme = false)
          : storedTheme == 'true'
          ? (storedTheme = true)
          : console.log('Not Found Value');

        // الحصول على الإعدادات من localStorage وتحويلها إلى كائن
        let updatelayoutConfig: any = JSON.parse(
          localStorage.getItem('layoutConfig') || '{}'
        );

        // تحديث خاصية darkThem
        updatelayoutConfig.darkTheme = storedTheme;

        // تخزين الإعدادات المحدثة في localStorage
        localStorage.setItem(
          'layoutConfig',
          JSON.stringify(updatelayoutConfig)
        );
      }

      return newState;
    });
  }

  // ngOnInit() {
  //   const storedTheme = localStorage.getItem('darkTheme');
  //   if (storedTheme !== null) {
  //     this.layoutService.layoutConfig.update((state) => ({
  //       ...state,
  //       darkTheme: JSON.parse(storedTheme),
  //     }));
  //   }
  // }
}
