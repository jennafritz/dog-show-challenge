let dogTableBody = document.querySelector("#table-body")
let editDogForm = document.querySelector("#dog-form")
let currentDog = {}

document.addEventListener('DOMContentLoaded', () => {
    fetch("http://localhost:3000/dogs")
        .then(res => res.json())
        .then(function(dogArray){
            dogArray.forEach(function(dogObj){
                appendDog(dogObj)
            })
        })
})

function appendDog(dogObj){
    let newDogTR = document.createElement("tr")
        newDogTR.id = `dog${dogObj.id}`
    let nameTD = document.createElement("td")
        nameTD.id = `dog${dogObj.id}name`
        nameTD.innerText = dogObj.name
    let breedTD = document.createElement("td")
        breedTD.id = `dog${dogObj.id}breed`
        breedTD.innerText = dogObj.breed
    let sexTD = document.createElement("td")
        sexTD.id = `dog${dogObj.id}sex`
        sexTD.innerText = dogObj.sex
    let editDogTD = document.createElement("td")
        editDogTD.id = `dog${dogObj.id}edit`

        let editDogButton = document.createElement("button")
            editDogButton.innerText = "Edit Dog"

        editDogTD.append(editDogButton)

    newDogTR.append(nameTD, breedTD, sexTD, editDogTD)        
    
    dogTableBody.append(newDogTR)

    editDogButton.addEventListener("click", function(){
        editDogForm.name.value = dogObj.name
        editDogForm.breed.value = dogObj.breed
        editDogForm.sex.value = dogObj.sex
        currentDog = dogObj
    })


}

editDogForm.addEventListener("submit", function(event){
    event.preventDefault()
    let currentDogName = event.target.name.value
    let currentDogBreed = event.target.breed.value
    let currentDogSex = event.target.sex.value

    //grab dog based on name and find id? No, don't have access to the array or object

    fetch(`http://localhost:3000/dogs/${currentDog.id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/JSON"
        },
        body: JSON.stringify({
            name: currentDogName,
            breed: currentDogBreed,
            sex: currentDogSex
        })
    })
        .then(res => res.json())
        .then(function(updatedDogObj){
            let currentNameTD = document.querySelector(`#dog${currentDog.id}name`)
                currentNameTD.innerText = updatedDogObj.name
            let currentBreedTD = document.querySelector(`#dog${currentDog.id}breed`)
                currentBreedTD.innerText = updatedDogObj.breed
            let currentSexTD = document.querySelector(`#dog${currentDog.id}sex`)
                currentSexTD.innerText = updatedDogObj.sex
            
            currentDog.name = updatedDogObj.name
            currentDog.breed = updatedDogObj.breed
            currentDog.sex = updatedDogObj.sex 
        })
})

