function fillExample(sector, country){
document.getElementById("sector").value = sector;
document.getElementById("country").value = country;
}

document.getElementById("searchBtn").addEventListener("click", searchInvestors);

async function searchInvestors(){

const sector = document.getElementById("sector").value.trim();
const country = document.getElementById("country").value.trim();
const resultsDiv = document.getElementById("results");
const loader = document.getElementById("loader");

if(!sector || !country){
alert("Enter sector and country");
return;
}

resultsDiv.innerHTML="";
loader.classList.remove("hidden");

try{

const response = await fetch("http://localhost:5000/search",{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({ sector, country })
});

const data = await response.json();
loader.classList.add("hidden");

let text = data.choices[0].message.content;

// clean ```json
text = text.replace(/```json/g,"").replace(/```/g,"");

const investors = JSON.parse(text);
displayInvestors(investors);

}catch(error){
loader.classList.add("hidden");
resultsDiv.innerHTML="<p style='color:red'>Server error</p>";
console.error(error);
}

}

function displayInvestors(list){

const resultsDiv = document.getElementById("results");
resultsDiv.innerHTML="";

list.forEach(inv=>{

const card=document.createElement("div");
card.className="investor-card";

card.innerHTML=`
<h3>${inv.name}</h3>
<p><b>Focus:</b> ${inv.focus}</p>
<p><b>Location:</b> ${inv.location}</p>
<p><b>Why:</b> ${inv.reason}</p>
`;

resultsDiv.appendChild(card);

});
}
