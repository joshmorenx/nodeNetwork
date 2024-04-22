
export default function PermissionAssigner({ ListaNombres, nombres, handleSelectedChange, PermissionDisplayer, token, UserUnassignedPermissions, UserAssignedPermissions, selectedUser, permissionDiff }) {
    return (
        <>
            <div>
                <ListaNombres nombres={ nombres } handleSelectedChange={handleSelectedChange} />
            </div>
            <div>
                <PermissionDisplayer token={ token } UserUnassignedPermissions={ UserUnassignedPermissions } UserAssignedPermissions={ UserAssignedPermissions } selectedUser={ selectedUser } permissionDiff={ permissionDiff } />
            </div>     
        </>   
    )    
}