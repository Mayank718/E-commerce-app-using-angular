import { Component, OnInit } from '@angular/core';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  // images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  popularProducts: undefined | Product[];
  trendyProducts: undefined | Product[];

  constructor(private product:ProductService){}

  ngOnInit(): void {
      this.product.popularProducts().subscribe((data) => {
        console.log(data)
        this.popularProducts=data;
      });

      this.product.trendyProducts().subscribe((data) => {
        // console.log(data)
        this.trendyProducts=data;
      });
  }
}
