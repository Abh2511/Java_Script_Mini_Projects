 let inputSlider = document.getElementById("inputSlider");
 let sliderValue = document.getElementById("sliderValue");
 let passBox = document.getElementById("passBox");
 let lowecase = document.getElementById("lowercase");
 let uppercase = document.getElementById("uppercase");
 let numbers = document.getElementById("numbers");
 let symbols = document.getElementById("symbols");
 let genBtn = document.getElementById("genBtn");


 // Showing Inpuit Slider Value
sliderValue.textContent = inputSlider.value;
inputSlider.addEventListener('input',()=>{
    sliderValue.textContent = inputSlider.value;
});

genBtn.addEventListener('click',()=>{
    passBox.value = generatePassword();
})

let lowerChars = "abcdefghijklmnopqrstuvwxyz";
let upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
let allnumbers = "0123456789"
let allSymbols = "~!@#$%^&*()_";
function generatePassword(){
    let genPassword = " ";
    let allChars = " ";

    allChars += lowercase.checked ? lowerChars : "";
     allChars += uppercase.checked ? upperChars : "";
      allChars += numbers.checked ? allNumbers : "";
       allChars += allSymbols.checked ? allSymbols : "";

     genPassword = allChars.charAt(Math.floor(Math.
         random() * allChars.length));

    
    return genPassword;

}