import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit{

  constructor(private activateRoute:ActivatedRoute, private product:ProductService){}

  searchResult:undefined|Product[];
  ngOnInit(): void {
      let query = this.activateRoute.snapshot.paramMap.get('query');
      console.log(query);
      query && this.product.searchProducts(query).subscribe((result) => {
        this.searchResult=result;
      })
  }
}
