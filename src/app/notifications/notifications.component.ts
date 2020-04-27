import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { ToastrService } from 'ngx-toastr';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
  providers: [DatePipe]
})
export class NotificationsComponent implements OnInit {
  

  
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
  toastContainer: any;
  myDate = new Date();
  test: string;
  constructor(private toastr: ToastrService,private http:HttpClient,private apiService: AuthService, private activatedRoute: ActivatedRoute,private datePipe: DatePipe ) {
    //console.log("homeComponent*********************************");
    }

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
              this.notifications.push(notif.message + this.nb[index])
              console.log("notifications",this.notifications); 
              console.log(notif.message)
              //console.log(this.pourcentage[index]);  
            }else if(this.pourcentage[index] >= 30){

              setTimeout(() => this.toastr.error("You are eliminated in "+ this.noms[index])) 
              const notif=this.toastr.warning(this.user.firstname +' watch your absence in '+ this.noms[index][0]);
              this.notifications.push(notif.message)
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
            console.log(this.nb[index].date);
            var k=this.nb[index].date
            //k=this.datePipe .transform( k , 'yyyy-MM-ddThh:mm')
            //var h = k.getHours(); 
           // var m = this.nb[index].date.getMinutes();
            //var d = this.nb[index].date.getHours();
            console.log( this.noms[index][0],this.nb[index].note);
            //console.log(d);
            var d=new Date(k);
            
            this.value=this.nb[index].note.toString()
            if(this.value !== null)
            {
               
              //console.log(this.noms[index])
              //this.toastr.warning(this.user.firstname +' check your grades in '+ this.noms[index][0]))
               const notif=this.toastr.warning(this.user.firstname +' check your grades in '+ this.noms[index][0]);
               this.notifications.push(notif.message +" "+ k )
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
