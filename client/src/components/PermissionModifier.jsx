import ListaPermisos from "./ListaPermisos"
import PermissionDescriptionDetails from "./PermissionDescriptionDetails"

export default function PermissionModifier({ permissionDetails, handleSelectedChange, token, selectedPermission }) { //provissionel parameters for this function
    return (
        <>
            <div>
                <ListaPermisos permissionDetails={ permissionDetails } handleSelectedChange={ handleSelectedChange } />
            </div>
            <div>
                <PermissionDescriptionDetails token={ token } selectedPermission={ selectedPermission } permissionDetails={ permissionDetails } />
            </div>     
        </>   
    )  
}