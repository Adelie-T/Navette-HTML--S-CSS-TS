import * as $ from 'jquery';
/**
 * UserChoiceComponent
 * @author Aélion
 * @version 1.0.0
 * Handle user choice
 */

 export class UserChoiceComponent {
     private readonly forms: JQuery = $('form');
     // la variable form est un objet jquery qui grace au selecteur '#tour-form-1' représente tout le formulaire de l'index
     // le selecteur form avec 'form' récupère TOUS les formulaires, c'est donc une collection

     private selects: JQuery;

     public constructor() {
         this.selects = this.forms.find('select'); 
         //sur le form de cette classe on applique la méthode find. 
         //on traverse l'arbre pour trouver tous les selects (Attention il faut qu'il y en ait qu'un)

         this.changeHandler();

     }
         private changeHandler() {
             this.selects.on(
                 //ce que je doit écouter :
                 'change', 

                //ce que je dois faire :
                 (event: any): void => {
                      const TheSelect: JQuery = $(event.target); 
                      //$(event.target) désigne parmi les selects celui qui a changé d'état

                      const theForm: JQuery = TheSelect.parents('form');
                      //On remonte tous les parents du TheSelect jusqu'au selecteur form.

                     theForm.children('button').removeAttr('disabled');
                     //seul le button du select qui a été 'changé' doit être activé 

                     //Mettons les selecteurs à zéro et désactivons les bouttons 'réserver' des autres formulaires :
                     this.forms.each((index : number, element: HTMLElement) => {
                         //each parcourt la collection forms et à chaque element (formulaire), il attribut le numéro 0 puis 1 puis 2 ...
                         if (!$(element).is(theForm)) { // le fait d'écrire $() caste élément et en fait un JQUERY 
                                                        // c'est équivalent à $('#tour-form-n)
                                                        // la méthode is permet de comparer de 2 objets qui ont des signatures différentes (comme equals en java)
                            
                            //on ajoute l'attribut 'disabled' au button (pour reserver)
                            $(element).children('button').attr('disabled', 'disabled');

                            //on retire l'attribut 'selected' de toutes les options
                            $(element).find('select').children('option').removeAttr('selected');
                            //on ajoute l'attribut 'selected' dans l'option de choix des personnes
                            $(element).find('select').children('option:first').attr('selected', 'selected');
                         }
                        }
                     );


                 }
             );
         }

 }