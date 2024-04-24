export default function PermissionModifier({ ListaPermisos, handleSelectedChange, PermissionDetails, token }) { //provissionel parameters for this function
    return (
        <>
            <h1>AVISO: ESTE COMPONENTE ESTA EN DESARROLLO</h1>
            <div>
                <ListaPermisos handleSelectedChange={ handleSelectedChange } />
            </div>
            <div>
                <PermissionDetails token={ token } />
            </div>     
        </>   
    )  
}