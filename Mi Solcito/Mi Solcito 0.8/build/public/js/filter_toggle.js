(function (){
        const titleFilter = [...document.querySelectorAll('.filter__arrow--show')];
        console.log(titleFilter)
    
        titleFilter.forEach(filter =>{
            filter.addEventListener('click', ()=>{
                let height = 0;
                let answer = filter.parentElement.nextElementSibling;
                let addPadding = filter.parentElement.parentElement;
            
    
                addPadding.classList.toggle('filter__container--add');
                filter.classList.toggle('filter__arrow--rotate');
    
                if(answer.clientHeight === 0){
                    height = answer.scrollHeight;
                }
    
                answer.style.height = `${height}px`;
            });
        });
})();