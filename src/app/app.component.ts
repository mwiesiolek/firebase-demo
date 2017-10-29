import {Component} from "@angular/core";
import {AngularFireDatabase} from "angularfire2/database";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  courses: Observable<any[]>;
  firstCourse: Observable<any>;

  authors: Observable<any[]>;
  firstAuthor: Observable<any>;

  constructor(db: AngularFireDatabase) {
    this.courses = db.list('courses').valueChanges();
    this.firstCourse = db.object('/courses/1').valueChanges();
    this.authors = db.list('/authors').valueChanges();
    this.firstAuthor = db.object('/authors/1').valueChanges();
  }
}
