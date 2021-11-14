const inputBox = document.querySelector(".inputfield input");
const addBtn = document.querySelector(".inputfield button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");


  inputBox.onkeyup = ()=>{
      let userData = inputBox.value;
      
      if(userData.trim() != 0){
          addBtn.classList.add("active");
      }
      else{
        addBtn.classList.remove("active");

      }
  } 
  showTasks(); // calling showTask function


// if user click on the add button 
  addBtn.onclick = ()=> {
      let userData = inputBox.value;
      let getLocalStorage = localStorage.getItem("New Todo");
      if (getLocalStorage == null) {
          listArr = [];
      }else{
          listArr = JSON.parse(getLocalStorage);
      }
      listArr.push(userData);
      localStorage.setItem("New Todo" , JSON.stringify(listArr));
      showTasks(); // calling showTask function
      addBtn.classList.remove("active");
  }
// function to add task list inside ul 
  function showTasks(){
    let getLocalStorage = localStorage.getItem("New Todo");
    if (localStorage == null) {
        listArr = [];
    }else{
        listArr = JSON.parse(getLocalStorage);
    }
    const pendingNumber = document.querySelector(".pendingNumber");
    pendingNumber.textContent = listArr.length // passing the length value in pendingNumber 
    if (listArr.length > 0){ // if array length is greater than 0 
        deleteAllBtn.classList.add("active"); // active the clear all button
    }else{
        deleteAllBtn.classList.remove("active"); // unactive the clear all button
    }
    let newLiTag = '';
    listArr.forEach((element , index) => {
     newLiTag += `<li>${element}<span onclick = "deleteTask(${index})";><i class="fas fa-trash"></i></span></li>`
    });

    todoList.innerHTML = newLiTag; // adding new li tag inside ul tag 
    inputBox.value = ""; // once task added leave the input field balnk
  }

// delete task function
function deleteTask(index){
    let getLocalStorage = localStorage.getItem("New Todo");
    listArr = JSON.parse(getLocalStorage);
    listArr.splice(index , 1); //delete or remove the particular indexed li
    // after remove the li again update the local storage
    localStorage.setItem("New Todo" , JSON.stringify(listArr));
      showTasks(); // calling showTask function
}

// delete all task function 
deleteAllBtn.onclick=  ()=> {
    listArr = [] ; // empty an array
    // after delete all tasks again update the local storage
    localStorage.setItem("New Todo" , JSON.stringify(listArr));
      showTasks(); // calling showTask function
}