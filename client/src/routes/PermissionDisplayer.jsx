
function PermissionDisplayer() {
  return (
    <>
      <div style = {{display: 'inline-flex', flexDirection: 'row', }}>
        <section style = {{display: 'inline-flex', flexDirection: 'row', }}>
          <div style={{display: 'flex', flexDirection: 'row', }}>
            <p>Permisos sin asignar</p><br />
            <textarea style={{resize: 'none', width: '100%'}}></textarea>
                <button type="button">+</button>
                <button type="button">-</button>
            <p>Permisos asignados</p>
            <textarea style={{resize: 'none', width: '100%'}}></textarea>
          </div>
        </section>
      </div>
    </>
  );
}


export default PermissionDisplayer;