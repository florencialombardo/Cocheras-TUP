import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboardcontainer',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './dashboardcontainer.component.html',
  styleUrl: './dashboardcontainer.component.scss'
})
export class DashboardcontainerComponent {

}
