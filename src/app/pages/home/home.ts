import { Component } from '@angular/core';
import { HeroHeader } from '../../components/hero-header/hero-header';
import { Navbar } from "../../components/navbar/navbar";
import { RouterOutlet } from "@angular/router";


@Component({
  selector: 'app-home',
  imports: [Navbar, RouterOutlet],
  templateUrl: './home.html',
})

export default class Home {

}
