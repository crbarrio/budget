import { Component, input } from '@angular/core';
import { Navbar } from "../../components/navbar/navbar";
import { RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-home',
  imports: [Navbar, RouterOutlet],
  templateUrl: './home.html',
})

export default class Home {
}
