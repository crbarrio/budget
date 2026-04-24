import { Component } from '@angular/core';
import { commonText } from '../../text/text';

@Component({
  selector: 'app-navbar',
  imports: [],
  templateUrl: './navbar.html',
})
export class Navbar {
  readonly commonText = commonText;
}
