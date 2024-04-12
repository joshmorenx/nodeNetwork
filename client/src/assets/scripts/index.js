let assigned = document.querySelector('.assigned-permissions')
let unassigned = document.querySelector('.unassigned-permissions')
let secciones

if(assigned.childNodes.length > 0 && unassigned.childNodes.length > 0){
    secciones = document.querySelectorAll(".permissions")

    if(secciones.length > 0){
        for(let i = 0; i < secciones.length; i++){
            secciones[i].addEventListener("click", ()=>{
                secciones[i].classList.add("rojo")
                /*las demas secciones en blanco*/
                for(let j = 0; j < secciones.length; j++){
                    if(j != i){
                        secciones[j].classList.remove("rojo")
                    }
                }
            })
        }
    }
}