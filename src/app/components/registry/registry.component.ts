import { Component, OnInit, Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService } from '../../_services/alert.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'registry',
  templateUrl: `./registry.component.html`,
})

@Injectable()
export class RegistryComponent implements OnInit {
    model: any = {

    country: null,
    skype:  null ,
    occupation: null, 
    birthday: null ,
    description: null ,
    notifications:  0,
    messages: 0,  
    literature: [
            { name: "Self-help", isChecked: false }, 
            { name: "Tales", isChecked: false }, 
            { name: "Legends", isChecked: false },
            { name: "Religion", isChecked: false }, 
            { name: "Science-fiction", isChecked: false }, 
            { name: "Philosofy", isChecked: false },
            { name: "Novels", isChecked: false }, 
            { name: "Terror", isChecked: false }, 
            { name: "Comic", isChecked: false },
            { name: "Sciences", isChecked: false }, 
            { name: "Poetries", isChecked: false }, 
            { name: "Memories", isChecked: false },
        ],
    music: [
            { name: "Rock", isChecked: false }, 
            { name: "Pop", isChecked: false }, 
            { name: "Reggae", isChecked: false },
            { name: "Ska", isChecked: false }, 
            { name: "Latin", isChecked: false }, 
            { name: "Flamenco", isChecked: false },
            { name: "Trap", isChecked: false }, 
            { name: "Trance", isChecked: false }, 
            { name: "Classical", isChecked: false },
            { name: "Alternative", isChecked: false }, 
            { name: "Blues", isChecked: false }, 
            { name: "Country", isChecked: false }, 
            { name: "Electronic", isChecked: false },
            { name: "Hip Hop / Rap", isChecked: false }, 
            { name: "Cumbia", isChecked: false }, 
            { name: "Salsa", isChecked: false },
            { name: "Dance", isChecked: false }, 
            { name: "Drum and Bass", isChecked: false }, 
            { name: "Dubstep", isChecked: false },
            { name: "Techno", isChecked: false },
            { name: "Instrumental", isChecked: false }, 
            { name: "Jazz", isChecked: false }, 
            { name: "R&B/Soul", isChecked: false },
            { name: "Dance", isChecked: false }, 
            { name: "Drum and Bass", isChecked: false }, 
            { name: "Heavy", isChecked: false },
        ],
     films: [
            { name: "Action", isChecked: false }, 
            { name: "Science Fiction", isChecked: false }, 
            { name: "Drama", isChecked: false },
            { name: "Musical", isChecked: false }, 
            { name: "Romantic", isChecked: false }, 
            { name: "FlameAnimationnco", isChecked: false },
            { name: "Fantasy", isChecked: false }, 
            { name: "Terror", isChecked: false }, 
            { name: "Thriller", isChecked: false },
            { name: "Adventure", isChecked: false }, 
            { name: "Western", isChecked: false }, 
            { name: "Mistery", isChecked: false }, 
            { name: "Police", isChecked: false },
        ],
    series: [
            { name: "Breaking bad", isChecked: false }, 
            { name: "Person of interest", isChecked: false }, 
            { name: "Gotham", isChecked: false },
            { name: "Arrow", isChecked: false }, 
            { name: "Shameles", isChecked: false }, 
            { name: "Game of Thrones", isChecked: false },
            { name: "The walking dead", isChecked: false }, 
            { name: "House", isChecked: false }, 
            { name: "How I met your mother", isChecked: false },
            { name: "Big Bang theory", isChecked: false }, 
            { name: "Flash", isChecked: false }, 
            { name: "Vikings", isChecked: false },
        ],
    activities: [
            { name: "Learn languages", isChecked: false }, 
            { name: "Auto / Motorbike", isChecked: false }, 
            { name: "Science", isChecked: false },
            { name: "Sports", isChecked: false }, 
            { name: "Shopping", isChecked: false }, 
            { name: "Theatre", isChecked: false },
            { name: "Astronomy", isChecked: false }, 
            { name: "Bar / Clubs", isChecked: false }, 
            { name: "Games", isChecked: false },
            { name: "TV", isChecked: false }, 
            { name: "Nature", isChecked: false }, 
            { name: "Meet friends", isChecked: false }, 
            { name: "Cooking", isChecked: false },
            { name: "Museums / Exhibits", isChecked: false }, 
            { name: "Music", isChecked: false }, 
            { name: "Travels", isChecked: false },
            { name: "Astrology", isChecked: false }, 
            { name: "Dance", isChecked: false }, 
            { name: "Movies", isChecked: false },
            { name: "Internet", isChecked: false },
            { name: "Crafts", isChecked: false }, 
            { name: "Computers", isChecked: false }, 
            { name: "Technology", isChecked: false },
            { name: "Reading", isChecked: false }, 
            { name: "Cooking", isChecked: false }, 
        ],
    sports: [
            { name: "Martial arts", isChecked: false }, 
            { name: "Athletics", isChecked: false }, 
            { name: "Motoring", isChecked: false },
            { name: "Badminton", isChecked: false }, 
            { name: "Golf", isChecked: false }, 
            { name: "Handball", isChecked: false },
            { name: "Hockey", isChecked: false }, 
            { name: "Cycling", isChecked: false }, 
            { name: "Extreme Sports", isChecked: false },
            { name: "Riding", isChecked: false }, 
            { name: "Skiing", isChecked: false }, 
            { name: "Dance", isChecked: false }, 
            { name: "Basket", isChecked: false },
            { name: "Baseball", isChecked: false }, 
            { name: "Billiards", isChecked: false }, 
            { name: "Swimming", isChecked: false },
            { name: "Navigation", isChecked: false }, 
            { name: "Skate", isChecked: false }, 
            { name: "Table tennis", isChecked: false },
            { name: "Volleyball", isChecked: false },
            { name: "Yoga", isChecked: false }, 
            { name: "Soccer", isChecked: false }, 
            { name: "Water-skiing", isChecked: false },
            { name: "Boxing", isChecked: false }, 
            { name: "Diving", isChecked: false }, 
            { name: "Hike", isChecked: false },
            { name: "Hunting", isChecked: false }, 
            { name: "Squash", isChecked: false }, 
            { name: "Surf", isChecked: false },
            { name: "Tennis", isChecked: false },
            { name: "Football", isChecked: false }, 
            { name: "Gymnastics", isChecked: false }, 
            { name: "Gym", isChecked: false },
            { name: "BMX", isChecked: false }, 
            { name: "Others", isChecked: false }, 
        ],
    groups: [],
    friends: [],
    };
    loading = false;
    returnUrl: string;
    
 
    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }
 
    ngOnInit() {
        // reset login status
        this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/template']);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
        this.loading = true;
        this.authenticationService.login(this.model.email, this.model.password)
            .subscribe(
                data => {
                    this.router.navigate([this.returnUrl]);
                },
                error => {
                    this.alertService.error(error._body);
                    this.loading = false;
                });
    }
}
