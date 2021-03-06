import 'rxjs/add/operator/switchMap';
import { Component,  OnInit }      from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location }               from '@angular/common';

import { User }         from '../../../User';
import { imgService } from '../../_services/img.service';
import { UserService } from '../../_services/user.service';
@Component({
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
})

export class EditProfileComponent implements OnInit{
  user: User;
  lang_values: String[] = ["Afrikanns","Albanian","Arabic","Armenian","Basque","Bengali","Bulgarian","Catalan","Cambodian","Chinese (Mandarin)","Croation","Czech","Danish","Dutch","English","Estonian","Fiji","Finnish","French","Georgian","German","Greek","Gujarati","Hebrew","Hindi","Hungarian","Icelandic","Indonesian","Irish","Italian","Japanese","Javanese","Korean","Latin","Latvian","Lithuanian","Macedonian","Malay","Malayalam","Maltese","Maori","Marathi","Mongolian","Nepali","Norwegian","Persian","Polish","Portuguese","Punjabi","Quechua","Romanian","Russian","Samoan","Serbian","Slovak","Slovenian","Spanish","Swahili","Swedish ","Tamil","Tatar","Telugu","Thai","Tibetan","Tonga","Turkish","Ukranian","Urdu","Uzbek","Vietnamese","Welsh","Xhosa"];
  country_values: String[] = ["Afghanistan","Albania","Algeria","Andorra","Angola","AntiguaandBarbuda","Argentina","Armenia","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bhutan","Bolivia","BosniaandHerzegovina","Botswana","Brazil","Brunei","Bulgaria","BurkinaFaso","Burundi","Cambodia","Cameroon","Canada","CapeVerde","CentralAfricanRepublic","Chad","Chile","China","Colombi","Comoros","Congo(Brazzaville)","Congo","CostaRica","Coted'Ivoire","Croatia","Cuba","Cyprus","CzechRepublic","Denmark","Djibouti","Dominica","DominicanRepublic","EastTimor(TimorTimur)","Ecuador","Egypt","ElSalvador","EquatorialGuinea","Eritrea","Estonia","Ethiopia","Fiji","Finland","France","Gabon","Gambia,The","Georgia","Germany","Ghana","Greece","Grenada","Guatemala","Guinea","Guinea-Bissau","Guyana","Haiti","Honduras","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan","Kazakhstan","Kenya","Kiribati","Korea,North","Korea,South","Kuwait","Kyrgyzstan","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","MarshallIslands","Mauritania","Mauritius","Mexico","Micronesia","Moldova","Monaco","Mongolia","Morocco","Mozambique","Myanmar","Namibia","Nauru","Nepal","Netherlands","NewZealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palau","Panama","PapuaNewGuinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Romania","Russia","Rwanda","SaintKittsandNevis","SaintLucia","SaintVincent","Samoa","SanMarino","SaoTomeandPrincipe","SaudiArabia","Senegal","SerbiaandMontenegro","Seychelles","SierraLeone","Singapore","Slovakia","Slovenia","SolomonIslands","Somalia","SouthAfrica","Spain","SriLanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","TrinidadandTobago","Tunisia","Turkey","Turkmenistan","Tuvalu","Uganda","Ukraine","UnitedArabEmirates","UnitedKingdom","UnitedStates","Uruguay","Uzbekistan","Vanuatu","VaticanCity","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"];
  occupation_values: String[] = ["Student", "Worker", "Retired", "Others"];
  currentUser: User;
  avatarPath: string;

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private imgS: imgService
  ) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.avatarPath = imgS.getAvatarPath(this.currentUser["_id"])};
  
  ngOnInit() {
        this.loadUser();
    }

  private loadUser(){
      this.route.params
        .switchMap((params: Params) => this.userService.getById(params["id"]))
        .subscribe(user => this.user = user);
  }

  save(): void {
    this.userService.update(this.user).subscribe(() => { this.loadUser() });
    
      const id = "_id";
      this.router.navigate(['/template/my-profile', this.currentUser["_id"]]);
  }

  gotoProfile(): void {
    const id = "_id";
    this.router.navigate(['/template/profile', this.user[id]]);
  }

}
