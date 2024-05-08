import ListaNombres from "./ListaNombres"
import PermissionDisplayer from "./PermissionDisplayer"


export default function PermissionAssigner({ nombres, handleSelectedChange, token, UserUnassignedPermissions, UserAssignedPermissions, selectedUser, permissionDiff }) {
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