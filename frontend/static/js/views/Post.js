import AbstractsView from "./AbstractsView.js";

export default class extends AbstractsView {
    constructor(id, name, status){
        super();
        this.id = id;
        this.name = name;
        this.status = status;
        this.setTitle("Pet store - All");
    }

    async getHtml() {
        const httpRequest = new XMLHttpRequest();
        const url='https://petstore3.swagger.io/api/v3/pet/' + this.id + '?name=' + this.name + '&status=' + this.status;
        httpRequest.open("POST", url);
        httpRequest.send();
    
        var output = await fetch(url)
        .then(function(response) {
            if(response.status === 200){
                return response.json();
            }
            else {
                return response.status;
            }
        })
        return this.getHtmlDependingOnRespone(output);
    }
    
    getHtmlDependingOnRespone(output){
        if(output === 405){
            return this.getHtmlForError(output);
        }else{
            return this.getHtmlForSucces(output);
        }            
    }
    
    getHtmlForSucces(jsonObject){
        return `
            <div id="status">
                <p>Status 200 - SUCCES</p>
            </div>
            <div id="output">
                <table>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Name</td>
                            <td>Category</td>
                            <td>status</td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>` + jsonObject.id + `</td>
                            <td>` + jsonObject.name + `</td>
                            <td>` + jsonObject.category.name + `</td>
                            <td>` + jsonObject.status + `</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            `;
    }
    
    getHtmlForError(errorCode){
        return `
            <div id="status">
                <p>Status 405 - Invalid Input</p>
            </div>`;
    }
}