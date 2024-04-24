
export default function PermissionModifier({ ListaPermisos, permissionDetails, handleSelectedChange, PermissionDescriptionDetails, token, selectedPermission }) { //provissionel parameters for this function
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