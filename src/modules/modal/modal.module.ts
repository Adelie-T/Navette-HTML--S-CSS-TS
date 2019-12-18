import * as $ from 'jquery';

export class ModalModule {

    private view: JQuery;
    
    public constructor () {
        this.loadView().then((view) => { //quand la promesse est exécutée (resolve(htmlContent)) alors on revient dans view
            this.view = $(view);
            console.log('okay guys, modal html is loaded');
        });
    }
    //on peut faire d'autre actions pendant qu'il réalise la promesse SAUF que view n'est pas prêt ! 
    // ici this.view est null/indéfinit

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