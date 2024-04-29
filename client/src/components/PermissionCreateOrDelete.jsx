
export default function PermissionCreateOrDelete({ ListaPermisos, permissionDetails, handleSelectedChange, PermissionAddOrDel, token, selectedPermission }) {
    return (
        <>
            <div>
                <ListaPermisos permissionDetails={ permissionDetails } handleSelectedChange={ handleSelectedChange } />
            </div>
            <div>
                <PermissionAddOrDel token={ token } selectedPermission={ selectedPermission } permissionDetails={ permissionDetails } />
            </div> 
        </>   
    )  
}
