import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  user: any;
  id: string;
  image: string ;

  constructor(private apiService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.apiService.decodeToken();
    //const id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.apiService.getUser());
    this.apiService.getUser().subscribe((res: any) => {
      
      this.user = res.data;
      console.log(this.user.image);
     //this.user.image= this.user.image.replace("C:\\fakepath\\", "");
    
     this.user=res.data;
     console.log(res)
    })

  }

  SelectImage(event) {
    if (event.target.files.length>0) {
      const file=event.target.files[0];
      this.image=file;
     
      }
    
    }
    updateProfile(email, firstname, lastname,grade,password) {
    
      const user = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        grade:grade,
        password:password
       
      }
  
      this.id = this.activatedRoute.snapshot.paramMap.get('id')
      this.apiService.updateUser(this.id, user).subscribe((res: any) => { 
        this.user.password=
      console.log(this.user.image);
      console.log(res);
      this.ngOnInit();
      
      })

    
    }

    updateProfileImage(image) {
      //const i=0;
      const formData=new FormData();
      formData.append('image',this.image)
      const user = {
        image:formData,
      }
  
      this.id = this.activatedRoute.snapshot.paramMap.get('id')
      this.apiService.updatePhoto(this.id, formData).subscribe((res: any) => {
      console.log(this.user.image);
      console.log(res); 
      this.ngOnInit();
      window.location.reload();
      //console.log(this.onSelectFile(onchange))
      //console.log(this.user.image);
     
     // location.reload(); 
      
      })
    }

  }


