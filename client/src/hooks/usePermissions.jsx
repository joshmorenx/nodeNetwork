
export default function usePermissions( user ){
    let allAccess = false
    let cadena = ''
    try {
            for(let key in user.permissions){
            let elem = user.permissions[key]
                if(key < user.permissions.length - 1){ 
                    // cadena += elem.permissionDescription+", "
                    cadena += elem.permissionId+" : <"+ elem.permissionDescription+">, "
                }else{
                    cadena += elem.permissionId+" : <"+ elem.permissionDescription+">"
                }

                if(elem.permissionId === 1){
                    allAccess = true
                }
            }
        // console.log(cadena)
        if(user.permissions.length === 0 || !user.permissions) {
            cadena = 'No tienes puedes modificar permisos'
        }
        
    } catch (error) {
        // console.log(error);
    }
    return {
        cadena,
        allAccess
    }
}