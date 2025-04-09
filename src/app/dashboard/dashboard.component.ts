import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  @Input() title!: string;  // Title of the card
  @Input() count!: number;  // Dynamic count
  @Input() bgClass!: string;  // Background color class
  @Input() iconClass!: string;  // Icon class for Font Awesome icons
}
