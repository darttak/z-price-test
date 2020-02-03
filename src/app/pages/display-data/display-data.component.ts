import { Component } from '@angular/core';
import 'devextreme/data/odata/store';
import ArrayStore from "devextreme/data/array_store";
import { HttpClient, HttpClientModule, HttpParams } from '@angular/common/http';
import CustomStore from 'devextreme/data/custom_store';
import DataSource from 'devextreme/data/data_source';

@Component({
  templateUrl: 'display-data.component.html'
})

export class DisplayDataComponent {
  dataSource: any;
  priority: any[];
  usersDataSourceStorage: any;
  positionDisableSorting = false;

  constructor(httpClient: HttpClient) {
    this.usersDataSourceStorage = [];
    this.dataSource = new CustomStore({
      key: "login.uuid",
      load: function (loadOptions: any) {
        return httpClient.get('https://randomuser.me/api/?results=100&nat=US&seed=c742b7d1b05e107b', { params: {} })
            .toPromise()
            .then((data: any) => {
                return {
                  data: data.results
                };
            })
            
      .catch(error => { console.log(error); throw 'Data Loading Error';  });
      }
  });
  }
  getUser(data) {
    let key = data.key;
    
    let item = this.usersDataSourceStorage.find((i) => i.key === key);
          if (!item) {
              item = {
                  key: key,
                  dataSourceInstance: new DataSource({
                      store: new ArrayStore({
                          data: [data.data],
                          key: "login.uuid"
                      }),
                      filter: ["login.uuid", "=", key]
                  })
              };
              this.usersDataSourceStorage.push(item)
          }
          return item.dataSourceInstance;
  }  
  gender(rowData){
    return rowData.gender;
  }
  city(rowData){
    return rowData.location.city;
  }
  emailAddress(rowData){
    return rowData.email;
  }
  getPicture(rowData) {
    return rowData.picture.thumbnail;
  }
  phoneNumber(rowData){
    return rowData.phone;
  }
  calculateName(rowData) {
    return rowData.name.first + " " + rowData.name.last;
  }
  calculateAddress(rowData) {
    return rowData.location.street.number + " " + rowData.location.street.name;
  }
}

