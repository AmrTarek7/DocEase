import { Component, computed, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { LayoutService } from '../../service/layout.service';
import { AppConfigurator } from '../../components/app.configurator';
import { StyleClassModule } from 'primeng/styleclass';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  imports: [ButtonModule, AppConfigurator, StyleClassModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent implements OnInit {
  LayoutService = inject(LayoutService);

  // isDarkTheme = computed(() => this.LayoutService.layoutConfig().darkTheme);
  isDarkTheme = computed(() => {
    const storedTheme = localStorage.getItem('darkTheme');
    return storedTheme !== null
      ? JSON.parse(storedTheme)
      : this.LayoutService.layoutConfig().darkTheme;
  });
  // toggleDarkMode() {
  //   this.LayoutService.layoutConfig.update((state) => ({
  //     ...state,
  //     darkTheme: !state.darkTheme,
  //   }));
  // }

  toggleDarkMode() {
    this.LayoutService.layoutConfig.update((state) => {
      const newState = { ...state, darkTheme: !state.darkTheme };

      // تخزين القيمة الجديدة في sessionStorage
      localStorage.setItem('darkTheme', JSON.stringify(newState.darkTheme));

      return newState;
    });
  }

  ngOnInit() {
    const storedTheme = localStorage.getItem('darkTheme');
    if (storedTheme !== null) {
      this.LayoutService.layoutConfig.update((state) => ({
        ...state,
        darkTheme: JSON.parse(storedTheme),
      }));
    }
  }
}
