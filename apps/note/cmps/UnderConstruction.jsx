const { useNavigate } = ReactRouter

export function UnderConstruction(){
    const navigate = useNavigate()

    return <section className="under-construction main-layout">
        <img src="assets\img\under-construction.jpg" alt="" />
    </section>
}