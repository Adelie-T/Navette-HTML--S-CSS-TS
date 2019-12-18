import * as $ from 'jquery';
import * as moment from 'moment';

/**
 * DatePickerComponent
 * @version 1.0.0
 * @author Aélion - 2019
 * Manage previous and next date buttons
 */

 export class DatePickerComponent {
     private readonly previousButton: JQuery = $('[previousDate]'); //le nom d'attribut est entre crochets
     private readonly nextButton: JQuery = $('[nextDate]');
     private readonly currentDate: JQuery = $('span#current-date'); //c'est tout ça : <span id="current-date" data-current="" data-first="" ></span>

     public constructor() {
         this.nextHandler(); 
     }

     private nextHandler(): void {
         this.nextButton.on( //la méthode "on" permet de détecter une action sur qqch, c'est un 'event leastener' (écouteur)
            'click', //1er paramètre : l'évenement qu'on veut intercepter
            (event: any): void => { //2nd paramètre : ce qu'on veut faire dès que l'évenement se produit
                //C'est là que ça se passe 
                console.log('Hey! I heard a click on me!');

                let currentDate = moment(this.currentDate.data('current')).locale('fr');
                currentDate.add(1, 'd'); //on ajoute 1 jour

                this.currentDate.html(currentDate.format('DD MMM YYYY')); //affichage
                this.currentDate.data('current', currentDate.toString()); //stockage
                // this désigne l'attibut de cette classe-ci (DatePickeerComponent)

                //For all cases, activate previous button
                this.previousButton.removeClass('disabled');

                event.preventDefault(); //Prevent fake navigation
            }
         ) 
     }

     private previousHandler(): void {}



 }