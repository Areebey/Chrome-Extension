// Extension functionality 

let myLeads= [];
const inputEl=document.getElementById("input-el")
const inputBtn=document.getElementById("input-btn")
const ulEl=document.getElementById("ul-el")
const deleteBtn=document.getElementById("delete-btn")
const leadsFromLocalStorage=JSON.parse(localStorage.getItem("myLeads"));
const tabBtn=document.getElementById("tab-btn");


if(leadsFromLocalStorage){
    myLeads=leadsFromLocalStorage
    render(myLeads)
}

// Calling the google Api for access the current tab url
tabBtn.addEventListener("click",function(){
    chrome.tabs.query({active: true, currentWindow: true},function(tabs) {
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads",JSON.stringify(myLeads))
        render(myLeads);
    })
})

//Use html <li> tag for show the data on browser 
function render(leads){
    let listItems="";
for(let i=0;i<leads.length;i++){
   listItems += `
    <li> 
   <a target='_blank' href='${leads[i]}'> ${leads[i]}
   </a>
    </li>
    ` // close
}
ulEl.innerHTML=listItems;
}

// Make a button for clear the local storage 
deleteBtn.addEventListener("dblclick",function() {
     localStorage.clear();
     myLeads=[];
     render(myLeads);
})

// make button for save the data which u entered the input field
inputBtn.addEventListener("click",function(){
    myLeads.push(inputEl.value);
    inputEl.value='';
    localStorage.setItem("myLeads",JSON.stringify(myLeads))
    render(myLeads);
    console.log(localStorage.getItem("myLeads"))
})




