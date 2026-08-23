
function get(id){
    return document.getElementById(id)
};

let checklogin = JSON.parse(localStorage.getItem("checklogin")) || false ;

const dashboard = get("dash_board");
const employees = get("emp_det");
const stocks = get("stocks_det");
const sales = get("sales_det");
const login = get("log_in");

// <----------------------------Dashboard----------------------->

const dashboard_details = get("dash_details");
const dashboard_user_details = get("user_details");
const dashboard_login_button = get("login_btn");
const dashboard_login_list = get("login_list");
const dashboard_user_login = get("user_login");

dashboard.addEventListener("click", function() {
    hideAll();
    dashboard_input.style.display = "block";
    dashboard_login_button.style.display = "block";
   
    
})

let dashboard_local = JSON.parse(localStorage.getItem("dashboard_local")) || [];

dashboard_login_button.addEventListener("click", function(){


        
    let user_name = document.getElementById("user_name").value;
    let user_password = document.getElementById("user_password").value;
     
    let login_success = false; 

    for(let i = 0; i < signup_storage.length; i++){
        

    if(user_name === signup_storage[i].sign_name && user_password === signup_storage[i].sign_password){

        login_success = true;
        break;
    }}


    if(login_success === true){

        checklogin = true;
         localStorage.setItem("checklogin", JSON.stringify(checklogin));

        alert(user_name + "Login success ");

    document.getElementById("user_name").value = "";
    document.getElementById("user_password").value = ""


    } else {
        alert("incorrect User Name or Password");
         document.getElementById("user_name").value = "";
         document.getElementById("user_password").value = ""
        return;
    }});    

  


// <--------------SIGNUP BUTTON--------------------------->


let signup_storage = JSON.parse(localStorage.getItem("signup_storage")) || [] ;

const sign_button = get("sign_up");


sign_button.addEventListener("click", function(){
    

    let sign_name = get("signup_name").value;
    let sign_password = get("signup_password").value;


    if(sign_name == ""|| sign_password == ""){
        alert("Fill the details correctly");
        return;
    }

    signup_storage.push(
        {sign_name : sign_name,
        sign_password : sign_password
     });

;
     checklogin = true;
     localStorage.setItem("checklogin", JSON.stringify(checklogin));

     alert("login success full");
   

     localStorage.setItem("signup_storage", JSON.stringify(signup_storage));


     displaysignup()

     document.getElementById("signup_name").value = "";
     document.getElementById("signup_password").value = "";


});


function displaysignup(){

    dashboard_user_login.innerHTML = "";

    for(let i = 0; i < signup_storage.length; i++){

        const li = document.createElement("li");

        li.innerText = "\nSingup Name : " + signup_storage[i].sign_name +
        "\nSingup Password : " + signup_storage[i].sign_password

        dashboard_user_login.appendChild(li);
    };
}

displaysignup();



// <------------------------stocks---------------------------->

stocks.addEventListener("click", function(){

    if(!checklogin){
        alert("please login")
        return
    }

    hideAll()
    stock_input.style.display = "block"
    stock_list_total.style.display= "block";
    stock_save_list.style.display = "block"
    


})

let stocks1 = JSON.parse(localStorage.getItem("stocks1")) || [];

const stock_forms = get("stocks_form");
// const stock_names = get("name");
// const stock_price = get("price");
const stock_save_button = get("stocksbtn");
const stock_save_list = get("list");


stock_save_button.addEventListener("click", function(){


    let stock_names = get("name").value;
    let stock_quantity = get("quantity").value;
    let stock_price = get("price").value;

    if(stock_names === "" || stock_quantity === "" || stock_price === ""){
            alert("Fill every details");
            return;
        }


    stocks1.push({
        "stock_names" : stock_names,
        "stock_quantity" : stock_quantity,
        "stock_price" : stock_price 
    });


    localStorage.setItem("stocks1", JSON.stringify(stocks1));

    displaystock();


    get("name").value = "";
    get("quantity").value = "";
    get("price").value = "";


});


function displaystock(){

    let total_quantity = 0;
    let total_price = 0;

   stock_save_list.innerHTML = "";
    
    for(let i = 0; i < stocks1.length; i++){

        total_quantity = total_quantity + Number(stocks1[i].stock_quantity);
        total_price = total_price + Number((stocks1[i].stock_price) * stocks1[i].stock_quantity);


    let li = document.createElement("li");
    let remove = document.createElement("button");


    li.innerText = "\nStock Name :" + stocks1[i].stock_names +
    "\nStock Quantity : " + stocks1[i].stock_quantity +
    "\nStock Price : " + stocks1[i].stock_price 
    
    remove.innerText = "remove";

    // remove.addEventListener("click" , function() {

    //     removeItem(i);
    // })
    remove.addEventListener("click", function(){

                removeItem(stocks1,
                    "stocks1",
                    i,
                displaystock
            )
    });


    stock_save_list.appendChild(remove);
   stock_save_list.appendChild(li)
    }

   
    document.getElementById("totalPrice").innerText = total_price;
     document.getElementById("totalQty").innerText = total_quantity;


}

displaystock();

// <-----------------------Employee section ----------------------->


employees.addEventListener("click" , function(){

    if(checklogin === false){
        alert("please login ");
        return;
    }

     hideAll();
     employee_input.style.display = "block";
     employee_list.style.display = "block";
     
})

let employee_details = JSON.parse(localStorage.getItem("employee_details")) || [];


const employee_input = get("employee_form");
const employee_save_button = get("employeebtn");
const employee_list = get("emplist");


