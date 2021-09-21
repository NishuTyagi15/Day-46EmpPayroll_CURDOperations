let isUpdate = false;
let employeePayrollObj = {};

//To Validate Name
window.addEventListener('DOMContentLoaded', (event) => {
    const name = document.querySelector('#name');
    const textError = document.querySelector('.text-error');
    name.addEventListener('input', function() {
        if (name.value.length == 0) {
            textError.textContent = "";
            return;
        }
        try {
            (new EmployeePayrollData()).name = name.value;
            textError.textContent = "";
        } catch (e) {
            textError.textContent = e;
        }
    });

    //Salary Range Value Cahnges
    const salary = document.querySelector('#salary');
    const output = document.querySelector('.salary-output');
    output.textContent = output.value;
    salary.addEventListener('input',function(){
    output.textContent = salary.value;
    });

    checkForUpdate();
});

//To Save or Submit the Details
const save = () =>{
    try {
        let employeePayrollData = createEmployeePayroll();
        createAndUpdateStorage(employeePayrollData);
    } catch (e) {
        return e;
    }
}

const createEmployeePayroll = () => {
    let employeePayrollData = new EmployeePayrollData();
    try {
        employeePayrollData.name = document.querySelector('#name').value;
    } catch (e) {
        setTextValue('.textError',e);
        throw e;
    }

employeePayrollData.profilePic = getSelectedValues('[name = profile]').pop();
employeePayrollData.gender = getSelectedValues('[name = gender]').pop();
employeePayrollData.department = getSelectedValues('[name = department]');
employeePayrollData.salary = document.querySelector('#salary').value;
employeePayrollData.note = document.querySelector('#notes').value;
let date = document.querySelector('#day').value + " " + document.querySelector('#month').value + " " + document.querySelector('#year').value;
employeePayrollData.startDate = new Date(date);
alert(employeePayrollData.toString());
return employeePayrollData;
}

const getSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    let setItems = [];
    allItems.forEach(item => {
        if(item.checked) setItems.push(item.value);
    });
    return setItems;
}

const getInputValueById = (id) => {
    let value = document.querySelector(id).value;
    return value;
}

//To Store or Save Details into Local Storage
function createAndUpdateStorage(employeePayrollData){
    let employeePayrollList = JSON.parse(localStorage.getItem("EmployeePayrollList"));
    
    employeePayrollData.id = new Date().getTime();
    if(employeePayrollList != undefined){
        employeePayrollList.push(employeePayrollData);    
    }else{      
        employeePayrollList = [employeePayrollData];
    }
    alert(employeePayrollList.toString());  
    localStorage.setItem("EmployeePayrollList", JSON.stringify(employeePayrollList));   
}

//To Set the Form Values for Update
const setForm = () => {
    setValue('#name',employeePayrollObj._name);
    setValue('[name = profile]',employeePayrollObj._profilePic);
    setValue('[name = gender]',employeePayrollObj._gender);
    setValue('[name = department]',employeePayrollObj._department);
    setValue('#salary',employeePayrollObj._salary);
    setValue('#notes',employeePayrollObj._note);
    let date = stringifyDate(employeePayrollObj._startDate).split(" ");
    setValue('#day',date[0]);
    setValue('#month',date[1]);
    setValue('#year',date[2]);
}

//To Reset the Form
const resetForm = () => {
    setValue('#name','');
    unsetSelectedValues('[name = profile]');
    unsetSelectedValues('[name = gender]');
    unsetSelectedValues('[name = department]');
    setValue('#salary','');
    setValue('#notes','');
    setValue('#day','1');
    setValue('#month','January');
    setValue('#year','2021');
}

const setValue = (id,value) => {
    const element = document.querySelector(id);
    element.setAttribute('value',value);
}

const unsetSelectedValues = (propertyValue) => {
    let allItems = document.querySelectorAll(propertyValue);
    allItems.forEach(item => {
        item.checked = false;
    })
}

const checkForUpdate = () => {
    const employeePayrollJSON = localStorage.getItem('editEmp');
    isUpdate = employeePayrollJSON ? true :false;
    if(!isUpdate) return;
    employeePayrollObj = JSON.parse(employeePayrollJSON);
    setForm();
}