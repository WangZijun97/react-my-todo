import React from 'react'
import './App.css'
import Item from './item.js'
//import Popup from "reactjs-popup"

export class Container extends React.Component {
	constructor(props) {
		super(props)
		let propsItems = this.props.items
		if (!propsItems) {
			propsItems = []
		}
		this.state = {
			items: propsItems
		}
		this.handleRemoval = this.handleRemoval.bind(this)
		this.handleChange = this.handleChange.bind(this)
		this.handleDateChange = this.handleDateChange.bind(this)
		this.handleListItemDateChange = this.handleListItemDateChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.invalidDateHelper = this.invalidDateHelper.bind(this)
	}
	
	handleRemoval(item) {
		let temp = this.state.items
		let i = temp.indexOf(item)
		temp.splice(i, 1)
		this.setState({items: temp})
	}
	
	handleChange(e) {
		this.setState({inputblank: e.target.value})
	}
	
	handleDateChange(e) {
		this.setState({dateblank: e.target.value})
	}
	
	handleListItemDateChange(item, date) {
		let temp = this.state.items
		let i = temp.indexOf(item)
		temp.splice(i, 1, new Item(item.name, item.addeddate,
			this.invalidDateHelper(new Date(date), new Date(item.targetdate))))
		this.setState({items: temp})
	}
		
	
	handleSubmit() {
		let temp = this.state.items
		let today = new Date().toDateString()
		let target = this.invalidDateHelper(new Date(this.state.dateblank))
		temp.push(new Item(this.state.inputblank, today, target))
		this.setState({items: temp})
	}
	
	invalidDateHelper(dateobj, defaultdate = 0) {
		let date = dateobj.toDateString()
		if (date === "Invalid Date") {
			if (defaultdate === 0) {
				let temp = new Date()
				temp.setDate(new Date().getDate() + 7)
				return temp.toDateString()
			} else {
				return defaultdate.toDateString()
			}
		} else {
			return date
		}
	}
	
	componentDidUpdate() {
		window.localStorage.setItem(this.props.title, JSON.stringify(this.state.items))
	}
	
	render() {
		return (
			<div>
				<div>
					<h1>{this.props.title}</h1>
					<input type = "text" value = {this.state.inputblank} onChange = {this.handleChange}/ >
					<button onClick = {this.handleSubmit}>Submit</button>
				</div>
				<span>Target Date: </span>
				<input type = "date" value = {this.state.dateblank} onChange = {this.handleDateChange}/ >
				<List 
					items = {this.state.items} 
					handleRemoval = {this.handleRemoval}
					handleChange = {this.handleListItemDateChange}
					/>
			</div>
			)
	}
}

class List extends React.Component {
	
	render() {
		if (!this.props.items || this.props.items.length < 1) {
			return (<p>{"Yay you're free!"}</p>)
		} else {
			let ls = []
			for (let i of this.props.items) {
				ls.push((<ListItem 
							item = {i} 
							onClickDone = {this.props.handleRemoval}
							onClickChange = {this.props.handleChange}
							/>))
			}
			return ls
		}
	}
}

class ListItem extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			popupDisplay: "none"
		}
		this.handleClickDone = this.handleClickDone.bind(this)
		this.handleClickChange = this.handleClickChange.bind(this)
		this.handleDateChange = this.handleDateChange.bind(this)
		this.t_datecolor = this.t_datecolor.bind(this)
	}
	
	handleClickDone() {
		this.props.onClickDone(this.props.item)
	}
	
	handleClickChange() {
		//this.props.onClickChange(this.props.item, this.props.
		if (this.state.popupDisplay === "none") {
			this.setState({popupDisplay: "initial"})
		} else if (this.state.popupDisplay === "initial") {
			this.props.onClickChange(this.props.item, this.state.dateblank)
			this.setState({
				popupDisplay: "none",
				dateblank: "dd/mm/yyyy"
				})
		}
	}
	
	handleDateChange(e) {
		this.setState({dateblank: e.target.value})
	}
		
	
	t_datecolor() {
		function datescompare(a,b) {
			if (a.getFullYear() === b.getFullYear()) {
				if (a.getMonth() === b.getMonth()) {
					if (a.getDate() === b.getDate()) {
						return 0
					} else {
						return Math.sign(a.getDate() - b.getDate())
					}
				} else {
					return Math.sign(a.getMonth() - b.getMonth())
				}
			} else {
				return Math.sign(a.getFullYear() - b.getFullYear())
			}
		}
		
		switch (datescompare(new Date(this.props.item.targetdate), new Date())) {
			case 0:
				return "targetdate today"
			case -1:
				return "targetdate past"
			case 1:
				return "targetdate future"
			default:
				return "targetdate"
		}
	}
	
	render() {
		
		return (
			<div className = "listitem">
				<div className = "inlist">
					<li>{this.props.item.name}</li>
					<p className = "addeddate">Added on: {this.props.item.addeddate}</p>
					<p className = {this.t_datecolor()}>Target: {this.props.item.targetdate}</p>
				</div>
				<div className = "inlistbutton">
					<button onClick = {this.handleClickDone}>Done</button>
					<button onClick = {this.handleClickChange}>{"\u0394"}</button>
				</div>
				<div style = {{display: this.state.popupDisplay}}>
					<span>New Target: </span>
					<input type = "date" value = {this.state.dateblank} onChange = {this.handleDateChange} />
				</div>
			</div>
			)
	}
}

export default Container