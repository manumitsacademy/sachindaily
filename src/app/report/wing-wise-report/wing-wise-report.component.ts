import { Component, OnInit } from '@angular/core';
import { ReportService } from '../report.service';
import { _ } from 'underscore';
@Component({
  selector: 'app-wing-wise-report',
  templateUrl: './wing-wise-report.component.html',
  styleUrls: ['./wing-wise-report.component.css']
})
export class WingWiseReportComponent implements OnInit {
 
  constructor(public reportService:ReportService) { }
  wingWiseData={};
  wingWiseQuantity={};
  wingFlatWiseData={};
  products=[];
  wings=[];
  productIdName={};
  finalWingWiseReport=[];
  subscriptions;
  ngOnInit() {
    this.reportService.getAllSubscriptions().subscribe((subscriptions)=>{
      this.subscriptions=subscriptions;
      subscriptions.forEach((i,index)=>{
        var key;
        var ar = [];
        console.log(i.wing)
        if(this.wingWiseData[i.wing]==undefined){                   
            this.wingWiseData[i.wing]=[];        
        }
        this.wingWiseData[i.wing].push(i);
      })

      for(let key in this.wingWiseData){ 
        var ar = this.wingWiseData[key].map((a)=>{
          if(this.products.indexOf(a['productId'])==-1){
            this.products.push(a['productId'])
            this.productIdName[a['productId']]=a['productName']
          }    
          return {[a['productId']]:a['quantity']}
        })
        this.wingWiseQuantity[key] = ar;         
      }
      
      for(let wing in this.wingWiseQuantity){
        this.finalWingWiseReport.push({'wing':wing})
        this.wings.push(wing);
        for(let i=0;i<this.products.length;i++){
          let q=0;
          for(let j=0;j<this.wingWiseQuantity[wing].length;j++){
            if(this.wingWiseQuantity[wing][j][this.products[i]]){
              q=q+this.wingWiseQuantity[wing][j][this.products[i]];                            
            }
          }
          this.finalWingWiseReport[this.finalWingWiseReport.length-1][this.products[i]]=q;
        }
      }
      console.log("this.wingWiseData",this.wingWiseData)
      console.log("this.wingWiseQuantity",this.wingWiseQuantity)
      console.log("subscriptions",this.subscriptions)
    })
  }
  getProductNameById(id){
    this.reportService.getProductDetailsById(id).subscribe((res)=>{
      return res;
    })
  }
  
}