let header = document.getElementById("header")
let links = [document.getElementById("devContact"), document.getElementById("apiCredit"), document.getElementById("darkMode")]
let heading = document.getElementById("heading")
let urlInput = document.querySelector(".url")
let goButton = document.querySelector(".go")
let dMode = document.querySelector(".dMode")
let infoContainer = document.getElementById("infoContainer")
let dislikeCount = document.querySelector(".dislikes")
let likeCount = document.querySelector(".likes")
let viewCount = document.querySelector(".viewCount")
let ldRatio = document.querySelector(".ldRatio")
let errorDialog = document.querySelector(".dialog")
let errorText = document.querySelector(".errorText")
let closeModal = document.querySelector(".ok")

closeModal.addEventListener("click", ()=>{
    errorDialog.close()
})

let api = 'https://returnyoutubedislikeapi.com/votes?videoId='

const numberFormat = new Intl.NumberFormat()

async function getDislikes(){
    try{
        let videoId
        if(urlInput.value.includes("=")){
            videoId = urlInput.value.split("=")[1]
        }
        else{
            videoId = urlInput.value.split("/")[3]
        }
        let request = await fetch(api+videoId)
        if(request.status == 200){
            request.json().then(data=>{
                renderInfo(data)
            })
        }
        else{
            errorText.innerHTML = "Error message : " + request.status + " " + request.statusText + ".<br>Please try again.";
            errorDialog.showModal()
        }
    }

    catch(error){
    }

}

function renderInfo(data){
    infoContainer.style.display = "block"
    dislikeCount.innerText = "Dislikes 👎 : " + numberFormat.format(data.dislikes)
    likeCount.innerText = "Likes 👍 : " + numberFormat.format(data.likes)
    ldRatio.innerText = "Like to dislike ratio (The lower, the worse) : " + numberFormat.format(data.likes/data.dislikes)
    viewCount.innerText = "Views 👀 : " + numberFormat.format(data.viewCount)
    urlInput.value = ''
}

function handleInput(){
    if(urlInput.value == ''){
        urlInput.classList.add("invalid")
        setTimeout(()=>{
            urlInput.classList.remove("invalid")
        }, 500)
    }
    else{
        getDislikes()
    }
}

goButton.addEventListener("click", ()=>{
    handleInput()
})

window.addEventListener("keypress", (e)=>{
    if(e.key == "Enter"){
        handleInput()
    }
})

dMode.addEventListener("click", ()=>{
    if(dMode.innerText == "Dark mode"){
        dMode.innerText = "Light mode"
        header.style.backgroundColor = "#170d28";
        links.forEach(link=>{
            link.style.color = "white";
        })
        document.getElementsByTagName("body")[0].style.backgroundColor = "#02070e";
        heading.style.color = "white";
    }
    else{
        dMode.innerText = "Dark mode"
        header.style.backgroundColor = "#dddddd";
        links.forEach(link=>{
            link.style.color = "black";
        })
        document.getElementsByTagName("body")[0].style.backgroundColor = "white";
        heading.style.color = "black";

    }
})