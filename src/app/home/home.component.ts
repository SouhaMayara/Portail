import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
//import * as jwt_decode from 'jwt-decode';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { json } from 'body-parser';
import { HttpClient } from '@angular/common/http';
import { ToastrService, ToastContainerDirective } from 'ngx-toastr';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild(ToastContainerDirective, {static: true}) toastContainer: ToastContainerDirective;

  user:any;
  id:any;
  selectedFile=null;
  public idd;
  articles: any;
  pageChange;
  p;
  userG;
  idG;
  matieres=[];
  noms=[];
  nb=[];
  pourcentage=[];
  ntotal=[];

  notifications =[];
  mat;
  listeId=[];
  n=0;  
  value: any;
  get notif() {
    return this.notifications=[];
}
  constructor(private toastr: ToastrService,private http:HttpClient,private apiService: AuthService, private activatedRoute: ActivatedRoute) {console.log("homeComponent*********************************");}

  ngOnInit() {
    
    //setTimeout(() => this.toastr.success('sup'))
    //this.toastrService.overlayContainer = this.toastContainer;
    //this.id= jwt_decode(localStorage.getItem('token'));
    this.apiService.decodeToken();
    this.toastr.overlayContainer = this.toastContainer;
    //let id = parseInt(this.activatedRoute.snapshot.paramMap.get('_id'));
    //console.log(parseInt(this.activatedRoute.parent.snapshot.paramMap.get('id')));
    //console.log(id);
    //console.log(parseInt(this.activatedRoute.parent.snapshot.params.id));
    this.apiService.getUser().subscribe((res: any) => {
      console.log(res);
      this.user = res.data;
      this.idG=this.user.groupe;
      console.log(this.idG);
      this.apiService.getMatiere(this.idG).subscribe((res: any) => {
        //console.log(res);
        this.matieres = res.data;

       // console.log(this.userG[0].groupe.nom);
        for (let index = 0; index < this.matieres.length; index++) {
          const idMatiere=this.matieres[index];
          //console.log(idMatiere);
          this.listeId[index]=this.matieres[index];
          console.log(this.listeId);
          this.apiService.getMatiereById(idMatiere).subscribe((res: any) => {
            this.mat = res.data;
            this.noms[index]=this.mat.nom;
            this.ntotal[index]=this.mat.nbreHeures;
          /*const nom = this.matieres[index].matiere.nom;//nom_matiere;
          const idd=this.matieres[index]._id;
          this.noms[index]=nom;
          this.idmat[index]=idd;
          this.ntotal[index]=this.matieres[index].nbreHeures;*/
          console.log(this.user._id);
          console.log(this.listeId[index]);
          this.apiService.getnbAbsence(this.user._id,this.listeId[index]).subscribe((res: any) => {
            console.log(res);
            this.nb[index] = res.data;
            this.pourcentage[index]=(parseInt(this.nb[index])/(parseInt(this.ntotal[index])))*100;
            console.log(this.pourcentage[index]);  
            if(this.pourcentage[index] < 30 && this.pourcentage[index] >=5){
              setTimeout(() => this.toastr.warning(this.user.firstname +' watch your absence in '+ this.noms[index][0]))
              //this.n++; 
              const notif=this.toastr.warning(this.user.firstname +' watch your absence in '+ this.noms[index][0]);
              this.notifications.push(notif.message)
              console.log("notifications",this.notifications); 
              console.log(notif.message)
              //console.log(this.pourcentage[index]);  
            }else if(this.pourcentage[index] >= 30){

              setTimeout(() => this.toastr.error("You are eliminated in "+ this.noms[index])) 
             //this.n++;
            //console.log(this.n)
          }

          });
          });
        
        }
        
        console.log(this.noms);
        console.log(this.nb);
        //console.log(this.matiere.nom);
    
      });

      this.apiService.getMatiere(this.idG).subscribe((res: any) => {
        this.matieres = res.data;
        for (let index = 0; index < this.matieres.length; index++) {
          const idMatiere=this.matieres[index];
          this.listeId[index]=this.matieres[index];
          console.log(this.listeId);

          this.apiService.getMatiereById(idMatiere).subscribe((res: any) => {
            this.mat = res.data;
            this.noms[index]=[this.mat.nom,this.matieres[index]];
           
          console.log(this.noms);
          console.log(this.user._id);
          console.log(this.listeId[index]);
          this.apiService.getNote(this.user._id,this.listeId[index]).subscribe((res: any) => { 
            this.nb = res.data;
            console.log("ghada");
            console.log( this.noms[index][0],this.nb[index].note);
            this.value=this.nb[index].note.toString()
            if(this.value !== null)
            {
              
              //console.log(this.noms[index])
               setTimeout(() => this.toastr.warning(this.user.firstname +' check your grades in  '+ this.noms[index][0]))
               const notif=this.toastr.warning(this.user.firstname +' check your grades in  '+ this.noms[index][0]);
              this.notifications.push(notif.message)
              console.log("notifications",this.notifications); 
              console.log(notif.message)
            }
            else{
              //console.log(this.value)
            }
           
            
         
         
          });
         
          // console.log(this.nb);  
          });
        }
        // console.log(this.noms);
        // console.log(this.nb);

    
      });

      
    });

   
  
  

  }
 

  

}
