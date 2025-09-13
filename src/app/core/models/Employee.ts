export interface Employee {
  id: string;        
  name: string;
  emailId: string;
  mobile: string;
  countryId?: string; 
  countryName?: string; 
  state?: string;
  district?: string;
 position?: string; 
 country:any;
}


export interface Country {
  id: string;
  name: string;
}