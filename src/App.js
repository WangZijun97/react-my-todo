import React from 'react';
//import logo from './logo.svg';
import './App.css';
import Container from './container.js'
//import Item from './item.js'

const KEYS = ["School Work", "Research", "RCY", "Self-Dev"]

function parseMemKey(key) {
	let x = window.localStorage.getItem(key)
	return JSON.parse(x)
	/*
	//alert(x.toString())
	if (!x) {
		return []
	}
	if (x.length < 1) {
		return []
	}
	return x.split(",").map( item => {
		let y = item.split("|")
		return new Item(y[0], y[1], y[2])
	})*/
}

function parseMemAll() {
	const keys = KEYS
	let mem = {}
	for (let i of keys) {
		mem[i] = parseMemKey(i)
	}
	return mem
}

class App extends React.Component {
	constructor(props) {
		super(props)
		let memory = parseMemAll()
		this.state = {
			mem: memory
		}
	}
	
	render() {
		return (
		<div className="App showborder">
			<div className = "header">
				<h1>My Todo</h1>
			</div>
			<div className = "Body showborder">
				<Container title = {KEYS[0]} items = {this.state.mem[KEYS[0]]} />
				<Container title = {KEYS[1]} items = {this.state.mem[KEYS[1]]} />
				<Container title = {KEYS[2]} items = {this.state.mem[KEYS[2]]} />
				<Container title = {KEYS[3]} items = {this.state.mem[KEYS[3]]} />
			</div>
		</div>
		)
	}
}

/*
function App() {
	let mem = parseMemAll()
	//return (<div className = "App"><h1>lol</h1></div>)
	return (
		<div className="App showborder">
			<div className = "header">
				<h1>My Todo</h1>
			</div>
			<div className = "Body showborder">
				<Container title = {KEYS[0]} items = {mem[KEYS[0]]} />
				<Container title = {KEYS[1]} items = {mem[KEYS[1]]} />
				<Container title = {KEYS[2]} items = {mem[KEYS[2]]} />
				<Container title = {KEYS[3]} items = {mem[KEYS[3]]} />
			</div>
		</div>
  )	;
}*/

export default App;
