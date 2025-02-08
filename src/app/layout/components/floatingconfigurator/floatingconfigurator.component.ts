import { Component, computed, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LayoutService } from '../../../service/layout.service';
import { AppConfigurator } from '../app.configurator';
import { StyleClassModule } from 'primeng/styleclass';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-floating-configurator',
  imports: [ButtonModule, AppConfigurator, StyleClassModule, FormsModule],
  templateUrl: './floatingconfigurator.component.html',
  styles: '',
})
export class AppFloatingConfigurator {
  LayoutService = inject(LayoutService);

  isDarkTheme = computed(() => this.LayoutService.layoutConfig().darkTheme);

  toggleDarkMode() {
    this.LayoutService.layoutConfig.update((state) => {
      const newState = { ...state, darkTheme: !state.darkTheme };
      console.log(newState);

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
  //     this.LayoutService.layoutConfig.update((state) => ({
  //       ...state,
  //       darkTheme: JSON.parse(storedTheme),
  //     }));
  //   }
  // }
}
