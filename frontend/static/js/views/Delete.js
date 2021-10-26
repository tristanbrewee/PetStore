import AbstractsView from "./AbstractsView.js";

export default class extends AbstractsView {
    constructor(id){
        super();
        this.id = id;
        this.setTitle("Pet store - All");
    }

    async getHtml() {
        const httpRequest = new XMLHttpRequest();
        const url='https://petstore3.swagger.io/api/v3/pet/' + this.id;
        httpRequest.open("DELETE", url);
        httpRequest.send();
    
        var output = await fetch(url)
        .then(function(response) {
            return response.status;
        })
        return this.getHtmlDependingOnRespone(output);
    }
    
    getHtmlDependingOnRespone(output){
        console.log(output);
        if(output === 200){
            return this.getHtmlForSucces(output);
        }else{
            return this.getHtmlForError(output);
        }            
    }
    
    getHtmlForSucces(output){
        return `
            <div id="status">
                <p>Status 200 - SUCCES</p>
            </div>
            <div id="output">
                <p>Pet deleted</p>
            </div>
            `;
    }
    
    getHtmlForError(errorCode){
        return `
            <div id="status">
                <p>Status 400 - Invalid pet value</p>
            </div>`;
    }
}