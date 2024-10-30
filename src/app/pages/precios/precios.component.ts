import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Precio } from '../../interfaces/precios';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-precios',
  standalone: true,
  imports: [RouterLink, FormsModule, CommonModule],
  templateUrl: './precios.component.html',
  styleUrl: './precios.component.scss'
})
export class PreciosComponent {

  

}
