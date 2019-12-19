//Imports jQuery module in Typescript (sous le nom de $)
//$ est notre DOM (document object model) JQuery
import * as $ from 'jquery';

import * as moment from 'moment'; //importe tout du package 'moment
import { DatePickerComponent } from './date-picker/date-picker-component';
import { UserChoiceComponent } from './user-choice/user-choice-component';

import './scss/main.scss'; //permet de compiler les fichiers .scss et donc mettre à jour le custom.css

/**
 * Main
 * @author Aelion
 * @version 1.0.0
 * Entry point of our application
 */

 export const currentDate: moment.Moment = moment().locale('fr'); //on définit notre moment et on lui précise qu'on est en France

 export class Main{
     public constructor(){
         //Get today's date from API
         $.ajax({ //ajax = asynchrone
             url:'http://worldclockapi.com/api/json/utc/now', //chemin pour récupérer ce qu'on veut - on peut aussi mettre chemin du controller
             method: 'get', //voir REST de l'API : put, post, delete, ..
            dataType: 'json', //type de données - peut être aussi une image
            success: (data: any) => { //data est la réponse de l'API - en json
                currentDate.set(data.currentDateTime); //current Date est de type moment (définie ci-dessus) et currentDateTime est un champs de la data
                console.log(`Date du jour : ${currentDate.toString()}`); 
                
                const initialDate: JQuery = $('span#current-date'); //On crée une constante pour la "boite" span qui ne bougera pas même si le contenu bouge

                initialDate.html(currentDate.format('dddd DD MMMM YYYY')) //renvoit la date du lien url

                //on range (grace à un "toString") la valeur des dates aujourd'hui (first) et celle qui est parcourue(current)
                initialDate.data('first', currentDate.toString()); //first sert à faire un test pour le retour en arrière
                initialDate.data('current', currentDate.toString()) //current sera mise à jour au fur-et-à-mesure des clicks

                //Sets the event handlers
                new DatePickerComponent();
                new UserChoiceComponent();

                $('#app-loader').addClass('hidden');
            },
            error: (xhr: any, error:any) => { //si le success se passe mal, on passe dans error : 
                $('#app-loader').addClass('hidden');
            }
         });

         console.log('Hello Typescript!');

         //Remove loader
         setTimeout(() =>{ //setTimeout permet de définir un temps en miliseconde aprèslequel on réalise une action
         $('#app-loader').addClass('hidden'); //on ajoute une classe (celle qui cache le loader) 
         }, 
         1500
         );

         //Back to dots in ul
         $('ul').css('backhround-color', '#000');

     }

 }

 
 $(document).ready(
     () => { //call back : est appelé après dès que le document sera prêt
                        // c'est une fonctiopn flechée et anonyme
                        // ready est un gestionnaire d'evenment de jquery 

    console.log('Hi JQuery, document is ready and fullly loaded. Run the App!');
     //Boostraping of our app
      const app: Main = new Main();
 });  


 