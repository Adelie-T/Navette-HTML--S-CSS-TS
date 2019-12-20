import * as $ from 'jquery';
import { InnerOptions } from './inner-option-interface';

export class ModalModule {

    private view: JQuery;
    
    public constructor (event: any, innerOptions?: InnerOptions) { //un ? rend optionnel le paramètre
        this.loadView().then((view) => { //quand la promesse est exécutée (resolve(htmlContent)) alors on revient dans view
            // let unit: string = 'px';
            // if (innerOptions) {
            //     if (innerOptions.unit){
            //         unit = innerOptions.unit; 
            //     }
            // }                  
            
            
            
            this.view = $(view); //this.view est le code html de modal
            console.log('okay guys, modal html is loaded');
            this.view.find('.inner-modal').css(
                'height',
                innerOptions ? innerOptions.height + 'px' : '300px' // si innerOptions est en paramètre alors il vaut innerOptions.height px sinon il vaut 300px
            )
            .css(
                'width',
                innerOptions ? innerOptions.width + 'px' : '300px'
            );

            //changer le text du modal en fonction de l'horaire choisi : 
            this.view.find('.col-11').html(           //html(bla) : écris bla, mais html() : lis
                'Réservation de la navette de ' + 
                $(event.target).parents('li').children('div:first-child').children('span').html() //on passe l'event à l'origine du click en paramètre pour le récupérer 
                                                                                                    //$(envent.target) permet de se mettre au niveau de la balise qui a été cliquée
                );

            //changer le corps du modal pour afficher le nombre de places réservées
            this.view.find('#purchase-detail').html(
                
                $(event.target).parents('form').find('select').find('option:selected').val() 
                + ' x 8 = '
                + parseInt($(event.target).parents('form').find('select').find('option:selected').val().toString())*8
                + ' €'
            );
                
            $('body').append(this.view); //adds view to body in dom (de index.html)


            //pourvoir valider l'achat une fois les champs remplis:
                this.view.find('.custom-control-input').on(
                    'change',
                    (eventCgv : any) : void => {
                        console.log('CGV acceptés');
                        if (this.view.find('#user-name').val() == "" || this.view.find('#user-email').val() == "" || !this.view.find('.custom-control-input').is(':checked'))
                        console.log('manque un champ');
                        else {
                            console.log('tudo bem');
                            this.view.find('.btn-success').removeAttr('disabled');

                            //Mettre à jour le formulaire selon la commande:
                            this.view.find('.btn-success').on(
                                'click',
                                (eventVal : any) : void => {
                                    eventVal.preventDefault(); //permet de simuler l'évenement sans le réaliser. 
                                    console.log('jai compris que ça a validé sur : ' + $(event.target).parents('li').attr('id'));
                                    
                                    $(event.target).parents('li').children('div:last-child').children('.badge-secondary').html(
                                        (
                                            parseInt( $(event.target).parents('li').children('div:last-child').children('.badge-secondary').html())                                          
                                         - parseInt($(event.target).parents('form').children('div').children('select').children('option:selected').html())
                                        )
                                        .toString()                                    
                                    );

                                    $(event.target).parents('form').children('div').children('select').children('option').removeAttr('selected');
                                    $(event.target).parents('form').children('div').children('select').children('option:first').attr('selected', 'selected');

                                    
                                 }
                                 )
                        }
                    }
                )

            console.info('Place close button handler')

            this.closeHandler(); //removes view from dom = close modal


        });
    }
    //on peut faire d'autre actions pendant qu'il réalise la promesse SAUF que view n'est pas prêt ! 
    // ici this.view est null/indéfinit

    //quand on appuie sur la croix il faut que la fenetre disparaisse i.e qu'on supprime les ligne du DOM 
    public closeHandler(): void {
        $('button.close').on( 
            'click',
            (event : any) : void => {
                console.log('Remove view from DOM');
                this.view.remove(); // removes view from DOM
            }
        )
        
    }

    private loadView(): Promise<HTMLElement> { 
        return new Promise<HTMLElement>((resolve) => {//on tient la promesse
            $.get(                                       //get = ajax = asynchrone
                'src/modules/modal/view/modal.html',
                (htmlContent : any) => { //html content est le contenu de la page modal.html
                    resolve(htmlContent);
                }
            ); 
        });
        
    }
}