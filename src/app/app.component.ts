import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  word: any;
  wordMeaning: any[] = []

  constructor(private http: HttpClient) { }
  title = 'dictionary';
  onSubmit(word: NgForm) {
    console.log(word.value.word)
    this.http.get<any>(`https://api.dictionaryapi.dev/api/v2/entries/en/${word.value.word}`)
      .subscribe(data => {
        console.log(data)
        this.word = data[0].word
        for (let i = 0; i < data[0].meanings.length; i++) {
          const element = data[0].meanings[i];
          let message = "Meanings and Uses : \n\n";
          message =
            message +
            "Part Of Speech : " +
            element.partOfSpeech +
            " \n\n";
          for (let j = 0; j < element.definitions.length; j++) {
            let num = j + 1;
            const e = element.definitions[j];
            message =
              message + "Definition " + num + ": \n" + e.definition + "\n\n";

            if (e.example) {
              message =
                message + "Example : " + "\n" + e.example + "\n \n \n";
            }
          }
          this.wordMeaning.push(message)
        }

      })

  }

}



























