let searchInput = document.getElementById("searchInput");
let searchBtn = document.getElementById("searchBtn");

const getData = async (searchValue) => {
   try{ 
    let data= await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchValue}`);
    if(!data.ok){
        throw new Error("Word not found");
    }
    let jsonData= await data.json();

document.querySelector(".text").innerHTML="";
let div = document.createElement("div");
    div.classList.add("detail");
    div.innerHTML=`
       <h2>Word: <span>${jsonData[0].word}</span></h2>
       <p>${jsonData[0].meanings[0].partOfSpeech}</p>
       <p>Meaning: <span>${jsonData[0].meanings[0].definitions[0].definition}</span></p>
       <p>Example: <span>${jsonData[0].meanings[0].definitions[0].example || "Not Found"} </span></p>
       <p>Synonyms: <span>${jsonData[0].meanings[0].synonyms.join(",") || "None"}</span></p>
       <a href = ${jsonData[0].sourceUrls[0]} target="_blank"> Read More </a>
`;

document.querySelector(".text").appendChild(div);
   } catch(error){
document.querySelector(".text").innerHTML ="Sorry, word not found. ";    
   }
}; 

searchBtn.addEventListener("click", function(){
    let searchValue = searchInput.value;
    if(searchValue === ""){
        alert("First Enter Word")
    }else{
        getData(searchValue)
    }
});