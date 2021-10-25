import Get from "./views/Get.js"
import Post from "./views/Post.js"
import Delete from "./views/Delete.js"

//Handle forms
const formGet = document.getElementById("form_get");
const formPost = document.getElementById("form_post");
const formDelete = document.getElementById("form_delete");

formGet.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = formGet.elements["pet_id"].value;
    const view = new Get(id);
    document.querySelector("#app").innerHTML = await view.getHtml();
});

formPost.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = formPost.elements["pet_id"].value;
    const name = formPost.elements["pet_name"].value;
    const status = formPost.elements["pet_status"].value;
    const view = new Post(id, name, status);
    document.querySelector("#app").innerHTML = await view.getHtml();
});

formDelete.addEventListener('submit', async (event) => {
    event.preventDefault();
    const id = formDelete.elements["pet_id"].value;
    const view = new Delete(id);
    document.querySelector("#app").innerHTML = await view.getHtml();
});