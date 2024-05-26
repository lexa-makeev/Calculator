import React, { useState } from "react";
import { evaluate } from "mathjs";

import "./main.css";

function App() {
    const [number, setNumber] = useState("0");
    const [expression, setExpression] = useState("");
    const [nextOp, setNextOp] = useState(false);

    const calculateResult = () => {
        try {
            const result = evaluate(expression + number).toString();
            if (result === "Infinity" || result === "-Infinity") {
                setNumber(number);
                setExpression("");
                setNextOp(true);
            } else {
                setNumber(result);
                setExpression("");
                setNextOp(true);
            }
        } catch (error) {
            setNumber("Error");
        }
    };
    
    

    const handleInput = (input) => {
        if (nextOp && !isNaN(input)) {
            setNumber(input.toString());
            setNextOp(false);
            return;
        }

        switch (input) {
            case "sqrt":
                if (number[0] !== "-") {
                    setNumber(
                        evaluate(`sqrt(${number})`).toFixed(8).toString()
                    );
                }
                break;
            case "+/-":
                setNumber(
                    number.startsWith("-") ? number.slice(1) : `-${number}`
                );
                break;
            case ".":
                if (!number.includes(".")) {
                    setNumber(number + ".");
                }
                break;
            default:
                if (!isNaN(input)) {
                    setNumber(
                        number === "0" ? input.toString() : number + input
                    );
                } else {
                    setExpression(expression + number + input);
                    setNumber("0");
                    setNextOp(false);
                }
                break;
        }
    };

    const clearAll = () => {
        setNumber("0");
        setExpression("");
    };

    const deleteLast = () => {
        setNumber(number.length > 1 ? number.slice(0, -1) : "0");
    };

    return (
        <div className="App">
            <p className="pob">{expression + (nextOp ? "" : number)}</p>
            <p>{number}</p>
            <table>
                <thead style={{ display: "none" }}></thead>
                <tbody>
                    <tr>
                        <td>
                            <button onClick={() => handleInput("sqrt")}>
                                sqrt
                            </button>
                        </td>
                        <td>
                            <button onClick={deleteLast}>DEL</button>
                        </td>
                        <td>
                            <button onClick={clearAll}>C</button>
                        </td>
                        <td>
                            <button onClick={() => handleInput("/")}>/</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => handleInput(7)}>7</button>
                        </td>
                        <td>
                            <button onClick={() => handleInput(8)}>8</button>
                        </td>
                        <td>
                            <button onClick={() => handleInput(9)}>9</button>
                        </td>
                        <td>
                            <button onClick={() => handleInput("*")}>x</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => handleInput(4)}>4</button>
                        </td>
                        <td>
                            <button onClick={() => handleInput(5)}>5</button>
                        </td>
                        <td>
                            <button onClick={() => handleInput(6)}>6</button>
                        </td>
                        <td>
                            <button onClick={() => handleInput("-")}>-</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => handleInput(1)}>1</button>
                        </td>
                        <td>
                            <button onClick={() => handleInput(2)}>2</button>
                        </td>
                        <td>
                            <button onClick={() => handleInput(3)}>3</button>
                        </td>
                        <td>
                            <button onClick={() => handleInput("+")}>+</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button onClick={() => handleInput("+/-")}>
                                +/-
                            </button>
                        </td>
                        <td>
                            <button onClick={() => handleInput(0)}>0</button>
                        </td>
                        <td>
                            <button onClick={() => handleInput(".")}>.</button>
                        </td>
                        <td>
                            <button onClick={calculateResult}>=</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default App;
