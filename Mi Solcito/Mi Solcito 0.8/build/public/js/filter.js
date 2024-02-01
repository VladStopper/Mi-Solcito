
// FUNCIONAAAA


setInterval (function (){
    const category = [...document.querySelectorAll('.category_filter')];
    const length = category.length;
    const cards = [...document.querySelectorAll('.cards')];
    var cont = 0;


    category.forEach(chk =>{
        if(chk.checked == false)
        {
            cont = cont + 1;
        }
    })
    

    if(cont == length)
    {
        cards.forEach(card =>{
            card.style.display = "grid";
        })
    }
}, 1);





function filter(){
   
    const category = [...document.getElementsByClassName('category_filter')];
    const category_chk_true = category.filter(chk => chk.checked == true);
    const category_chk_false = category.filter(chk => chk.checked == false);
   
    console.log(category_chk_true)
    console.log(category_chk_false)

    for(i=0;i<category_chk_true.length;i++)
    {
        let k = document.getElementsByName(category_chk_true[i].value).length
        console.log(category_chk_true[i].value)
        console.log(document.getElementsByName(category_chk_true[i].value))


        for(j=0; j<k;j++)
        {
            document.getElementsByName(category_chk_true[i].value)[j].style.display = 'grid';
        }
    }

    

    for(i=0;i<category_chk_false.length;i++)
    {
        let k = document.getElementsByName(category_chk_false[i].value).length
        console.log(category_chk_false[i].value)
        console.log(document.getElementsByName(category_chk_false[i].value))
        console.log(k)
   
        for(j=0; j<k;j++)
        {
            document.getElementsByName(category_chk_false[i].value)[j].style.display = 'none';
        }
    }

    
};

