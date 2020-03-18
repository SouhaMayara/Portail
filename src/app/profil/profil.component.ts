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
  image: string | ArrayBuffer;

  constructor(private apiService: AuthService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.apiService.decodeToken();
    const id = this.activatedRoute.snapshot.paramMap.get('id')
    console.log(this.apiService.getUser());
    this.apiService.getUser().subscribe((res: any) => {
      console.log(res);
      this.user = res.data;})

  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.user.image = event.target.result;
        this.user.image.value = this.user.image.replace("C:\\fakepath\\", "");
      
      }}
    }
  updateProfile(email, firstname, lastname,grade,image) {
    //const i=0;
    const user = {
      email: email,
      firstname: firstname,
      lastname: lastname,
      grade:grade,
      image:image,
    }

    this.id = this.activatedRoute.snapshot.paramMap.get('id')
    
    this.apiService.updateUser(this.id, user).subscribe((res: any) => {
      user.image.value = user.image.value.replace("C:\\fakepath\\", "");
     console.log(user.image);
      console.log(res);
      this.ngOnInit();
    })
  }


  }