employee_save_button.addEventListener("click", function() {
    stock_input.style.display = "none";

    let employee_name = get("emp_name").value;
    let employee_salary = get("emp_salary").value;
    let employee_department = get("emp_dept").value;


    if(employee_name === "" || employee_salary === "" || employee_department == "" ){
        alert("Fill every details");
        return ; 
    }

    employee_details.push({ 
        "employee_name" : employee_name,
        "employee_salary" : employee_salary,
        "employee_department" : employee_department
});

    
localStorage.setItem("employee_details", JSON.stringify(employee_details));

displayemployee();
get("emp_name").value = "";
get("emp_salary").value = "";
get("emp_dept").value = "";



});

function displayemployee(){

    employee_list.innerHTML = "";

    for(let i = 0; i < employee_details.length; i++){
         
        let li = document.createElement("li");

        let remove = document.createElement("button");


          li.innerText = "\nEmployee Name :" + employee_details[i].employee_name +
            "\nEmployee Salary : " + employee_details[i].employee_salary + 
            "\nEmployee department : " + employee_details[i].employee_department; 

            remove.innerText = "delete";

            remove.addEventListener("click", function(){

                removeItem(employee_details,
                    "employee_details",
                    i,
                displayemployee
            )

            })
            
            employee_list.appendChild(li);
        

            let hr = document.createElement("hr");
            employee_list.appendChild(remove)
            employee_list.appendChild(hr);
           
    };
}
displayemployee();



// <----------------------------Sales----------------------------------->


const sales_list = get("sales_detil");

sales.addEventListener("click", function(){
    if(checklogin === false){
        alert("Please login ");
        return;
    }

    hideAll();
    sales_input.style.display = "block";
    sales_details.style.display = "block";

})


const sales_input = get("sales_details");
const sales_save = get("sales_save_btn");

let sales_storage = JSON.parse(localStorage.getItem("sales_storage")) || [];

sales_save.addEventListener("click", function(){

    let sales_item = get("sales").value;
    let sales_price = get("price_no").value;
    let customer_name = get("customer_name").value;
    let sales_discount = get("discount").value;

    if(sales_item === "" || sales_price === "" || customer_name === "" || sales_discount === ""){
        alert("Fill the every details ")
        return;
    }


    sales_storage.push({
        "sales_item" : sales_item,
        "sales_price" : sales_price,
        "customer_name" : customer_name,
        "sales_discount" : sales_discount
    });


    localStorage.setItem("sales_storage", JSON.stringify(sales_storage));

    displaySales();

    get("sales").value = "";
    get("price_no").value = "";
    get("customer_name").value = "";
    get("discount").value = "";


});


   function displaySales(){

    let discount_price = 0;

    sales_list.innerHTML = "";

    for(let i = 0 ; i < sales_storage.length; i++){

        discount_price +=
            sales_storage[i].sales_price -
            (sales_storage[i].sales_price *
             sales_storage[i].sales_discount / 100);

        let li = document.createElement("li");

        li.innerText =
            "\nSold Item :" + sales_storage[i].sales_item +
            "\nSales Price :" + sales_storage[i].sales_price +
            "\nCustomer Name :" + sales_storage[i].customer_name +
            "\nDiscount :" + sales_storage[i].sales_discount;

        sales_list.appendChild(li);
    }

    get("discount_on").innerText = discount_price;
};


displaySales();



// localStorage.clear();

// const employee_input = get("employee_form");

const stock_input = get("stocks_form");
const dashboard_input = get("user_details");
const stock_list_total = get("stocks_list");

const signup_hide = get("hide_signup")


const search = get("search_bar");
const search_display = get("search_output");
const search_input = get("search_words");


search_input.addEventListener("input" , function(){

    let user_search = search_input.value.toLowerCase();

    search_display.innerHTML = "";


 
    if(user_search === ""){
        return;
    }

    for( i = 0; i < stocks1.length;i++){
        let stock_items = stocks1[i].stock_names.toLowerCase();

        if(!stock_items.includes(user_search)){
            continue;
        }
        let li = document.createElement("li");

        li.innerText = stocks1[i].stock_names;

        search_display.appendChild(li);

    }

});


let sales_details = get("sales_detil")


function hideAll(){
    // signup_hide.style.display = "none";
    // login_hide.style.display = "none";
    stock_save_list.style.display = "none";
     stock_input.style.display = "none"
     sales_input.style.display = "none"
     dashboard_input.style.display = "none";
     dashboard_login_button.style.display = "none";
     employee_input.style.display = "none";
     employee_list.style.display = "none";
     stock_list_total.style.display= "none";
    search.style.display = "none"
    sales_details.style.display = "none";
    
   
}
hideAll();




// function removeItem(index){
//     stocks1.splice(index,1);

//     localStorage.setItem("stocks1", JSON.stringify(stocks1));

//     displaystock();
// }


function removeItem(array,local,index,display_fun){

    array.splice(index,1);

    localStorage.setItem(local,JSON.stringify(array));

    display_fun();

}










    const logout_button = get("logout");

    // logout_button = JSON.parse(localStorage.getItem(checklogin))|| false; 

    logout_button.addEventListener("click", function(){

        checklogin = false;
        
            localStorage.setItem("checklogin", JSON.stringify(checklogin))

            hideAll();  
            alert("logout successful")
    })




const search_icon = get("search_icon");

search_icon.addEventListener("click", function(){
    hideAll();
    search.style.display = 'block';

})

