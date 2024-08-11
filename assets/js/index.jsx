function Card(props) {
    const [productQuantity, setproductQuantity] = React.useState(0);

    function addItem() {
        setproductQuantity(productQuantity + 1);
        props.onValueChange(props.id, productQuantity + 1, (productQuantity + 1) * props.price);
    }

    function deleteItem() {
        if (productQuantity > 0) setproductQuantity(productQuantity - 1);
        if (productQuantity > 0) props.onValueChange(props.id, productQuantity - 1);
        if (productQuantity > 0) props.onValueChange(props.id, productQuantity - 1, (productQuantity - 1) * props.price);
    }

    return (
        <>
            <div id="main__card">
                <div id="card__image">
                    <img src="/assets/img/portfolio/product.png" alt="" />
                </div>
                <h2>{props.title}</h2> <h3 id="card__price">€{props.price}</h3>
                <div id="card__textContent">
                    <p>{props.description}</p>
                    <div className="card__quantity">
                        <button className="minusButton" onClick={() => deleteItem()}>-</button>
                        <h2 className="digitScreen">{productQuantity}</h2>
                        <button className="plusButton" onClick={() => addItem()}>+</button>
                    </div>
                </div>
            </div>
        </>
    );
}

function App() {
    const initialState = [
        {
            id: 1,
            title: "XBox",
            description: "Esta es una consola de videojuegos que entretiene a los programadores en sus breaks",
            quantity: 0,
            price: 20,
            total: 0
        },
        {
            id: 2,
            title: "PlayStation",
            description: "Esta es una consola de videojuegos que entretiene a los programadores en sus breaks",
            quantity: 0,
            price: 40,
            total: 0
        },
        {
            id: 3,
            title: "Nintendo",
            description: "Esta es una consola de videojuegos que entretiene a los programadores en sus breaks",
            quantity: 0,
            price: 60,
            total: 0
        }
    ];
    const [total, setTotal] = React.useState(initialState);

    const handleValueChange = (id, newValue, totalAmount) => {
        setTotal(prevStates =>
            prevStates.map(state =>
                state.id === id ? { ...state, quantity: newValue, total: totalAmount } : state
            )
        )
    };
    
    const totalSum = total.reduce((accumulator, product) => accumulator + product.quantity, 0);
    const totalToPay = total.reduce((accumulator, product) => accumulator + product.total, 0);

    function AddedItems() {
        return (
            <div>
                <h2>Productos añadidos: <span className="card__totalNumber">{totalSum}</span></h2>
                <hr />
                <h2>Total a pagar: <span className="card__totalNumber">€{totalToPay}</span></h2>
            </div>
        );
    }

    return (
        <>
            <div id="main">
                {total.map(product => (
                    <Card
                        key={product.id}
                        id={product.id}
                        title={product.title}
                        description={product.description}
                        quantity={product.quantity}
                        price={product.price}
                        onValueChange={handleValueChange}
                    />
                ))}
            </div>
            <div id="total">
                <AddedItems />
            </div>
            
        </>
    );

}

const root = document.getElementById('root');
ReactDOM.render(<App />, root);