
export default function usePermissions( user ){
    let allAccess = false
    let cadena = ''
    try {
            for(let key in user.permissions){
            let elem = user.permissions[key]
                if(key < user.permissions.length - 1){ 
                    // cadena += elem.permissionName+", "
                    cadena += elem.permissionId+" : <"+ elem.permissionName+">, "
                }else{
                    cadena += elem.permissionId+" : <"+ elem.permissionName+">"
                }

                if(elem.permissionId === 1){
                    allAccess = true
                }
            }
        // console.log(cadena)
        if(!allAccess) {
            cadena = 'No tienes permisos para modificar'
        }
        
    } catch (error) {
        // console.log(error);
    }
    return { cadena, allAccess }
}