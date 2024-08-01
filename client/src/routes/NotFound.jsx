export default function NotFound() {
    return (
        <>
            <div className="background"></div>
            <div className="container">
                <div className="error">404</div>
                <div className="message">¡Vaya! No encontramos la página que estás buscando.</div>
                <a href="/" className="link">Regresar a la página principal</a>
            </div>
        </>
    );
};