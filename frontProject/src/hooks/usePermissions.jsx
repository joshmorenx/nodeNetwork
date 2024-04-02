
export default function usePermissions(user){
    let allAccess = false
    let cadena = ''
    try {
            for(let key in user.permissions){
            let elem = user.permissions[key]
                if(key < user.permissions.length - 1){ 
                    cadena += elem.permissionDescription+", "
                }else{
                    cadena += elem.permissionDescription
                }

                if(elem.permissionId === 1){
                    allAccess = true
                }
            }
        // console.log(cadena)
        if(user.permissions.length === 0 || !user.permissions) {
            cadena = 'Sin permisos'
        }
        
    } catch (error) {
        // console.log(error);
    }
    return {
        cadena,
        allAccess
    }
}