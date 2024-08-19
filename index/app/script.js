let $ = document

let addButton = $.getElementById("addButton")

let tableBody = $.getElementById("tableBody")

let calculateButton = $.getElementById("calculateButton")

let dataObj = null

let idOfTr = 1

let Datas = []

let span=$.getElementById("xButton");

let moral=$.getElementById("moral");

let container=$.getElementById("container");

console.log(moral,span,container);

addButton.addEventListener("click", () => {
    tableBody.insertAdjacentHTML("beforeend", ` <tr id="${++idOfTr}" class="trr border-b border-gray-300">
                            <td class="p-[10px] md:p-5"><input
                                    class="w-full text-sm md:text-base p-[6px] md:p-3 border border-gray-300 rounded md:rounded-lg shadow-sm focus:outline-none focus:border-blue-200 focus:ring-2 focus:ring-blue-100 focus:ring-opacity-50"
                                    type="text" name="" id="" required></td>
                            <td class="p-[10px] md:p-5"><input
                                class="w-full text-sm md:text-base p-[6px] md:p-3 border border-gray-300 rounded md:rounded-lg shadow-sm focus:outline-none focus:border-blue-200 focus:ring-2 focus:ring-blue-100 focus:ring-opacity-50"                                    type="number" min="1" max="4" name="" id="" required></td>
                            <td class="p-[10px] md:p-5"><input
                                class="w-full text-sm md:text-base p-[6px] md:p-3 border border-gray-300 rounded md:rounded-lg shadow-sm focus:outline-none focus:border-blue-200 focus:ring-2 focus:ring-blue-100 focus:ring-opacity-50"                                    type="number" min="0" max="20" name="" id="" required></td>
                        </tr>`)
})


let name = null
let credit = null
let grade = null
let elemsTr = null
let id = 0
let flag=true

calculateButton.addEventListener("click", () => {
    Datas = []
    id = 0
    elemsTr = $.getElementsByClassName("trr")
    for (const element of elemsTr) {
        name = element.children[0].firstChild.value
        credit = Number(element.children[1].firstChild.value)
        grade = Number(element.children[2].firstChild.value)
        if ((name != "") && (credit <= 4) && (credit > 0) && (grade <= 20) && (grade >= 0)) {
            flag=true
            dataObj = {
                id: ++id,
                name,
                credit,
                grade
            };
            Datas.push(dataObj);
        } else {
            flag=false
            if (name == "") {
                alert(`You did not write the name of the line ${element.id}'s course`)
            } else if (!((credit <= 4) && (credit > 0))) {
                alert(`The number of credits in the line ${element.id}'s course must be between 1 and 4`)
            } else if (!((grade <= 20) && (grade >= 0))) {
                alert(`The grade of the line ${element.id}'s course must be between 0 and 20`)
            }
        }
    }
    if(flag){
        calculateGPA(Datas);
    }
})

let tbodyMoral=$.getElementById("tbodyMoral");

let averageGpa=null

let gpaSpan=$.getElementById("gpaSpan")

let calculateGPA = (Datas) => {
    let sumOfGrades = 0
    let sumOfCredits = 0

    Datas.forEach((course) => {
        let GPA = convertToGPA(course.grade);
        sumOfGrades += (GPA * course.credit);
        sumOfCredits += (course.credit);
        doTheTable(course,GPA);
    })

    averageGpa= sumOfGrades / sumOfCredits;

    gpaSpan.innerHTML = averageGpa.toFixed(2);

    container.classList.add("blur-2xl")
    moral.style.animation= "anim 0.1s"
    moral.classList.replace("hidden","block")
}

function doTheTable(course,gpaGrade){
    tbodyMoral.insertAdjacentHTML("beforeend",`                         <tr class="border-b border-gray-300">
                            <td class="p-2 md:p-5"><p class="text-center text-zinc-600 font-semibold">${course.id}</p></td>
                            <td class="p-2 md:p-5"><p class="text-center text-zinc-600 font-semibold">${course.name}</p></td>
                            <td class="p-2 md:p-5"><p class="text-center text-zinc-600 font-semibold">${gpaGrade}</p></td>
                            <td class="p-2 md:p-5"><p class="text-center text-zinc-600 font-semibold">${course.credit}</p></td>
                        </tr>  `)
}


function convertToGPA(score) {
    let gpa=0.0;

    if (score >= 17) {
        gpa = 4.0;
    } else if (score >= 14 && score < 17) {
        gpa = 3.0;
    } else if (score >= 12 && score < 14) {
        gpa = 2.0;
    } else if (score >= 10 && score < 12) {
        gpa = 1.0;
    } else {
        gpa = 0.0;
    }

    return gpa;
}

span.addEventListener("click",function (){
    tbodyMoral.innerHTML = "";
    container.classList.remove("blur-2xl")
    moral.classList.replace("block","hidden")
})

let printButton=$.getElementById("printButton");

printButton.addEventListener("click",() => {
    window.print();
})