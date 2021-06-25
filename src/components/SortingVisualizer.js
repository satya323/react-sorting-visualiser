import React from 'react';

import { InputGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';

import { randomIntFromInterval } from '../utils/randomIntFromInterval';
import { ComplexityTable } from '../utils/complexityTable';
import BackBar from '../utils/backbar';

import { getBubbleSortAnimations } from '../utils/bubbleSort';
import { getMergeSortAnimations } from '../utils/mergeSort';

import "./SortingVisualizer.css";

var ANIMATION_SPEED = 10;
const numElements = 200;

class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            disabled: false,
            array: [],
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for(let i = 0; i < numElements; i++) {
            let val = randomIntFromInterval(12, numElements + 12);
            array.push(val);
        }

        this.setState({
            array: array,
        });
        this.drawBoard(array);
    }

    drawBoard(arrayBoard = []) {
        document.getElementById("sortingBoard").innerHTML = "";

        const container = document.getElementById("sortingBoard");

        container.style.setProperty("--grid-rows", 1);
        container.style.setProperty("--grid-cols", numElements);

        for(let j = 0; j < arrayBoard.length; j++) {
            let cell = document.createElement("div");
            container.appendChild(cell).className = "grid-item";
            let cellStyle = cell.style;
            cellStyle.height = `${arrayBoard[j]}px`;
            cellStyle.backgroundColor = `#ffffff`;
        }
    }

    selectAlgorithm() {
        let selectedValue = parseInt(
            document.getElementById("sortingAlgoDropDown").value
        );

        switch (selectedValue) {
            case 0:
                alert("Select An Algorithm First!");
                break;
            case 1:
                this.bubbleSort();
                break;
            case 2:
                this.mergeSort();
                break;
            default:
                break;
        }
    }

    visualizeAnimations(animations = [], speedFactor) {
        this.setState({ disabled: true });
        setTimeout(() => {
            const arrayBlocks = document.getElementsByClassName("grid-item");
            
            let count = 0;
            for (let i = 0; i < animations.length; i++) {
                const [idxOne, idxTwo, elemOne, elemTwo] = animations[i];
                const blockOne = arrayBlocks[idxOne];
                const blockTwo = arrayBlocks[idxTwo];

                setTimeout(() => {
                    blockOne.style.height = `${elemOne}px`;
                    blockTwo.style.height = `${elemTwo}px`;
                    blockOne.style.transition = "150ms all";
                    blockTwo.style.transition = "150ms all";
                }, ANIMATION_SPEED * speedFactor * (i+1));
                count++;
            }

            setTimeout(() => {
                for (let i = 0; i < arrayBlocks.length; i++) {
                    setTimeout(() => {
                        arrayBlocks[i].classList.add("popupBlocks");
                    }, ANIMATION_SPEED * i);
                }

                this.setState({ disabled: false });
            }, ANIMATION_SPEED * speedFactor * (count + 1));
        }, 1000);
    }

    bubbleSort() {
        const animations = getBubbleSortAnimations(this.state.array);
        this.visualizeAnimations(animations, 0.2);
    }

    mergeSort() {
        this.setState({ disabled: true });
        setTimeout(() => {
            const animations = getMergeSortAnimations(this.state.array);
            let count = 0;
            const arrayBlocks = document.getElementsByClassName("grid-item");
            for(let i = 0; i < animations.length; i++) {
                setTimeout(() => {
                    const [blockOneIdx, newHeight] = animations[i];
                    const blockOneStyle = arrayBlocks[blockOneIdx].style;
                    blockOneStyle.cssText = `height: ${newHeight}px; background-color: rgb(255, 255, 255)`;
                    blockOneStyle.transition = "150ms all";
                }, i * ANIMATION_SPEED);
                count++;
            }
            setTimeout(() => {
                for (let i = 0; i < arrayBlocks.length; i++) {
                    setTimeout(() => {
                        arrayBlocks[i].classList.add("popupBlocks");
                    }, ANIMATION_SPEED * i);
                }
                this.setState({ disabled: false });
            }, ANIMATION_SPEED * (count + 1));
        }, 1000);
    }

    render() {
        const { disabled } = this.state;

        return(
            <div>
                <BackBar />
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-1"></div>
                        <div className="com-sm-7">
                            <div
                                className="box shadowT board mt-2"
                                id="sortingBoard"
                            ></div>
                        </div>
                        <div className="col-sm-3 mt-2">
                            <InputGroup>
                                <InputGroup.Prepend>
                                    <Button
                                        onClick={() => this.resetArray()}
                                        variant="danger"
                                        disabled={disabled}
                                    >
                                        Reset
                                    </Button>
                                </InputGroup.Prepend>
                                <Form.Control
                                    id="sortingAlgoDropDown"
                                    disabled={disabled}
                                    defaultValue="0"
                                    as="select"
                                >
                                    <option disabled value="0">
                                        Algorithm
                                    </option>
                                    <option value="1">Bubble Sort</option>
                                    <option value="2">Merge Sort</option>
                                </Form.Control>
                                <InputGroup.Append>
                                    <Button
                                        onClick={() => this.selectAlgorithm()}
                                        disabled={disabled}
                                        variant="success"
                                    >
                                        Sort
                                    </Button>
                                </InputGroup.Append>
                            </InputGroup>
                            <ComplexityTable />
                        </div>
                        <div className="col-sm-1"></div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SortingVisualizer;
